import eduDB from "../db/EduDB.js";

const { edus } = eduDB.data;

function eduExist(phone) {
    return (edus.find((edu) => edu.phone === phone) !== undefined)
}

function getAllEdus(phone) {
    if (!eduExist(phone)) {
        return []
    } else {
        return edus.find((edu) => edu.phone === phone).data
    }
}

// return srting / false(超出边界)
function getIdxEdu(phone, idx) {
    let eduList = getAllEdus(phone)
    if (idx < 0 || idx >= eduList.length) {
        return false; // out of range
    }
    return eduList[idx]
}

// 直接 append
async function addEdu(phone, data) {
    let neo_data;
    if (eduExist(phone)) { // append
        neo_data = [...getAllEdus(phone), data];
        await eduDB.update(
            ({ edus }) => edus.find((edu) => edu.phone === phone).data = neo_data
        )
    } else {               // new
        neo_data = [data];
        await eduDB.update(({ edus }) => edus.push({
            phone: phone,
            data: neo_data
        }))
    }
    return //neo_data
}

async function updateIdxEdu(phone, data, idx) {
    let prev_data = getAllEdus(phone);
    if (idx < 0 || idx >= prev_data.length) {
        return false;
    }

    let neo_data = [...prev_data.slice(0, idx), data, ...prev_data.slice(idx + 1)];
    await eduDB.update(
        ({ edus }) => edus.find((edu) => edu.phone === phone).data = neo_data
    )
    return //neo_data
}

// 仅用于 parse Resume
async function updateAllEdus(phone, neo_data) {
    if (eduExist(phone)) {
        await eduDB.update(
            ({ edus }) => edus.find((edu) => edu.phone === phone).data = neo_data
        )
    } else {
        await eduDB.update(({ edus }) => edus.push({
            phone: phone,
            data: neo_data
        }))
    }
    return;
}

async function deleteIdxEdu(phone, idx) {
    let prev_data = getAllEdus(phone);
    if (idx < 0 || idx >= prev_data.length) {
        return false;
    }

    let neo_data = [...prev_data.slice(0, idx), ...prev_data.slice(idx + 1)];
    await eduDB.update(
        ({ edus }) => edus.find((edu) => edu.phone === phone).data = neo_data
    )
    return //neo_data
}

export {
    eduExist,
    getAllEdus,
    getIdxEdu,
    addEdu,
    updateIdxEdu,
    updateAllEdus,
    deleteIdxEdu
}
