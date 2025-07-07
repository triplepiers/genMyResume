/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import { tp_db_file as db_file } from './config.js';
import { JSONFilePreset } from 'lowdb/node';

// read or create dbFile
const tpDB = await JSONFilePreset(db_file, { tps: [] });

tpDB.initDB = async () => {
    console.log('Init (TemplateDB)');
    const { tps } = tpDB.data;
    if (!(tps.find((tp) => tp.phone === '00'))) {
        console.log('No admin more found, create one ...');
        await tpDB.update(({ tps }) => tps.push({
            phone: "00",
            purchased: [
                {
                    tid: 'S01',
                    hasDown: false,
                    hasBuy: false
                }
            ]
        }));
    } else {
        console.log('Admin more found, skip create ...');
    }
}

export default tpDB;