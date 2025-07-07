/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import Router from "koa-router";
import {
    getAward,
    updateAward,
    getAllSkills,
    getIdxSkill,
    addSkill,
    updateIdxSkiil,
    deleteIdxSkill
} from "../Controller/More.js";

const moreRouter = new Router({
    prefix: '/more'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
*/
moreRouter.use(async (ctx, nxt) => {
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

// 202 不存在
moreRouter.get('/award', (ctx, nxt) => {
    let phone = ctx.phone;
    ctx.response.body = JSON.stringify({ award: getAward(phone) });
    return ctx.status = 200
})
moreRouter.post('/award', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { data } = ctx.request.body;
    return new Promise(async (resolve) => {
        await updateAward(phone, data);
        ctx.status = 200;
        resolve();
    })
})

// 单个
moreRouter.get('/skill', (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx } = ctx.query;
    ctx.response.body = JSON.stringify({ skill: getIdxSkill(phone, idx) });
    return ctx.status = 200
})
// 所有
moreRouter.get('/skill/all', (ctx, nxt) => {
    let phone = ctx.phone;
    ctx.response.body = JSON.stringify({ skill: getAllSkills(phone) });
    return ctx.status = 200
})

moreRouter.post('/skill/add', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { data } = ctx.request.body;
    return new Promise(async (resolve) => {
        await addSkill(phone, data);
        ctx.status = 200;
        resolve();
    })
})

moreRouter.post('/skill/update', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx, data } = ctx.request.body;
    return new Promise(async (resolve) => {
        await updateIdxSkiil(phone, data, idx);
        ctx.status = 200;
        resolve();
    })
})
moreRouter.post('/skill/delete', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx } = ctx.request.body;
    return new Promise(async (resolve) => {
        await deleteIdxSkill(phone, idx);
        ctx.status = 200;
        resolve();
    })
})

export default moreRouter;