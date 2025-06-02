import { genResumeAnalyzeMsgs, getJSONCompletion } from "../utils/llm.js";
import { genUUID } from "../utils/CDK.js";

import { updateHead } from "./Head.js";
import { updateAllEdus } from './Education.js';
import { updateAllWorks } from "./Work.js";
import { updateBothInfo } from "./More.js";
import { updateSS } from "./SelfStatement.js";
import { updateAllAdds } from "./Additional.js";


function headleHead(uid, parsed) {
    let phone = parsed.phone;
    phone = phone.split(')')[1] || phone;
    phone = phone.replace(/\D/g, '').substring(0, 8);
    if (phone.length < 8) {
        phone = phone + ''.padStart(8 - phone.length, '0')
    }
    parsed.phone = `(+862) ${phone.substring(0,4)} ${phone.substring(4,8)}`;
    updateHead(uid, JSON.stringify(parsed))
}

function handleEdus(uid, parsed) {
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
    updateAllEdus(uid, edus);
}

function handleWorks(uid, parsed) {
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
    updateAllWorks(uid, works);
}

function handleMores(uid, award, lans, skills) {
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
    updateBothInfo(uid, award, skillList);
}

function handleAdditionals(uid, parsed) {
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
    updateAllAdds(uid, adds);
}

function analyzeResume(uid, resume) {
    return new Promise((resolve) => {
        getJSONCompletion(genResumeAnalyzeMsgs(resume))
            .then(jsonStr => {
                try {
                    let res = JSON.parse(jsonStr);
                    headleHead(uid, res.head);
                    handleEdus(uid, res.educations);
                    handleWorks(uid, res.workExperiences);
                    handleMores(uid, res.awards, res.languages, res.skills);
                    updateSS(uid, res.selfStatement);
                    handleAdditionals(uid, res.additionalBlocks);
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