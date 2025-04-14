import Router from "koa-router";
import {
    getProfile,
    userExist,
    canDown,
    hasBuy,
    buy,
    hasDown
} from "../Controller/Template.js";

const tpRouter = new Router({
    prefix: '/tp'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
*/
tpRouter.use((ctx, nxt) => {
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
    nxt();
})

// 返回完整用户信息
tpRouter.get('/profile', (ctx, nxt) => {
    let phone = ctx.phone;
    ctx.response.body = JSON.stringify({ profile: getProfile(phone) });
    return ctx.status = 200
})

// 查询是够可以下载
tpRouter.get('/down', (ctx, nxt) => {
    let phone = ctx.phone;
    let { tid } = ctx.query;
    ctx.response.body = JSON.stringify({ canDown: canDown(phone, tid) });
    return ctx.status = 200
})

// 修改下载状态
tpRouter.post('/down', (ctx, nxt) => {
    let phone = ctx.phone;
    let { tid } = ctx.request.body;
    hasDown(phone, tid);
    return ctx.status = 200;
})

export default tpRouter;