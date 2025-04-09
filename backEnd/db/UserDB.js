import { user_db_file as db_file } from './config.js';
import { JSONFilePreset } from 'lowdb/node';


// console.log('Load UserDB from:', db_file);

// read or create dbFile
const userDB = await JSONFilePreset(db_file, { users: [] });

userDB.initDB = async () => {
    console.log('Init UserDB ...');
    const { users } = userDB.data;
    if (!(users.find((user) => user.phone === '00'))) {
        console.log('No admin user found, create one ...');
        await userDB.update(({ users }) => users.push({
            isVIP:    true,
            phone:    '00',
            password: '123'
        }));
    } else {
        console.log('Admin user found, skip create ...');
    }
}

export default userDB;