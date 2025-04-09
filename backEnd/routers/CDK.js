import { genCDK, checkCDK } from "../utils/CDK.js";
import Router from "koa-router";

const cdkRouter = new Router({
    prefix: '/cdk'
});

cdkRouter.post('/', (ctx, nxt) => {
    let { uid, tid } = ctx.request.body;
    ctx.response.body = genCDK(uid, tid);
    nxt();
})

cdkRouter.post('/check', (ctx, nxt) => {
    let { cdk, uid, tid } = ctx.request.body;
    ctx.response.body = checkCDK(cdk, uid, tid);
    nxt();
})

export default cdkRouter;