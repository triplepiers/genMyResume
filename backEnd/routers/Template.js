import Router from "koa-router";
import {
    getProfile,
    canDown,
    hasDown
} from "../Controller/Template.js";
import { analyzeResume } from "../Controller/Analyze.js";

const tpRouter = new Router({
    prefix: '/tp'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
*/
tpRouter.use(async (ctx, nxt) => {
    if (ctx.method == 'GET') {
        var { phone } = ctx.query;
    } else {
        var { phone } = ctx.request.body;
    }
    if (!phone) {
        return ctx.status = 201;
    } else {
        ctx.phone = phone;
    }
    await nxt();
})

// 返回完整用户信息
// 204: 滚回去填表吧你
tpRouter.get('/profile', (ctx, nxt) => {
    let phone = ctx.phone;
    let profile = getProfile(phone);

    if (!profile) {
        return ctx.status = 204
    }

    ctx.response.body = JSON.stringify({ profile: getProfile(phone) });
    return ctx.status = 200
})

// 查询是够可以下载
tpRouter.get('/down', (ctx, nxt) => {
    let phone = ctx.phone;
    let { tid } = ctx.query;
    ctx.response.body = JSON.stringify({ canDown: canDown(phone, tid) });
    return ctx.status = 200
})

// 修改下载状态
tpRouter.post('/down', (ctx, nxt) => {
    let phone = ctx.phone;
    let { tid } = ctx.request.body;
    hasDown(phone, tid);
    return ctx.status = 200;
})

// OCR 处理 + 序列化
/* - 200：成功
   - 205：手动填写去吧 */
tpRouter.post('/analyze', async (ctx, nxt) => {
    let phone = ctx.phone;
    let { resume } = ctx.request.body;
    return await new Promise((resolve) => {
        if (resume.length === 0) { // 不分析了
            ctx.status = 200
            resolve()
        } else {
            analyzeResume(phone, resume)
                .then(success => {
                    if (success) ctx.status = 200;
                    else ctx.status = 205;
                    resolve()
                })
        }
    })
})

export default tpRouter;