import { ss_db_file as db_file } from './config.js';
import { JSONFilePreset } from 'lowdb/node';

// read or create dbFile
const ssDB = await JSONFilePreset(db_file, { SSs: [] });

ssDB.initDB = async () => {
    console.log('Init (SelfStatementDB)');
    const { SSs } = ssDB.data;
    if (!(SSs.find((ss) => ss.phone === '00'))) {
        console.log('No admin more found, create one ...');
        await ssDB.update(({ SSs }) => SSs.push({
            phone: "00",
            useGen: false, // 是否动用 Gen
            data: "test"
        }));
    } else {
        console.log('Admin more found, skip create ...');
    }
}

export default ssDB;