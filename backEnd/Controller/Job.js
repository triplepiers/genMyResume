import { JSONFilePreset } from 'lowdb/node';

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

export {
    getRandDetails
}