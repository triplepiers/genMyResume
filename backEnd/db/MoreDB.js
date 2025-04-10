import { more_db_file as db_file } from './config.js';
import { JSONFilePreset } from 'lowdb/node';

// read or create dbFile
const moreDB = await JSONFilePreset(db_file, { mores: [] });

moreDB.initDB = async () => {
    console.log('Init (MoreInfoDB)');
    const { mores } = moreDB.data;
    if (!(mores.find((head) => head.phone === '00'))) {
        console.log('No admin more found, create one ...');
        await moreDB.update(({ mores }) => mores.push({
            phone: "00",
            award: "nothing",
            skils: [
                { isLan: 'true', lan: 'CN', rank: '5'},
                { isLan: 'false', desc: ''}
            ]
        }));
    } else {
        console.log('Admin more found, skip create ...');
    }
}

export default moreDB;