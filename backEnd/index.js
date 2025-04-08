import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';

const app = new Koa();
app.use(cors());

// Logger
app.use((ctx, nxt) => {
    console.log(`[${ctx.request.method}]  ${ctx.request.url}`);
    nxt(); // tmd 忘记 next 了
});

// Router
var router = new Router();
router.get('/',(ctx, nxt) => {
    ctx.response.body = 'Hello Koa';
    nxt();
})
app.use(router.routes()).use(router.allowedMethods());


// listen to Port: 8080, do sth. afer init
app.listen(8080, () => {
    console.log('[init] backend on service ...');
});