import Router from "koa-router";
import { userExist, addUser, validateAccount, isVIP, modVIP } from "../Controller/User.js";

const userRouter = new Router({
    prefix: '/usr'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
   202 { 不存在 }
*/
userRouter.use(async (ctx, nxt) => {
    if (ctx.url.includes('signin')) {
        await nxt();
    } else {
        let { phone } = ctx.request.body;
        if (!phone) {
            return ctx.status = 201;
        }
        if (userExist(phone)) {
            await nxt();
        } else {
            return ctx.status = 202;
        }
    }
})

/* sign in
    status: 204 { 手机号已经存在 }
            200 { account: 'phone' }
*/
userRouter.post('/signin', async (ctx, nxt) => {
    let { phone, pwd } = ctx.request.body;
    if (userExist(phone)) {
        return ctx.status = 204
    }
    return new Promise(async (resolve) => {
        await addUser(phone, pwd);
        ctx.response.body = JSON.stringify({ account: phone });
        ctx.status = 200;
        resolve();
    })
})

/* login
    203 { 密码错误 }
    200 { account: 'phone' }
*/
userRouter.post('/', (ctx, nxt) => {
    let { phone, pwd } = ctx.request.body;

    if (validateAccount(phone, pwd)) {
        ctx.response.body = JSON.stringify({ account: phone, isVIP: isVIP(phone) });
        return ctx.status = 200
    }
    return ctx.status = 203
})


userRouter.post('/vip/add', async (ctx, nxt) => {
    let { phone } = ctx.request.body;
    return new Promise(async (resolve) => {
        await modVIP(phone, true);
        ctx.status = 200;
        resolve();
    })
})


export default userRouter;