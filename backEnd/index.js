import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { cdkRouter } from './routers/index.js';

const app = new Koa();

// 允许跨域
app.use(cors());
// 解析 post 参数
app.use(bodyParser());

// Logger
app.use((ctx, nxt) => {
    console.log(`[${ctx.request.method}]  ${ctx.request.url}`);
    nxt(); // tmd 忘记 next 了
});


// Router
var router = new Router();
// 用来测试的
router.get('/',(ctx, nxt) => {
    ctx.response.body = 'Hello Koa';
    nxt();
})
router.use(cdkRouter.routes())
app.use(router.routes()).use(router.allowedMethods());


// listen to Port: 8080, do sth. afer init
app.listen(8080, () => {
    console.log('[init] backend on service ...');
});