# genMyResume
> 什么，我居然能接外包

## NGINX 配置（片段）

```conf
# Web Server
server {
        listen 80; # port
        server_name localhost;
        server_name www.seabee.icu;     # 域名
        server_name 20.2.117.32;   # 支持直接通过 IP 访问
        charset utf-8; # defualt charset

        # 转发到后端端口
        location ^~ /api {
                #return 200 'prefix match';
                proxy_pass http://127.0.0.1:8080;
        }

        location / {
                #return 200 'general match';
                proxy_pass http://127.0.0.1:3000;
                root html;
                index index.html index.htm;
        }

        # 错误页面（back to index）
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
                root front;
        }
}
```

## 打包

- 修改后的前端支持纯静态资源打包（小了很多）

    命令为 `npm run build`，之后会生成一个 `out` 文件夹

    把这个文件夹丢到 Server + Nginx 代理就可以了，教程看 [这里](https://blog.csdn.net/qq_34241004/article/details/140154735)

    > 默认命令会把 `node_modules` 也放进去，导致巨大无比

- 显示隐藏文件： command + shift + .

- 将本地压缩包传送到服务器：

    ```bash
    scp ~/desktop/standalone.zip seabee@20.2.117.32:~/standalone.zip
    ```

- 在 linux 上解压缩：

    ```bash
    unzip standalone.zip -d ~/standalone
    ```

- 启动前端

    安装依赖

    ```bash
    npm install -g pm2
    ```

    启动服务（换成 server.js）

    ```bash
    pm2 start app.js        // 启动
    pm2 start app.js -i max //启动 使用所有CPU核心的集群
    pm2 stop app.js         // 停止
    pm2 stop all            // 停止所有
    pm2 restart app.js      // 重启
    pm2 restart all         // 重启所有
    pm2 delete  app.js      // 关闭
    ```

- 前端反向代理到 3000 已成功

- Koa 好像不能打包，直接压缩包过去 pm2 start index.js 了

## TODO 富文本编辑器

- [TinyMice](https://juejin.cn/post/7124588377541705736)

## Bug

header 的样式会变

select 无法清空(好了)

没等待直接请求会显示不出来(md 手动延迟)

## init

- NPM 换源：

    ```bash
    npm config set registry https://mirrors.huaweicloud.com/repository/npm/
    ```

## 前端

- 技术栈：React(NextJS)、TailWind CSS

    - 使用 react-color 实现自定义颜色选择
    - 使用 Material-UI 实现表单组件
      - 妈的样式定义太丑了，换成 MUI-tailWind 了 => giao 超难用
      - 然后发现还有 Shadcn 和 nextui 这种好东西

可以删掉 @mui/icons-material @emotion/styles 之类的 

month picker 不想自己重新写，直接用了 ElementUI

INPUT-OTP 可以用来做验证码输入框

## 后端

- 技术栈：NodeJS + [LowDB](https://github.com/typicode/lowdb)（实在不想在别人的电脑上装 MySQL 了）

- 配置 LLM 调用环境

    在 `backEnd` 目录下新建 `.env` 文件，内容如下：

    ```text
    MODEL_URL='https://api.deepseek.com'
    MODEL_KEY='sk-******'                # 请替换为自己的 Key
    MODEL_NAME='deepseek-chat'
    ```

- 启动：
    ```bash
    cd backEnd
    npm run dev # 正式跑的时候换成 npm run start
    ```