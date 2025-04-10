// 属于是和 Education 没啥区别
import Router from "koa-router";
import {
    getAllWorks,
    getIdxWork,
    addWork,
    updateIdxWork,
    deleteIdxWork
} from "../Controller/Work.js";

const workRouter = new Router({
    prefix: '/work'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
*/
workRouter.use((ctx, nxt) => {
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
workRouter.get('/', (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx } = ctx.query;
    ctx.response.body = JSON.stringify({ work: getIdxWork(phone, idx) });
    return ctx.status = 200
})

workRouter.get('/all', (ctx, nxt) => {
    let phone = ctx.phone;
    
    ctx.response.body = JSON.stringify({ work: getAllWorks(phone) });
    return ctx.status = 200
})

workRouter.post('/add', (ctx, nxt) => {
    let phone = ctx.phone;
    let { data } = ctx.request.body;
    addWork(phone, data);
    return ctx.status = 200
})

workRouter.post('/update', (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx, data } = ctx.request.body;
    updateIdxWork(phone, data, idx)
    return ctx.status = 200
})

workRouter.post('/delete', (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx, data } = ctx.request.body;
    deleteIdxWork(phone, data, idx)
    return ctx.status = 200
})

export default workRouter;