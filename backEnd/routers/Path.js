/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import Router from "koa-router";
import { headExist } from "../Controller/Head.js";
import { getCompList, genCareerPath } from "../Controller/Path.js";

const pathRouter = new Router({
    prefix: '/path'
});


/* 拦截，统一 check user是否存在
   201 { 没带 }
   204 { 没写过简历 }
*/
pathRouter.use(async (ctx, nxt) => {
    if (ctx.method == 'GET') {
        var { phone }  = ctx.query;
    } else {
        var { phone }  = ctx.request.body;
    }
    if (!phone) {
        return ctx.status = 201;
    } else {
        ctx.phone = phone;
        if (!headExist(phone)) { return ctx.status = 204; } 
    }
    await nxt();
})

// 获取：公司名称列表
pathRouter.get('/', (ctx, nxt) => {
    ctx.response.body = JSON.stringify({ compList: getCompList() }); // compressed
    return ctx.status = 200
})

pathRouter.get('/comp', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { compName } = ctx.query;
    ctx.status = 200
    return new Promise(resolve => {
        genCareerPath(phone, compName)
            .then( res => {
                ctx.response.body = JSON.stringify(res)
                resolve()
            })
    })
})

export default pathRouter;