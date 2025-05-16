import userDB from "./UserDB.js";
import headDB from "./HeadDB.js";
import eduDB from "./EduDB.js";
import workDB from "./WorkDB.js";
import moreDB from "./MoreDB.js";
import ssDB from './SelfStatementDB.js';
import tpDB from "./TemplateDB.js";
import { recDB } from "./JobRec.js";

const DBList = [
    userDB,
    headDB,
    eduDB,
    workDB,
    moreDB,
    ssDB,
    tpDB,
    recDB
]

function initDBs() {
    console.log('\n[init] Initialing database:')
    for (let db of DBList) { db.initDB(); }
    console.log('[init] Database init finished! \n')
}

export default initDBs;