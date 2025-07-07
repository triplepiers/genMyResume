/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import { job_db_files } from './config.js';
import { JSONFilePreset } from 'lowdb/node';

const { rec_db_file, detail_db_file, req_db_file } = job_db_files;

const detailDB = await JSONFilePreset(detail_db_file, { jobs: [] })
const reqDB    = await JSONFilePreset(req_db_file, { jobs: [] });

// read or create dbFile
const recDB = await JSONFilePreset(rec_db_file, { recs: [] });

recDB.initDB = async () => {
    console.log('Init (JobRecDB)');
    const { recs } = recDB.data;
    if (!(recs.find((rec) => rec.phone === '00'))) {
        console.log('No admin rec found, create one ...');
        await recDB.update(({ recs }) => recs.push({
            phone: '00',
            lastTime: Date.now(),
            recs: []
        }))
    } else {
        console.log('Admin rec found, skip creating ...');
    }
}

export {
    recDB,
    detailDB,
    reqDB
};