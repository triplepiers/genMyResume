import { head_db_file as db_file } from './config.js';
import { JSONFilePreset } from 'lowdb/node';

// read or create dbFile
const headDB = await JSONFilePreset(db_file, { heads: [] });

headDB.initDB = async () => {
    console.log('Init (HeadDB)');
    const { heads } = headDB.data;
    if (!(heads.find((head) => head.phone === '00'))) {
        console.log('No admin head found, create one ...');
        await headDB.update(({ heads }) => heads.push({
            phone: "00",
            data:  "just a test"
        }));
    } else {
        console.log('Admin head found, skip create ...');
    }
}

export default headDB;