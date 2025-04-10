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

moreRouter.post('/skill/add', (ctx, nxt) => {
    let phone = ctx.phone;
    let { data } = ctx.request.body;
    addSkill(phone, data)
    return ctx.status = 200
})
moreRouter.post('/skill/update', (ctx, nxt) => {
    let phone = ctx.phone;
    let { idx, data } = ctx.request.body;
    updateIdxSkiil(phone, data, idx)
    return ctx.status = 200
})
moreRouter.post('/skill/delete', (ctx, nxt) => {
    let phone = ctx.phone;
    deleteIdxSkill(phone, data, idx)
    return ctx.status = 200
})

export default moreRouter;