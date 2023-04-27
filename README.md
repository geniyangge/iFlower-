# iflowershop —— 基于 vue2.0 + vant-ui 的移动端订花商城

## 安装项目依赖包 Project setup

```
npm install
```

### 编译并在开发模式下运行 Compiles and hot-reloads for development

```
npm run serve
```

### 编译并打包项目 Compiles and minifies for production

```
npm run build
```

### 项目目录结构

```
iflowershop
├─ .babelrc
├─ .browserslistrc
├─ .env.development
├─ .env.production
├─ babel.config.js
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
├─ src
│  ├─ api
│  │  ├─ address.js
│  │  ├─ cart.js
│  │  ├─ city.js
│  │  ├─ goods.js
│  │  ├─ order.js
│  │  ├─ payment.js
│  │  ├─ sort.js
│  │  ├─ specification.js
│  │  ├─ swiper.js
│  │  ├─ uploader.js
│  │  ├─ user.js
│  │  └─ veriCode.js
│  ├─ App.vue
│  ├─ assets
│  │  ├─ images
│  │  │  ├─ cart
│  │  │  │  └─ cartback.webp
│  │  │  ├─ home
│  │  │  │  ├─ 1.webp
│  │  │  │  ├─ 2.webp
│  │  │  │  ├─ 3.webp
│  │  │  │  ├─ 4.webp
│  │  │  │  ├─ 5.webp
│  │  │  │  ├─ 6.webp
│  │  │  │  ├─ 7.webp
│  │  │  │  ├─ dangao.webp
│  │  │  │  ├─ hualan.webp
│  │  │  │  ├─ huashu.webp
│  │  │  │  ├─ lihe.webp
│  │  │  │  └─ lvzhi.webp
│  │  │  ├─ login
│  │  │  ├─ logo.webp
│  │  │  ├─ mine
│  │  │  │  └─ mine_bgi.webp
│  │  │  ├─ order
│  │  │  │  └─ nothing.png
│  │  │  └─ sort
│  │  │     └─ banner.webp
│  │  └─ styles
│  │     ├─ less
│  │     │  └─ vant.less
│  │     └─ scss
│  │        ├─ global.scss
│  │        └─ reset.scss
│  ├─ components
│  │  ├─ goodsList.vue
│  │  └─ userAddressList.vue
│  ├─ main.js
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  └─ index.js
│  ├─ utils
│  │  ├─ myAxios
│  │  │  ├─ handlerAxios.js
│  │  │  └─ index.js
│  │  └─ vant
│  │     └─ index.js
│  └─ views
│     ├─ addShipping-address
│     │  └─ index.vue
│     ├─ clearing
│     │  ├─ buyerInfo
│     │  │  └─ index.vue
│     │  ├─ index.vue
│     │  └─ invoice
│     │     └─ index.vue
│     ├─ details
│     │  └─ index.vue
│     ├─ editShipping-address
│     │  └─ index.vue
│     ├─ iflower
│     │  ├─ cart.vue
│     │  ├─ home.vue
│     │  ├─ index.vue
│     │  ├─ mine.vue
│     │  ├─ searchResult.vue
│     │  └─ sort.vue
│     ├─ login
│     │  ├─ index.vue
│     │  ├─ login.vue
│     │  └─ register.vue
│     ├─ personal-order
│     │  ├─ index.vue
│     │  └─ orderDetails.vue
│     ├─ search
│     │  └─ index.vue
│     ├─ setting
│     │  ├─ changePassword.vue
│     │  ├─ index.vue
│     │  └─ personalData.vue
│     └─ shipping-address
│        └─ index.vue
└─ vue.config.js

```
