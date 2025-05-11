import Router from "koa-router";
import { headExist } from "../Controller/Head.js";
import { isVIP } from "../Controller/User.js";
import { getRandDetails } from "../Controller/Job.js";

const jobRouter = new Router({
    prefix: '/job'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
   204 { 没写过简历 }
*/
jobRouter.use(async (ctx, nxt) => {
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

jobRouter.get('/', async (ctx, nxt) => {
    let phone = ctx.phone;
    let n = isVIP(phone)?40:10; // VIP:40, 普:10
    let details = getRandDetails(n);
    ctx.response.body = JSON.stringify({ details: details });
    return ctx.status = 200;
})

export default jobRouter;