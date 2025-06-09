import moreDB from "../db/MoreDB.js";

const { mores } = moreDB.data;

function moreExist(phone) {
    return (mores.find((more) => more.phone === phone) !== undefined)
}

// 返回 str
function getAward(phone) {
    if (!moreExist(phone)) {
        return ""
    } else {
        return mores.find((more) => more.phone === phone).award
    }
}

async function updateAward(phone, data) {
    if (!moreExist(phone)) {
        await moreDB.update(({ mores }) => mores.push({
            phone: phone,
            award: data,
            skills: []
        }))
    } else {
        await moreDB.update(
            ({ mores }) => mores.find((more) => more.phone === phone).award = data
        )
    }
    return;
}

function getAllSkills(phone) {
    if (!moreExist(phone)) {
        return []
    } else {
        return mores.find((more) => more.phone === phone).skills
    }
}

function getIdxSkill(phone, idx) {
    let skillList = getAllSkills(phone)
    if (idx < 0 || idx >= skillList.length) {
        return false; // out of range
    }
    return skillList[idx]
}

async function addSkill(phone, data) {
    let neo_data;
    if (moreExist(phone)) { // append
        neo_data = [...getAllSkills(phone), data];
        await moreDB.update(
            ({ mores }) => mores.find((more) => more.phone === phone).skills = neo_data
        )
    } else {               // new
        neo_data = [data];
        await moreDB.update(({ mores }) => mores.push({
            phone: phone,
            award: "",
            skills: neo_data
        }))
    }
    return //neo_data
}

async function updateIdxSkiil(phone, data, idx) {
    let prev_data = getAllSkills(phone);
    if (idx < 0 || idx >= prev_data.length) {
        return false;
    }

    let neo_data = [...prev_data.slice(0, idx), data, ...prev_data.slice(idx + 1)];
    await moreDB.update(
        ({ mores }) => mores.find((more) => more.phone === phone).skills = neo_data
    )
    return// neo_data
}

async function deleteIdxSkill(phone, idx) {
    let prev_data = getAllSkills(phone);
    if (idx < 0 || idx >= prev_data.length) {
        return false;
    }

    let neo_data = [...prev_data.slice(0, idx), ...prev_data.slice(idx + 1)];
    await moreDB.update(
        ({ mores }) => mores.find((more) => more.phone === phone).skills = neo_data
    )
    return //neo_data
}

// 仅用于 OCR
async function updateBothInfo(phone, award, skills) {
    if (!moreExist(phone)) {
        await moreDB.update(({ mores }) => mores.push({
            phone: phone,
            award: award,
            skills: skills
        }))
    } else {
        await moreDB.update(
            ({ mores }) => {
                let info = mores.find((more) => more.phone === phone);
                info.award = award;
                info.skills = skills;
            }
        )
    }
    return;
}

export {
    getAward,
    updateAward,
    getAllSkills,
    getIdxSkill,
    addSkill,
    updateIdxSkiil,
    deleteIdxSkill,
    updateBothInfo
}