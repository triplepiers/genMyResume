import { edu_db_file as db_file } from './config.js';
import { JSONFilePreset } from 'lowdb/node';

// read or create dbFile
const eduDB = await JSONFilePreset(db_file, { edus: [] });

eduDB.initDB = async () => {
    console.log('Init eduDB ...');
    const { edus } = eduDB.data;
    if (!(edus.find((head) => head.phone === '00'))) {
        console.log('No admin head found, create one ...');
        await eduDB.update(({ edus }) => edus.push({
            phone: "00",
            data:  ["just a test"]
        }));
    } else {
        console.log('Admin head found, skip create ...');
    }
}

export default eduDB;