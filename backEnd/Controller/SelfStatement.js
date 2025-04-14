import ssDB from "../db/SelfStatementDB.js";
import { isVIP } from "./User.js";
import { getAllEdus } from "./Education.js";
import { getAllWorks } from "./Work.js";
import { getAllSkills } from "./More.js"
import { genSelfStatement } from "../utils/llm.js";

const { SSs } = ssDB.data;

function SSExist(phone) {
    return (SSs.find((ss) => ss.phone === phone) !== undefined)
}

function getSS(phone) {
    if(!SSExist(phone)) {
        return ""
    } else {
        return SSs.find((ss) => ss.phone === phone).data
    }
}

function updateSS(phone, neo_data) {
    if (!SSExist) {
        ssDB.update(({ SSs }) => SSs.push({
            phone: phone,
            useGen: false,
            data:  neo_data
        }))
    } else {
        ssDB.update(
            ({ SSs }) => SSs.find((ss) => ss.phone === phone).data = neo_data
        )
    }
}

function canGen(phone) {
    if (isVIP(phone)) {
        return true;
    } else {
        if (!SSExist(phone)) { return true; }
        else {
            return !(SSs.find((ss) => ss.phone === phone).useGen)
        }
    }
}

function hasGen(phone) {
    if (!SSExist(phone)) {
        ssDB.update(({ SSs }) => SSs.push({
            phone: phone,
            useGen: true,
            data:  ""
        }))
    } else {
        ssDB.update(
            ({ SSs }) => SSs.find((ss) => ss.phone === phone).useGen = true
        )
    }
}

function genEduExp(phone) {
    let res = '';
    getAllEdus(phone).forEach((item) => {
        let edu = JSON.parse(item)
        res += (
            `\t- Institution: ${edu.institution}, Field: ${edu.field}, Degree: ${edu.degree!=='Enter your own'?edu.degree:edu.neodegree}, From: ${edu.bg_month} ${edu.bg_year} , To: ${edu.ed_month} ${edu.ed_year}\n`
        )
    });
    return res
}
function genWorkExp(phone) {
    let res = '';
    getAllWorks(phone).forEach((item) => {
        let wk = JSON.parse(item)
        res += (
            `\t- Company: ${wk.company}, Title: ${wk.title}, From: ${wk.bg_month} ${wk.bg_year} , To: ${wk.ed_month} ${wk.ed_year}\n`
        )
    });
    return res;
}
function genSkills(phone) {
    let res = '';
    getAllSkills(phone).forEach((item) => {
        let skill = JSON.parse(item)
        if (skill.isLan) {
            res += `\t- Language: ${skill.name}, Level: ${skill.level}\n`
        } else {
            res += `\t- Skill: ${skill.title}, Description: ${skill.desc}\n`
        }
    });
    return res;
}
function getProfile(phone) {
return `
- My Education Experience: \n
${genEduExp(phone)}
- My Work Experience: \n
${genWorkExp(phone)}
- My Additional Skills and Awards: \n
${genSkills(phone)}\n`
}

async function genSS(phone) {
    if(!canGen(phone)) {
        return "You have used the generation function, please update your self-statement manually."
    }
    hasGen(phone);
    return new Promise((resolve) => {
        genSelfStatement(getProfile(phone))
        .then((res) => {
            resolve(res)
        })
    })
}

export {
    getSS,
    updateSS,
    canGen,
    genSS
}