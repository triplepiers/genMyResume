import { JSONFilePreset } from 'lowdb/node';
import { getProfile } from './SelfStatement.js';
import { genJobRecMsgs, getCompletion } from '../utils/llm.js';

// 在 [1, maxx] 范围内，生成 count 个不重复的随机数
function genUniqueRandNums(count, max) {
    if (count > max) { count = max }
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * max) + 1);
    }
    return Array.from(numbers);
}

// read or create dbFile
const detailDB = await JSONFilePreset('./data/jobDetail.json', { jobs: [] });
const details = detailDB.data.jobs;

const reqDB    = await JSONFilePreset('./data/jobReqs.json', { jobs: [] });
const reqs = reqDB.data.jobs;

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

async function genJobRec(n, phone) {
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
                        desc: id2desc[jid]
                    })
                })
            return jobInfo;
        })
    return res;
}

export {
    getRandDetails,
    genJobRec
}