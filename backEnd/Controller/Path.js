import lzStr from 'lz-string';
import { readFile } from 'fs/promises';
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

export {
    getCompList
}