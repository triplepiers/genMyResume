import addDB from "../db/AdditionalDB.js";
import { genUUID } from "../utils/CDK.js";

const { adds } = addDB.data;

function addExist(phone) {
    return (adds.find((add) => add.phone === phone) !== undefined)
}

function getAllAdds(phone) {
    if(!addExist(phone)) {
        return []
    } else {
        return adds.find((add) => add.phone === phone).data
    }
}

// return srting / false(超出边界)
function getUuidAdd(phone, uuid) {
    let addList = getAllAdds(phone)
    let idx = 0;
    for (const item of addList) {
        if (item.uuid === uuid) {
            return {item, idx}
        }
        idx += 1;
    }
    return {item:false, idx:-1}
}

// 直接 append
function addAdd(phone, data) {
    let neo_data;
    if (addExist(phone)) { // append
        neo_data = [...getAllAdds(phone), {
            uuid: genUUID(),
            data: data
        }];
        addDB.update(
            ({ adds }) => adds.find((add) => add.phone === phone).data = neo_data
        )
    } else {               // new
        neo_data = [{
            uuid: genUUID(),
            data: data
        }];
        addDB.update(({ adds }) => adds.push({
            phone: phone,
            data:  neo_data
        }))
    }
    return neo_data
}

function updateUuidAdd(phone, data, uuid) {
    let prev_data = getAllAdds(phone);
    let {item, idx} = getUuidAdd(phone, uuid);
    if (!item) return false;

    let neo_data = [...prev_data.slice(0,idx), {
        uuid: item.uuid,
        data: data
    }, ...prev_data.slice(idx+1)];

    addDB.update(
        ({ adds }) => adds.find((add) => add.phone === phone).data = neo_data
    )
    return neo_data
}

function deleteUuidAdd(phone, uuid) {
    let prev_data = getAllAdds(phone);
    let {item, idx} = getUuidAdd(phone, uuid);
    if (!item) return false;

    let neo_data = [...prev_data.slice(0,idx), ...prev_data.slice(idx+1)];
    addDB.update(
        ({ adds }) => adds.find((add) => add.phone === phone).data = neo_data
    )
    return neo_data
}

export {
    addExist,
    getAllAdds,
    getUuidAdd,
    addAdd,
    updateUuidAdd,
    deleteUuidAdd
}
