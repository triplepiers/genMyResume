/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import lzStr from 'lz-string';
import { readFile } from 'fs/promises';
import { getProfile } from './SelfStatement.js';
import { genCareerPathMsgs, getJSONCompletion } from '../utils/llm.js';
const COMP_FILE_PATH = './data/company.json';

// load from local file
let compressed;
try {
    const rawData = await readFile(COMP_FILE_PATH, 'utf-8');
    const compList = JSON.parse(rawData).companies;
    console.log(`${compList.length} Comp Names loaded.`);
    compressed = lzStr.compress(JSON.stringify(compList));
} catch (err) {
    console.error('读取文件出错:', err);
    compressed = "";
}

function getCompList() {
    return compressed;
}

async function genCareerPath(phone, compName) {
    return new Promise(resolve => {
        getJSONCompletion(genCareerPathMsgs(getProfile(phone), compName))
            .then((res) => {
                try {
                    resolve(JSON.parse(res));
                } catch (err) {
                    resolve({ salary: [], jobGrade: [] })
                }
            });
    })
}

export {
    getCompList,
    genCareerPath
}