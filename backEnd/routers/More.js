import Router from "koa-router";
import { getAward, updateAward } from "../Controller/More.js";

const moreRouter = new Router({
    prefix: '/more'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
*/
moreRouter.use((ctx, nxt) => {
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

// 202 不存在
moreRouter.get('/award', (ctx, nxt) => {
    let phone = ctx.phone;
    ctx.response.body = JSON.stringify({ award: getAward(phone) });
    return ctx.status = 200
})
moreRouter.post('/award', (ctx, nxt) => {
    let phone = ctx.phone;
    let { data } = ctx.request.body;
    updateAward(phone, data);
    return ctx.status = 200;
})

// moreRouter.get('/all', (ctx, nxt) => {
//     let phone = ctx.phone;

//     ctx.response.body = JSON.stringify({ more: getAllEdus(phone) });
//     return ctx.status = 200
// })

// moreRouter.post('/add', (ctx, nxt) => {
//     let phone = ctx.phone;
//     let { data } = ctx.request.body;
//     addEdu(phone, data);
//     return ctx.status = 200
// })

// moreRouter.post('/update', (ctx, nxt) => {
//     let phone = ctx.phone;
//     let { idx, data } = ctx.request.body;
//     updateIdxEdu(phone, data, idx)
//     return ctx.status = 200
// })

// moreRouter.post('/delete', (ctx, nxt) => {
//     let phone = ctx.phone;
//     let { idx, data } = ctx.request.body;
//     deleteIdxEdu(phone, data, idx)
//     return ctx.status = 200
// })

export default moreRouter;