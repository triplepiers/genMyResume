import { work_db_file as db_file } from './config.js';
import { JSONFilePreset } from 'lowdb/node';

// read or create dbFile
const workDB = await JSONFilePreset(db_file, { works: [] });

workDB.initDB = async () => {
    console.log('Init (WorkDB)');
    const { works } = workDB.data;
    if (!(works.find((work) => work.phone === '00'))) {
        console.log('No admin work found, create one ...');
        await workDB.update(({ works }) => works.push({
            phone: "00",
            data:  ["{\"title\":\"just a test\"}",]
        }));
    } else {
        console.log('Admin work found, skip create ...');
    }
}

export default workDB;