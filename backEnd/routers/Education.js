/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import Router from "koa-router";
import {
    getAllEdus,
    getIdxEdu,
    addEdu,
    updateIdxEdu,
    deleteIdxEdu
} from "../Controller/Education.js";

const eduRouter = new Router({
    prefix: '/edu'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
*/
eduRouter.use(async (ctx, nxt) => {
    if (ctx.method == 'GET') {
        var { phone }  = ctx.query;
    } else {
        var { phone }  = ctx.request.body;
    }
    if (!phone) {
        return ctx.status = 201;
    } else {
        ctx.phone = phone;
    }
    await nxt();
})

// 获取：指定 idx
// 202 不存在
eduRouter.get('/', (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx } = ctx.query;
    ctx.response.body = JSON.stringify({ edu: getIdxEdu(phone, idx) });
    return ctx.status = 200
})

eduRouter.get('/all', (ctx, nxt) => {
    let phone = ctx.phone;

    ctx.response.body = JSON.stringify({ edu: getAllEdus(phone) });
    return ctx.status = 200
})

eduRouter.post('/add', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { data } = ctx.request.body;
    return new Promise(async (resolve) => {
        await addEdu(phone, data);
        ctx.status = 200;
        resolve();
    })
})

eduRouter.post('/update', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx, data } = ctx.request.body;
    return new Promise(async (resolve) => {
        await updateIdxEdu(phone, data, idx);
        ctx.status = 200;
        resolve();
    })
})

eduRouter.post('/delete', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx } = ctx.request.body;
    return new Promise(async (resolve) => {
        await deleteIdxEdu(phone, idx);
        ctx.status = 200;
        resolve();
    })
})

export default eduRouter;