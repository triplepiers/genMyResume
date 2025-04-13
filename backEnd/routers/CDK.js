import { genCDK, checkCDK } from "../utils/CDK.js";
import Router from "koa-router";

const cdkRouter = new Router({
    prefix: '/cdk'
});

cdkRouter.post('/', (ctx, nxt) => {
    let { uid, tid } = ctx.request.body;
    let cdk = genCDK(uid, tid);
    ctx.response.body = cdk;
    console.log(`CDK for user[${uid}] for purchasing [${tid}]: ${cdk}`);
    nxt();
})

cdkRouter.post('/check', (ctx, nxt) => {
    let { cdk, uid, tid } = ctx.request.body;
    ctx.response.body = checkCDK(cdk, uid, tid);
    nxt();
})

export default cdkRouter;