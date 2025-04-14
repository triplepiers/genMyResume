import { getHead } from "./Head.js";
import { getAllEdus } from "./Education.js";
import { getAllWorks } from "./Work.js";
import { getAward } from "./More.js";
import { getAllSkills } from "./More.js";
import { getSS } from "./SelfStatement.js";

function getProfile(phone) {
    return {
        head: getHead(phone),
        edus: getAllEdus(phone),
        works: getAllWorks(phone),
        award: getAward(phone),
        skills: getAllSkills(phone),
        ss: getSS(phone)
    }
}

export {
    getProfile
}