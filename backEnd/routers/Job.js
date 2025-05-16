import Router from "koa-router";
import { headExist } from "../Controller/Head.js";
import { isVIP } from "../Controller/User.js";
import { genJobRec } from "../Controller/Job.js";

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

/* 拦截，统一 check user是否存在
   205 { working ... }
*/
jobRouter.get('/', async (ctx, nxt) => {
    let phone = ctx.phone;
    let n = isVIP(phone)?30:10; // VIP:30, 普:10
    
    return new Promise((resolve) => {
        genJobRec(n, phone).then(
            res => {
                if (res.length === 0) { // working
                    ctx.status = 205;
                } else {
                    ctx.status = 200;
                    ctx.response.body = JSON.stringify({ details: res });
                }
                resolve();
            }
        )
    })    
})

export default jobRouter;

