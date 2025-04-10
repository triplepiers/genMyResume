import Router from "koa-router";
import {
    eduExist,
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
eduRouter.use((ctx, nxt) => {
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

eduRouter.post('/add', (ctx, nxt) => {
    let phone = ctx.phone;
    let { data } = ctx.request.body;
    addEdu(phone, data);
    return ctx.status = 200
})

eduRouter.post('/update', (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx, data } = ctx.request.body;
    updateIdxEdu(phone, data, idx)
    return ctx.status = 200
})

eduRouter.post('/delete', (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx, data } = ctx.request.body;
    deleteIdxEdu(phone, data, idx)
    return ctx.status = 200
})

export default eduRouter;