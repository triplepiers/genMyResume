import userDB from "./UserDB.js";
import headDB from "./HeadDB.js";
import eduDB from "./EduDB.js";
import workDB from "./WorkDB.js";

const DBList = [
    userDB,
    headDB,
    eduDB,
    workDB
]

function initDBs() {
    console.log('\n[init] Initialing database:')
    for (let db of DBList) { db.initDB(); }
    console.log('[init] Database init finished! \n')
}

export default initDBs;