import userDB from "../db/UserDB.js";

const { users } = userDB.data;

function userExist(phone) {
    return (users.find((user) => user.phone === phone) !== undefined)
}

function validateAccount(phone, pwd) {
    let usrInfo = users.find((user) => user.phone === phone);
    if (!usrInfo) return false;
    return usrInfo.password === pwd
}

function checkPwd(phone, pwd) {
    return (users.find(
        (user) => user.phone === phone && user.password === pwd
    ) !== undefined)
}

function isVIP(phone) {
    let userInfo = users.find((user) => user.phone === phone);
    if (!userInfo) {
        console.log(`[ERR] invalid user: ${phone}`);
        return false;
    } else {
        return userInfo.isVIP;
    }
}

async function modVIP(phone, neoIsVIP) {
    await userDB.update(
        ({ users }) => users.find((user) => user.phone === phone).isVIP = neoIsVIP
    );
}

async function addUser(phone, pwd) {
    await userDB.update(({ users }) => users.push({
        isVIP: false,
        phone: phone,
        password: pwd
    }));
}

export {
    userExist,
    validateAccount,
    isVIP,
    modVIP,
    addUser,
    checkPwd
}