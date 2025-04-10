import workDB from "../db/WorkDB.js";

const { works } = workDB.data;

function workExist(phone) {
    return (works.find((work) => work.phone === phone) !== undefined)
}

function getAllWorks(phone) {
    if(!workExist(phone)) {
        return []
    } else {
        return works.find((work) => work.phone === phone).data
    }
}

// return srting / false(超出边界)
function getIdxWork(phone, idx) {
    let workList = getAllWorks(phone)
    if (idx<0 || idx>=workList.length) {
        return false; // out of range
    }
    return workList[idx]
}

// 直接 append
function addWork(phone, data) {
    let neo_data;
    if (workExist(phone)) { // append
        neo_data = [...getAllWorks(phone), data];
        workDB.update(
            ({ works }) => works.find((work) => work.phone === phone).data = neo_data
        )
    } else {               // new
        neo_data = [data];
        workDB.update(({ works }) => works.push({
            phone: phone,
            data:  neo_data
        }))
    }
    return neo_data
}

function updateIdxWork(phone, data, idx) {
    let prev_data = getAllWorks(phone);
    if (idx<0 || idx>=prev_data.length) {
        return false;
    }

    let neo_data = [...prev_data.slice(0,idx), data, ...prev_data.slice(idx+1)];
    workDB.update(
        ({ works }) => works.find((work) => work.phone === phone).data = neo_data
    )
    return neo_data
}

function deleteIdxWork(phone, idx) {
    let prev_data = getAllWorks(phone);
    if (idx<0 || idx>=prev_data.length) {
        return false;
    }

    let neo_data = [...prev_data.slice(0,idx), ...prev_data.slice(idx+1)];
    workDB.update(
        ({ works }) => works.find((work) => work.phone === phone).data = neo_data
    )
    return neo_data
}

export {
    workExist,
    getAllWorks,
    getIdxWork,
    addWork,
    updateIdxWork,
    deleteIdxWork
}
