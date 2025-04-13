import userDB from "./UserDB.js";
import headDB from "./HeadDB.js";
import eduDB from "./EduDB.js";
import workDB from "./WorkDB.js";
import moreDB from "./MoreDB.js";
import ssDB from './SelfStatement.js'

const DBList = [
    userDB,
    headDB,
    eduDB,
    workDB,
    moreDB,
    ssDB
]

function initDBs() {
    console.log('\n[init] Initialing database:')
    for (let db of DBList) { db.initDB(); }
    console.log('[init] Database init finished! \n')
}

export default initDBs;