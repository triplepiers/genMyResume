/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import Router from "koa-router";
import {
    getSS,
    updateSS,
    canGen,
    genSS
} from "../Controller/SelfStatement.js";

const ssRouter = new Router({
    prefix: '/ss'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
*/
ssRouter.use(async (ctx, nxt) => {
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

// 返回 ss
ssRouter.get('/', (ctx, nxt) => {
    let phone = ctx.phone;
    ctx.response.body = JSON.stringify({ ss: getSS(phone) });
    return ctx.status = 200
})
// 修改
ssRouter.post('/', (ctx, nxt) => {
    let phone = ctx.phone;
    let { data } = ctx.request.body;
    updateSS(phone, data);
    return ctx.status = 200
})

// 能不能用 gen
ssRouter.get('/gen', async (ctx, nxt) => {
    let phone = ctx.phone;
    return new Promise(async (resolve) => {
        let cangen = await canGen(phone)
        ctx.response.body = JSON.stringify({ canGen: cangen });
        ctx.status = 200;
        resolve();
    })
    
})
// 生成
ssRouter.post('/gen', async (ctx, nxt) => {
    let phone = ctx.phone;
    return new Promise((resolve) => {
        genSS(phone).then((res) => {
            ctx.response.body = JSON.stringify({ ss: res.slice(1,-1) });
            ctx.status = 200
            resolve()
        })
    })
})

export default ssRouter;