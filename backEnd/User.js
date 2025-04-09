import userDB from "./db/UserDB.js";

const { users } = userDB.data;

function userExist(phone) {
    return (users.find((user) => user.phone === phone) !== undefined)
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
        isVIP:    false,
        phone:    phone,
        password: pwd
    }));
}

export {
    userExist,
    isVIP,
    modVIP,
    addUser
}