import Router from "koa-router";
import {
    getProfile
} from "../Controller/Template.js";

const tpRouter = new Router({
    prefix: '/tp'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
*/
tpRouter.use(async (ctx, nxt) => {
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

// // 返回 ss
// tpRouter.get('/', (ctx, nxt) => {
//     let phone = ctx.phone;
//     ctx.response.body = JSON.stringify({ ss: getSS(phone) });
//     return ctx.status = 200
// })

tpRouter.get('/profile', (ctx, nxt) => {
    let phone = ctx.phone;
    ctx.response.body = JSON.stringify({ profile: getProfile(phone) });
    return ctx.status = 200
})

export default tpRouter;