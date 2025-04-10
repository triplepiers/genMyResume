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
        data:  data
    }));
}

async function updateHead(phone, neo_data) {
    // 判断是否相等
    let old_data = getHead(phone);
    if (old_data !== neo_data) {
        await headDB.update(
            ({ heads }) => heads.find((head) => head.phone === phone).data = neo_data
        );
    }
}

export {
    headExist,
    getHead,
    addHead,
    updateHead
}

// function validateAccount(phone, pwd) {
//     let usrInfo = users.find((user) => user.phone === phone);
//     if (!usrInfo) return false;
//     return usrInfo.password === pwd
// }

// function checkPwd(phone, pwd) {
//     return (users.find(
//         (user) => user.phone === phone && user.password === pwd
//     ) !== undefined)
// }

// function isVIP(phone) {
//     let userInfo = users.find((user) => user.phone === phone);
//     if (!userInfo) {
//         console.log(`[ERR] invalid user: ${phone}`);
//         return false;
//     } else {
//         return userInfo.isVIP;
//     }
// }

// async function modVIP(phone, neoIsVIP) {
    
// }

