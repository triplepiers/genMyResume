import { add_db_file as db_file } from './config.js';
import { JSONFilePreset } from 'lowdb/node';

// read or create dbFile
const addDB = await JSONFilePreset(db_file, { adds: [] });

addDB.initDB = async () => {
    console.log('Init (addDB)');
    const { adds } = addDB.data;
    if (!(adds.find((add) => add.phone === '00'))) {
        console.log('No admin adds found, create one ...');
        await addDB.update(({ adds }) => adds.push({
            phone: "00",
            data:  [{
                uuid: 'xxxx',
                data: "{\"title\":\"just a test\",\"more\":\"just a test\"}"
            }]
        }));
    } else {
        console.log('Admin adds found, skip create ...');
    }
}

export default addDB;