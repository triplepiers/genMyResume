import { genResumeAnalyzeMsgs, getJSONCompletion } from "../utils/llm.js";
import { genUUID } from "../utils/CDK.js";

import { updateHead } from "./Head.js";
import { updateAllEdus } from './Education.js';
import { updateAllWorks } from "./Work.js";
import { updateBothInfo } from "./More.js";
import { updateSS } from "./SelfStatement.js";
import { updateAllAdds } from "./Additional.js";


async function handleHead(uid, parsed) {
    let phone = parsed.phone;
    phone = phone.split(')')[1] || phone;
    phone = phone.replace(/\D/g, '').substring(0, 8);
    if (phone.length < 8) {
        phone = phone + ''.padStart(8 - phone.length, '0')
    }
    parsed.phone = `(+862) ${phone.substring(0,4)} ${phone.substring(4,8)}`;
    await updateHead(uid, JSON.stringify(parsed))
    return;
}

async function handleEdus(uid, parsed) {
    let edus = [];
    parsed.forEach(edu => {
        let isNeoDegree = !([
            'Associate of Arts',
            'Associate of Science',
            'Associate of Applied Science',
            'Bachelor of Arts',
            'Bachelor of Science',
            'BBA',
            'Master of Arts',
            'Master of Science',
            'MBA',
            'J.D.',
            'M.D.',
            'Ph.D.',
            'Enter your own',
        ].includes(edu.degree));
        let info = {
            institution: edu.institution,
            loaction: edu.location,
            degree: isNeoDegree ? 'Enter your own' : edu.degree,
            neodegree: isNeoDegree ? edu.degree : '',
            field: edu.filed,
            bg_month: edu.beginMonth,
            bg_year: edu.beginYear,
            ed_month: edu.endMonth,
            ed_year: edu.endYear,
            more: edu.otherInfo
        }
        edus.push(JSON.stringify(info));
    })
    await updateAllEdus(uid, edus);
    return;
}

async function handleWorks(uid, parsed) {
    let works = [];
    parsed.forEach(work => {
        let info = {
            title: work.title,
            company: work.company,
            location: work.location,
            bg_month: work.beginMonth,
            bg_year: work.beginYear,
            ed_month: work.endMonth,
            ed_year: work.endYear,
            more: work.otherInfo
        }
        works.push(JSON.stringify(info))
    })
    await updateAllWorks(uid, works);
    return;
}

async function handleMores(uid, award, lans, skills) {
    let skillList = [];
    lans.forEach(lan => {
        let validLevel = [
            'Elementary',
            'Limited',
            'Professional',
            'Full Professional',
            'Native'
        ].includes(lan.level);
        skillList.push(JSON.stringify({
            isLan: true,
            lan: lan.language,
            level: validLevel?lan.level:undefined
        }))
    })
    skills.forEach(skill => {
        skillList.push(JSON.stringify({
            isLan: false,
            title: skill.title,
            desc: skill.description
        }))
    })
    await updateBothInfo(uid, award, skillList);
    return;
}

async function handleAdditionals(uid, parsed) {
    let adds = [];
    parsed.forEach(add => {
        adds.push({
            uuid: genUUID(),
            data: JSON.stringify({
                title: add.title,
                more: add.description
            })
        })
    })
    await updateAllAdds(uid, adds);
    return;
}

function analyzeResume(uid, resume) {
    return new Promise((resolve) => {
        getJSONCompletion(genResumeAnalyzeMsgs(resume))
            .then(async jsonStr => {
                try {
                    let res = JSON.parse(jsonStr);
                    await handleHead(uid, res.head);
                    await handleEdus(uid, res.educations);
                    await handleWorks(uid, res.workExperiences);
                    await handleMores(uid, res.awards, res.languages, res.skills);
                    await updateSS(uid, res.selfStatement);
                    await handleAdditionals(uid, res.additionalBlocks);
                    resolve(true); // success
                } catch(e) {
                    resolve(false);
                }
            })
    })
}

export {
    analyzeResume
}