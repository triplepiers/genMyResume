import { headExist, getHead } from "./Head.js";
import { getAllEdus } from "./Education.js";
import { getAllWorks } from "./Work.js";
import { getAward } from "./More.js";
import { getAllSkills } from "./More.js";
import { getAllAdds } from "./Additional.js";
import { getSS } from "./SelfStatement.js";

import tpDB from "../db/TemplateDB.js";

const { tps } = tpDB.data;

function getProfile(phone) {
    if (headExist(phone)) {
        return {
            head: getHead(phone),
            edus: getAllEdus(phone),
            works: getAllWorks(phone),
            award: getAward(phone),
            skills: getAllSkills(phone),
            ss: getSS(phone),
            adds: getAllAdds(phone),
        }
    } else {
        return false
    }
}

function userExist(phone) {
    return (tps.find((tp) => tp.phone === phone) !== undefined)
}

function canDown(phone, tid) {
    let tpInfo = tps.find((tp) => tp.phone === phone);
    // 从来没下载过，可以
    if (!tpInfo) { 
        tpDB.update(({ tps }) => tps.push({
            phone: phone,
            purchased: [{
                tid,
                hasDown: true,
                hasBuy: false
            }]
        }))
        return true
    } 
    // 没下过当前这个，可以
    let purchaseRecord = tpInfo.purchased.find((pRecord) => pRecord.tid === tid);
    if (!purchaseRecord) {
        tpDB.update(({ tps }) => {
            tps.find((tp) => tp.phone === phone).purchased.push({
                tid,
                hasDown: true,
                hasBuy: false
            })
        })
        return true
    }
    if (!purchaseRecord.hasDown) {
        return true
    }
    // 来过就是下过，看有没有买
    return purchaseRecord.hasBuy
}

function hasBuy(phone, tid) {
    let tpInfo = tps.find((tp) => tp.phone === phone);
    if (!tpInfo) return false;
    let purchaseRecord = tpInfo.purchased.find((pRecord) => pRecord.tid === tid);
    if (!purchaseRecord) return false;
    return purchaseRecord.hasBuy
}

function buy(phone, tid) {
    let tpInfo = tps.find((tp) => tp.phone === phone);
    if (!tpInfo) {
        tpDB.update(({ tps }) => tps.push({
            phone: phone,
            purchased: [{
                tid,
                hasDown: false,
                hasBuy: true
            }]
        }))
    } else {
        let purchaseRecord = tpInfo.purchased.find((pRecord) => pRecord.tid === tid);
        if (!purchaseRecord) {
            tpDB.update(({ tps }) => {
                tps.find((tp) => tp.phone === phone).purchased.push({
                    tid,
                    hasDown: false,
                    hasBuy: true
                })
            })
        } else {
            tpDB.update(({ tps }) => {
                tps.find((tp) => tp.phone === phone).purchased.find((pRecord) => pRecord.tid === tid).hasBuy = true
            })
        }
    }
}

function hasDown(phone, tid) {
    let tpInfo = tps.find((tp) => tp.phone === phone);
    if(!tpInfo) {
        tpDB.update(({ tps }) => tps.push({
            phone: phone,
            purchased: [{
                tid,
                hasDown: true,
                hasBuy: false
            }]
        }))
        return
    }
    let purchaseRecord = tpInfo.purchased.find((pRecord) => pRecord.tid === tid);
    if (!purchaseRecord) {
        tpDB.update(({ tps }) => {
            tps.find((tp) => tp.phone === phone).purchased.push({
                tid,
                hasDown: true,
                hasBuy: false
            })
        })
        return
    }
    tpDB.update(({ tps }) => {
        tps.find((tp) => tp.phone === phone).purchased.find((pRecord) => pRecord.tid === tid).hasDown = true
    })
}

export {
    getProfile,
    userExist,
    canDown,
    hasBuy,
    buy,
    hasDown
}