import lzStr from 'lz-string';
import { recDB, detailDB, reqDB } from '../db/JobRec.js';
import { getProfile } from './SelfStatement.js';
import { genJobRecMsgs, getCompletion } from '../utils/llm.js';

const MINITES=2; // Searching Gap = ? min

const details = detailDB.data.jobs;
const reqs = reqDB.data.jobs;
const { recs } = recDB.data;

// 在 [1, maxx] 范围内，生成 count 个不重复的随机数
function genUniqueRandNums(count, max) {
    if (count > max) { count = max }
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * max) + 1);
    }
    return Array.from(numbers);
}

// 从 details 中抽取 n 个
function getRandDetails(n) {
    let res = [];
    const uniqueIdxs = genUniqueRandNums(n, details.length);
    uniqueIdxs.forEach( idx => {
        let item = details[idx];
        res.push({
            jid: item.jid,
            ...item.detail
        });
    })
    return res;
}

// 提取指定 jid 的要求
function getJobReqs(jid) {
    let res = "";

    let req_list = reqs.find((job) => job.jid === jid).reqs;
    req_list.forEach(req => res += `\t- ${req}\n`);

    return {
        reqs: res,
        req_len: req_list.length
    }
}

// 提取指定 jid 的岗位描述
function getJobDetails(jid) {
    return details.find((job) => job.jid === jid).detail;
}

function parseRes(res) {
    let cnt_match = 0;
    let desc = "";
    const lines = res.split('\n').filter(item => item.length > 0);
    lines.forEach(item => {
        let clr = 'red';
        let idx_r = item.search(/]/);
        if (idx_r === 7) { // True
            cnt_match += 1;
            clr = 'green';
        }

        let req = item.substring(idx_r + 2).replace(/[\r\n]+/g, "");
        let idx_l = req.search(/\(/);
        desc += `<li>${req.substring(0, idx_l)}<span style="color: ${clr};">${req.substring(idx_l)}</span></li>`
    })

    return {
        score: parseInt(cnt_match * 100 / lines.length, 10),
        desc
    }
}

function hasPrevRes(phone) {
    let entry = recs.find((rec) => rec.phone === phone);
    if (!entry) { // 没查过，更新 recs = [] 表示 working
        recDB.update(({ recs }) => recs.push({
            phone,
            lastTime: Date.now(),
            recs: []
        }));
    } else {
        if (Date.now() - entry.lastTime <= 60000*MINITES) { // Gap < 1min
            if  (entry.recs.length > 0) { // 很新，可以返回
                return entry.recs;
            } else { // 很新，且在 working ...
                return [];
            }
        } else {
            if (entry.recs.length === 0) { // 旧的，在 working ...
                return [];
            } else { // 旧的，还没查：update 一下 继续查
                recDB.update(({ recs }) => recs.find((rec) => rec.phone === phone).recs = []);
            }
        }
    }
    return false;
}

function updateRec(phone, neo_recs) {
    recDB.update(({ recs }) => {
        let entry = recs.find((rec) => rec.phone === phone);
        entry.lastTime = Date.now();
        entry.recs = neo_recs;
    })
}

async function assessJob(profile, jid) {
    let { reqs } = getJobReqs(jid);
    return new Promise((resolve) => {
        getCompletion(genJobRecMsgs(profile, reqs))
        .then((res) => {
            resolve({
                jid,
                ...parseRes(res)
            })
        })
    })
}

// 返回：[] - 正在查
//      [sth] - 查出来了
async function genJobRec(n, phone) {
    let prevRes = hasPrevRes(phone);
    if (prevRes) {
        return Promise.resolve(prevRes);
    } 

    let profile = getProfile(phone);

    // 抽样两倍（2N），然后返回 N 个
    let promises = genUniqueRandNums(2*n, details.length)
        .map(idx => assessJob(profile, details[idx].jid));
    
    let res = await Promise.allSettled(promises).
        then(res => {
            let sortPairs = [];
            let id2desc = {};
            let jobInfo = [];
            res.forEach(assess => {
                if (assess.status === 'fulfilled') {
                    let { jid, score, desc } = assess.value;
                    sortPairs.push([score, jid]);
                    id2desc[jid] = desc;
                }
            })
            // 降序排序
            sortPairs.sort(([a], [b]) => b-a); 
            // selected
            sortPairs.map(item => item[1])
                .slice(0, n)
                .forEach(jid => {
                    jobInfo.push({
                        jid,
                        ...getJobDetails(jid),
                        desc: lzStr.compress(id2desc[jid])
                    })
                })
            // 序列化
            updateRec(phone, jobInfo);
            return jobInfo;
        })
    return res;
}

export {
    getRandDetails,
    genJobRec
}