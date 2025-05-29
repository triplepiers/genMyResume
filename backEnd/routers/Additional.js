// 属于是和 Education 没啥区别
import Router from "koa-router";
import {
    getAllAdds,
    getUuidAdd,
    addAdd,
    updateUuidAdd,
    deleteUuidAdd
} from "../Controller/Additional.js";

const addRouter = new Router({
    prefix: '/addi'
});

/* 拦截，统一 check user是否存在
   201 { 没带 }
*/
addRouter.use((ctx, nxt) => {
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

// 获取：指定 idx
// 202 不存在
addRouter.get('/', (ctx, nxt) => {
    let phone = ctx.phone;
    let { uuid } = ctx.query;
    ctx.response.body = JSON.stringify({ sec: getUuidAdd(phone, uuid) });
    return ctx.status = 200
})

addRouter.get('/all', (ctx, nxt) => {
    let phone = ctx.phone;
    
    ctx.response.body = JSON.stringify({ sec: getAllAdds(phone) });
    return ctx.status = 200
})

addRouter.post('/add', (ctx, nxt) => {
    let phone = ctx.phone;
    let { data } = ctx.request.body;
    addAdd(phone, data);
    return ctx.status = 200
})

addRouter.post('/update', (ctx, nxt) => {
    let phone = ctx.phone;
    let { uuid, data } = ctx.request.body;
    updateUuidAdd(phone, data, uuid)
    return ctx.status = 200
})

addRouter.post('/delete', (ctx, nxt) => {
    let phone = ctx.phone;
    let { uuid } = ctx.request.body;
    deleteUuidAdd(phone, uuid)
    return ctx.status = 200
})

export default addRouter;