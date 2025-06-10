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

async function isVIP(phone) {
    let userInfo = users.find((user) => user.phone === phone);
    if (!userInfo) {
        console.log(`[ERR] invalid user: ${phone}`);
        return false;
    } else { 
        if (userInfo.isVIP) {
            // 比较是否过期
            if (userInfo.expire === -1 || userInfo.expire > new Date()) {
                return true;
            } else {
                await userDB.update(({ users }) => {
                    let info = users.find((user) => user.phone === phone);
                    info.isVIP = false;
                    info.expire = 0;
                })
                return false;
            }
        } else {
            return false;
        }
    }
}

// 和 isVIP 差不多（只有返回格式的区别）=> 因为原函数依赖太多了
async function VIPinfo(phone) {
    let userInfo = users.find((user) => user.phone === phone);
    if (!userInfo) {
        console.log(`[ERR] invalid user: ${phone}`);
        return { isVIP: false, expire: 0 };
    } else { 
        if (userInfo.isVIP) {
            // 比较是否过期
            if (userInfo.expire === -1) return { isVIP: true, expire: -1 };
            if (userInfo.expire > new Date()) {
                return { isVIP: true, expire: userInfo.expire };
            } else {
                await userDB.update(({ users }) => {
                    let info = users.find((user) => user.phone === phone);
                    info.isVIP = false;
                    info.expire = 0;
                })
                return { isVIP: false, expire: 0 };
            }
        } else {
            return { isVIP: false, expire: 0 };
        }
    }
}


async function modVIP(phone, neoIsVIP, tVIP) {
    // tVIP: 1 -- 月度, 2 -- 永久
    await userDB.update(
        ({ users }) => {
            let info = users.find((user) => user.phone === phone);
            info.isVIP = neoIsVIP;
            if (neoIsVIP) {
                switch (tVIP) {
                    case 1:// 30 天
                        if (info.expire === -1) return;
                        else if (info.expire === 0) {
                            let today = new Date();
                            info.expire = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
                        } else { // 延长
                            info.expire = new Date(info.expire.getTime() + 30 * 24 * 60 * 60 * 1000);
                        }
                        break;
                    case 2:
                        info.expire = -1;
                        break;
                }
            }
        }
    );
}

async function addUser(phone, pwd) {
    await userDB.update(({ users }) => users.push({
        isVIP: false,
        phone: phone,
        password: pwd,
        expire: 0 // 0 - Not, -1 - Forever
    }));
}

export {
    userExist,
    validateAccount,
    isVIP,
    VIPinfo,
    modVIP,
    addUser,
    checkPwd
}