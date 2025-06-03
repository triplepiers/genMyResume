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
    jtitleList = JSON.parse(rawData).titles.map(item => {
        return {
            jid: item.jid,
            // Capitalize
            title: item.title.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
        }
    });
    console.log(`${jtitleList.length} Job Titles loaded.`);
} catch (err) {
    console.error('读取文件出错:', err);
}
let compressed = lzStr.compress(JSON.stringify(
    [...new Set(jtitleList.map(item => item.title))] // 去重
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
    const uniqueIdxs = genUniqueRandNums(n, details.length-1);
    uniqueIdxs.forEach(idx => {
        let item = details[idx];
        res.push({
            jid: item.jid,
            ...item.detail
        });
    })
    return res;
}

// 计算编辑距离
function levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // 替换
                    matrix[i][j - 1] + 1,     // 插入
                    matrix[i - 1][j] + 1      // 删除
                );
            }
        }
    }
    return matrix[b.length][a.length];
}
// 计算百分比编辑距离
function similarityPercentage(str1, str2) {
    const maxLength = Math.max(str1.length, str2.length);
    if (maxLength === 0) return 100;
    const distance = levenshteinDistance(str1, str2);
    return (1 - distance / maxLength); // * 100;
}

function getPrefIdxs(n, preferred) {
    let matchedJids = [], dismatchJids = []; // 现在存的是 details 里的 idx
    let jid2match = {};
    preferred = preferred.toLowerCase();
    jtitleList.forEach((item, idx) => {
        let title = item.title.toLowerCase();
        if (title.includes(preferred)) {
            // matchedJids.push(item.jid);
            matchedJids.push(idx);
            jid2match[item.jid] = true;
            return;
        } else {
            let percent = similarityPercentage(preferred, title)
            if (percent > 0.65) {
                // matchedJids.push(item.jid);
                matchedJids.push(idx);
                jid2match[item.jid] = true;
                return;
            }
        }
        // dismatchJids.push(item.jid);
        dismatchJids.push(idx);
        jid2match[item.jid] = false;
    })
    // 抽样
    matchedJids = genUniqueRandNums(n, matchedJids.length - 1).map(idx => matchedJids[idx]);
    let todo = n - matchedJids.length;
    if (todo>0) {
        dismatchJids = genUniqueRandNums(todo, dismatchJids.length-1).map(idx => dismatchJids[idx]);
    } else {
        dismatchJids = [];
    }
    return {
        useIdxs:  matchedJids.concat(dismatchJids),
        jid2match
    }
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
        // console.log('没查过')
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
    let USE_PREF = preferred.length > 0;

    // 抽样两倍（2N），然后返回 N 个
    let useIdxs = [], jid2match = {};
    if (USE_PREF) {
        let tmp = getPrefIdxs(2*n, preferred);
        useIdxs = tmp.useIdxs;
        jid2match = tmp.jid2match;
    } else {
        useIdxs = genUniqueRandNums(2 * n, details.length - 1);
    }
    let promises = useIdxs.map(idx => {
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
            let matchSortPairs = [], dismatchSortPairs = [];
            let id2desc = {}, jobInfo = [];
            res.forEach(assess => {
                if (assess.status === 'fulfilled') {
                    let { jid, score, desc, match } = assess.value;
                    if (USE_PREF) match = match || jid2match[jid];
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