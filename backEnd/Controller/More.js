import moreDB from "../db/MoreDB.js";

const { mores } = moreDB.data;

function moreExist(phone) {
    return (mores.find((more) => more.phone === phone) !== undefined)
}

// 返回 str
function getAward(phone) {
    if(!moreExist(phone)) {
        return ""
    } else {
        return mores.find((more) => more.phone === phone).award
    }
}

function updateAward(phone, data) {
    if(!moreExist(phone)) {
        moreDB.update(({ mores }) => mores.push({
            phone: phone,
            award: data,
            skills: []
        }))
    } else {
        moreDB.update(
            ({ mores }) => mores.find((more) => more.phone === phone).award = data
        )
    }
}

function getAllSkills(phone) {
    if(!moreExist(phone)) {
        return []
    } else {
        return mores.find((more) => more.phone === phone).skills
    }
}

function getIdxSkill(phone, idx) {
    let skillList = getAllSkills(phone)
    if (idx<0 || idx>=skillList.length) {
        return false; // out of range
    }
    return skillList[idx]
}

function addSkill(phone, data) {
    let neo_data;
    if (moreExist(phone)) { // append
        neo_data = [...getAllSkills(phone), data];
        moreDB.update(
            ({ mores }) => mores.find((more) => more.phone === phone).data = neo_data
        )
    } else {               // new
        neo_data = [data];
        moreDB.update(({ mores }) => mores.push({
            phone: phone,
            award: "",
            skills:  neo_data
        }))
    }
    return neo_data
}

function updateIdxSkiil(phone, data, idx) {
    let prev_data = getAllSkills(phone);
    if (idx<0 || idx>=prev_data.length) {
        return false;
    }

    let neo_data = [...prev_data.slice(0,idx), data, ...prev_data.slice(idx+1)];
    moreDB.update(
        ({ mores }) => mores.find((more) => more.phone === phone).data = neo_data
    )
    return neo_data
}

function deleteIdxSkill(phone, idx) {
    let prev_data = getAllSkills(phone);
    if (idx<0 || idx>=prev_data.length) {
        return false;
    }

    let neo_data = [...prev_data.slice(0,idx), ...prev_data.slice(idx+1)];
    moreDB.update(
        ({ mores }) => mores.find((more) => more.phone === phone).data = neo_data
    )
    return neo_data
}

export {
    getAward,
    updateAward,
    getAllSkills,
    getIdxSkill,
    addSkill,
    updateIdxSkiil,
    deleteIdxSkill
}