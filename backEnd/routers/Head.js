import Router from "koa-router";
import { headExist, getHead, addHead, updateHead } from "../Controller/Head.js";

const headRouter = new Router({
    prefix: '/head'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
*/
headRouter.use(async (ctx, nxt) => {
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

// 获取
// 202 不存在
headRouter.get('/', (ctx, nxt) => {
    let phone = ctx.phone;
    if (!headExist(phone)) {
        // return ctx.status = 202
        ctx.response.body = JSON.stringify({ head: "" });
    } else {
        ctx.response.body = JSON.stringify({ head: getHead(phone) });
    }
    return ctx.status = 200
}) 

// 更新
headRouter.post('/', async (ctx, nxt) => {
    let { phone, data } = ctx.request.body;
    return new Promise(async (resolve) => {
        if (!headExist(phone)) {
            await addHead(phone, data);
        } else {
            await updateHead(phone, data);
        }
        ctx.status = 200;
        resolve();
    })
})

export default headRouter;