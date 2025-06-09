import headDB from "../db/HeadDB.js";

const { heads } = headDB.data;

function headExist(phone) {
    return (heads.find((head) => head.phone === phone) !== undefined)
}

function getHead(phone) {
    return heads.find((head) => head.phone === phone).data
}

async function addHead(phone, data) {
    await headDB.update(({ heads }) => heads.push({
        phone: phone,
        data: data
    }));
    return;
}

async function updateHead(phone, neo_data) {
    if (headExist(phone)) {
        // 判断是否相等
        let old_data = getHead(phone);
        if (old_data !== neo_data) {
            await headDB.update(
                ({ heads }) => heads.find((head) => head.phone === phone).data = neo_data
            );
        }
    } else {
        await addHead(phone, neo_data);
    }
    return;
}

export {
    headExist,
    getHead,
    addHead,
    updateHead
}
