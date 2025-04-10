# genMyResume
> 什么，我居然能接外包

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