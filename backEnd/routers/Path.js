import Router from "koa-router";
import { getCompList } from "../Controller/Path.js";

const pathRouter = new Router({
    prefix: '/path'
});

// 获取：公司名称列表
pathRouter.get('/', (ctx, nxt) => {
    ctx.response.body = JSON.stringify({ compList: getCompList() }); // compressed
    return ctx.status = 200
})

export default pathRouter;