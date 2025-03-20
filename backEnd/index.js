const Koa = require('koa');
const app = new Koa();

// Logger
app.use((ctx, nxt) => {
    console.log(`[${ctx.request.method}]  ${ctx.request.url}`);
});

// Router
var Router = require('koa-router');
var router = new Router();
router.get('/',(ctx, nxt) => {
    return ctx.response.body = 'Hello Koa';
})
app.use(router.routes()).use(router.allowedMethods());

// listen to Port: 8080, do sth. afer init
app.listen(8080, () => {
    console.log('[init] backend on service ...');
});