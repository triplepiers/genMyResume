# genMyResume
> 什么，我居然能接外包

## Bug

header 的样式会变

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

## 后端

- 技术栈：NodeJS + [LowDB](https://github.com/typicode/lowdb)（实在不想在别人的电脑上装 MySQL 了）

- 启动：
    ```bash
    cd backEnd
    npm run dev # 正式跑的时候换成 npm run start
    ```