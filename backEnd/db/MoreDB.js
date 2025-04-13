import { more_db_file as db_file } from './config.js';
import { JSONFilePreset } from 'lowdb/node';

// read or create dbFile
const moreDB = await JSONFilePreset(db_file, { mores: [] });

moreDB.initDB = async () => {
    console.log('Init (MoreInfoDB)');
    const { mores } = moreDB.data;
    if (!(mores.find((more) => more.phone === '00'))) {
        console.log('No admin more found, create one ...');
        await moreDB.update(({ mores }) => mores.push({
            phone: "00",
            award: "nothing",
            skills: [
                // 很颠了 => 如果存 obj 直接没办法识别
                JSON.stringify({ isLan: true, lan: 'CN', level: 'Limited'}),
                JSON.stringify({ isLan: false, title: 'play', desc: 'kkk'})
            ]
        }));
    } else {
        console.log('Admin more found, skip create ...');
    }
}

export default moreDB;