import lzStr from 'lz-string';
import { readFile } from 'fs/promises';
import { recDB, detailDB, reqDB } from '../db/JobRec.js';
import { getProfile } from './SelfStatement.js';
import { genJobRecMsgs, genJobRecMatchMsgs, getCompletion } from '../utils/llm.js';

const MINITES = 2; // Searching Gap = ? min
const TITLE_FILE_PATH = './data/jobTitle.json';

// load from local file
let jtitleList = [];
try {
    const rawData = await readFile(TITLE_FILE_PATH, 'utf-8');
    jtitleList = JSON.parse(rawData).titles;
    console.log(`${jtitleList.length} Job Titles loaded.`);
} catch (err) {
    console.error('读取文件出错:', err);
}
let compressed = lzStr.compress(JSON.stringify(
    [...new Set(jtitleList.map(item => {
        // Capitalize
        return item.title.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    }))] // 去重
));

const details = detailDB.data.jobs;
const reqs = reqDB.data.jobs;
const { recs } = recDB.data;

function getTitleList() {
    return compressed;
}

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
    uniqueIdxs.forEach(idx => {
        let item = details[idx];
        res.push({
            jid: item.jid,
            ...item.detail
        });
    })
    return res;
}

// 直接发一坨过去会触发限速：RateLimitError: 429
// async function getPrefJids(n, preferred) {
//     let promises = jtitleList.map(item => {
//         return new Promise((resolve) => {
//             getJSONCompletion(genJobTitleMatchMsgs(item.title, preferred))
//                 .then((res) => {
//                     resolve({
//                         jid,
//                         match: JSON.parse(res).match
//                     })
//                 })
//         })
//     })
//     let selected = await Promise.allSettled(promises)
//         .then(res => {
//             let matchJids = [];
//             let dismatchJids = [];
//             res.forEach(assess => {
//                 if (assess.status === 'fulfilled') {
//                     if (res.match) matchJids.push(res.jid);
//                     else dismatchJids.push(res.jid);
//                 }
//             })
//             // 抽样
//             matchJids = genUniqueRandNums(2 * n, matchJids.length - 1)
//                 .map(idx => {
//                     return {
//                         jid: matchJids[idx],
//                         match: true
//                     }
//                 })
//             let todo = 2 * n - matchJids.length;
//             if (todo > 0) {
//                 dismatchJids = genUniqueRandNums(todo, dismatchJids.length - 1)
//                     .map(idx => {
//                         return {
//                             jid: dismatchJids[idx],
//                             match: false
//                         }
//                     })
//             } else {
//                 dismatchJids = [];
//             }
//             return matchJids + dismatchJids;
//         })
//     return selected;
// }

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
    try {
        let jobDetail = details.find((job) => job.jid === jid).detail;
        return jobDetail
    } catch (e) {
        console.log(jid, e)
        return false
    }
}

function parseRes(res) {
    let cnt_match = 0;
    let desc = "";
    let match = false;
    const lines = res.split('\n').filter(item => item.length > 0);
    lines.forEach(item => {
        if (item[0] === '$' && item.length === 15) {
            match = true;
        }
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
        match,
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
        if (Date.now() - entry.lastTime <= 60000 * MINITES) { // Gap < 1min
            if (entry.recs.length > 0) { // 很新，可以返回
                // console.log('很新，可以返回')
                return entry.recs;
            } else { // 很新，且在 working ...
                // console.log('很新，在工作')
                return [];
            }
        } else {
            if (entry.recs.length === 0) { // 旧的，在 working ...
                // console.log('很旧，在工作')
                return [];
            } else { // 旧的，还没查：update 一下 继续查
                // console.log('很旧，准备干')
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

async function assessJob(profile, jid, preferred) {
    let { reqs } = getJobReqs(jid);
    let { title } = getJobDetails(jid);
    let msg;
    if (!preferred || preferred.length === 0) {
        msg = genJobRecMsgs(profile, reqs);
    } else {
        msg = genJobRecMatchMsgs(profile, reqs, title, preferred)
    }
    return new Promise((resolve) => {
        getCompletion(msg)
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
async function genJobRec(n, phone, preferred) {
    let prevRes = hasPrevRes(phone);
    if (prevRes) {
        return Promise.resolve(prevRes);
    }

    let profile = getProfile(phone);


    // 抽样两倍（2N），然后返回 N 个
    let promises = genUniqueRandNums(2 * n, details.length - 1)
        .map(idx => {
            // console.log(details[idx].jid)
            try {
                return assessJob(profile, details[idx].jid, preferred)
            } catch (e) {
                console.log('Can not Assess', idx, details[idx])
                console.log(e)
                return null
            }
        })
        .filter(item => item !== null);


    let res = await Promise.allSettled(promises).
        then(res => {
            let matchSortPairs = [];
            let dismatchSortPairs = [];
            let id2desc = {};
            let jobInfo = [];
            res.forEach(assess => {
                if (assess.status === 'fulfilled') {
                    let { jid, score, desc, match } = assess.value;
                    if (match) {
                        matchSortPairs.push([score, jid]);
                    } else {
                        dismatchSortPairs.push([score, jid]);
                    }
                    id2desc[jid] = desc;
                }
            })
            // 降序排序
            matchSortPairs.sort(([a], [b]) => b - a);
            // selected
            matchSortPairs.slice(0, n)
                .map(item => item[1])
                .forEach(jid => {
                    jobInfo.push({
                        jid,
                        match: true,
                        ...getJobDetails(jid),
                        desc: lzStr.compress(id2desc[jid])
                    })
                })
            // 降序排序
            dismatchSortPairs.sort(([a], [b]) => b - a);
            // selected
            dismatchSortPairs.slice(0, n - jobInfo.length)
                .map(item => item[1])
                .forEach(jid => {
                    jobInfo.push({
                        jid,
                        match: false,
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
    genJobRec,
    getTitleList
}