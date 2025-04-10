import DBList from "./db/index.js";

// init DBs
for (let db of DBList) {
    db.initDB();
}