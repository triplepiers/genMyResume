/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

// 属于是和 Education 没啥区别
import Router from "koa-router";
import {
    getAllAdds,
    getUuidAdd,
    addAdd,
    updateUuidAdd,
    deleteUuidAdd
} from "../Controller/Additional.js";

const addRouter = new Router({
    prefix: '/addi'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
*/
addRouter.use(async (ctx, nxt) => {
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
addRouter.get('/', (ctx, nxt) => {
    let phone = ctx.phone;
    let { uuid } = ctx.query;
    ctx.response.body = JSON.stringify({ sec: getUuidAdd(phone, uuid) });
    return ctx.status = 200
})

addRouter.get('/all', (ctx, nxt) => {
    let phone = ctx.phone;
    
    ctx.response.body = JSON.stringify({ sec: getAllAdds(phone) });
    return ctx.status = 200
})

addRouter.post('/add', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { data } = ctx.request.body;
    return new Promise(async (resolve) => {
        await addAdd(phone, data);
        ctx.status = 200;
        resolve();
    })
})

addRouter.post('/update', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { uuid, data } = ctx.request.body;
    return new Promise(async (resolve) => {
        await updateUuidAdd(phone, data, uuid);
        ctx.status = 200;
        resolve();
    })
})

addRouter.post('/delete', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { uuid } = ctx.request.body;
    return new Promise(async (resolve) => {
        await deleteUuidAdd(phone, uuid);
        ctx.status = 200;
        resolve();
    })
})

export default addRouter;