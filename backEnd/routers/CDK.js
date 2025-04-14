import { genCDK, checkCDK } from "../utils/CDK.js";
import { buy } from "../Controller/Template.js";
import Router from "koa-router";

const cdkRouter = new Router({
    prefix: '/cdk'
});

cdkRouter.use((ctx, nxt) => {
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

cdkRouter.post('/', (ctx, nxt) => {
    let uid = ctx.phone;
    let { tid } = ctx.request.body;
    let cdk = genCDK(uid, tid);
    ctx.response.body = cdk;
    nxt();
})

cdkRouter.post('/check', (ctx, nxt) => {
    let uid = ctx.phone;
    let { cdk, tid } = ctx.request.body;
    let res = checkCDK(cdk, uid, tid)
    if (tid !== 'vip' && res) { // 购买 template
        buy(uid, tid);
    }
    ctx.response.body = res;
    nxt();
})

export default cdkRouter;