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
iFlower
├─ iflowershop
│  ├─ .babelrc
│  ├─ .browserslistrc
│  ├─ .env.development
│  ├─ .env.production
│  ├─ babel.config.js
│  ├─ jsconfig.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  └─ index.html
│  ├─ README.md
│  ├─ src
│  │  ├─ api
│  │  │  ├─ address.js
│  │  │  ├─ cart.js
│  │  │  ├─ city.js
│  │  │  ├─ goods.js
│  │  │  ├─ order.js
│  │  │  ├─ payment.js
│  │  │  ├─ sort.js
│  │  │  ├─ specification.js
│  │  │  ├─ swiper.js
│  │  │  ├─ uploader.js
│  │  │  ├─ user.js
│  │  │  └─ veriCode.js
│  │  ├─ App.vue
│  │  ├─ assets
│  │  │  ├─ images
│  │  │  │  ├─ cart
│  │  │  │  │  └─ cartback.webp
│  │  │  │  ├─ home
│  │  │  │  │  ├─ 1.webp
│  │  │  │  │  ├─ 2.webp
│  │  │  │  │  ├─ 3.webp
│  │  │  │  │  ├─ 4.webp
│  │  │  │  │  ├─ 5.webp
│  │  │  │  │  ├─ 6.webp
│  │  │  │  │  ├─ 7.webp
│  │  │  │  │  ├─ dangao.webp
│  │  │  │  │  ├─ hualan.webp
│  │  │  │  │  ├─ huashu.webp
│  │  │  │  │  ├─ lihe.webp
│  │  │  │  │  └─ lvzhi.webp
│  │  │  │  ├─ login
│  │  │  │  ├─ logo.webp
│  │  │  │  ├─ mine
│  │  │  │  │  └─ mine_bgi.webp
│  │  │  │  ├─ order
│  │  │  │  │  └─ nothing.png
│  │  │  │  └─ sort
│  │  │  │     └─ banner.webp
│  │  │  └─ styles
│  │  │     ├─ less
│  │  │     │  └─ vant.less
│  │  │     └─ scss
│  │  │        ├─ global.scss
│  │  │        └─ reset.scss
│  │  ├─ components
│  │  │  ├─ goodsList.vue
│  │  │  └─ userAddressList.vue
│  │  ├─ main.js
│  │  ├─ router
│  │  │  └─ index.js
│  │  ├─ store
│  │  │  └─ index.js
│  │  ├─ utils
│  │  │  ├─ myAxios
│  │  │  │  ├─ handlerAxios.js
│  │  │  │  └─ index.js
│  │  │  └─ vant
│  │  │     └─ index.js
│  │  └─ views
│  │     ├─ addShipping-address
│  │     │  └─ index.vue
│  │     ├─ clearing
│  │     │  ├─ buyerInfo
│  │     │  │  └─ index.vue
│  │     │  ├─ index.vue
│  │     │  └─ invoice
│  │     │     └─ index.vue
│  │     ├─ details
│  │     │  └─ index.vue
│  │     ├─ editShipping-address
│  │     │  └─ index.vue
│  │     ├─ iflower
│  │     │  ├─ cart.vue
│  │     │  ├─ home.vue
│  │     │  ├─ index.vue
│  │     │  ├─ mine.vue
│  │     │  ├─ searchResult.vue
│  │     │  └─ sort.vue
│  │     ├─ login
│  │     │  ├─ index.vue
│  │     │  ├─ login.vue
│  │     │  └─ register.vue
│  │     ├─ personal-order
│  │     │  ├─ index.vue
│  │     │  └─ orderDetails.vue
│  │     ├─ search
│  │     │  └─ index.vue
│  │     ├─ setting
│  │     │  ├─ changePassword.vue
│  │     │  ├─ index.vue
│  │     │  └─ personalData.vue
│  │     └─ shipping-address
│  │        └─ index.vue
│  └─ vue.config.js
├─ iFlower日程表.xlsx
├─ README.md
├─ request.js
├─ 项目骨架.xmind
└─ 首页商品图片
   ├─ 友情鲜花
   │  ├─ 219-23314812823313514317851231172148.webp
   │  ├─ 249-23314812823313514319044231172148.webp
   │  ├─ 269-23314812823313514312710231172148.webp
   │  ├─ 269-23314812823313514316042231172148.webp
   │  ├─ 298-23314812823313514314598231172148.webp
   │  ├─ 5269-2331481282331351437895231172148.webp
   │  ├─ 5339-2331481282331351438942231172148.webp
   │  ├─ 5389-2331481282331351438454231172148.webp
   │  └─ tinified (1)
   │     ├─ 0.jpg
   │     ├─ 1.jpg
   │     ├─ 2.jpg
   │     └─ 3.jpg
   ├─ 头像
   │  ├─ gg.jpg
   │  └─ mm.jpg
   ├─ 开业花篮
   │  ├─ 258-23314812823313514310245231172148.webp
   │  ├─ 398-23314812823313514310711231172148.webp
   │  ├─ 399-23314812823313514311265231172148.webp
   │  ├─ 5328-2331481282331351438936231172148.webp
   │  ├─ 5359-2331481282331351436358231172148.webp
   │  ├─ 5379-2331481282331351437698231172148.webp
   │  ├─ 5498-2331481282331351438736231172148.webp
   │  └─ 5569-2331481282331351435512231172148.webp
   ├─ 爱情鲜花
   │  ├─ 169-23314812823313514323467231172148.webp
   │  ├─ 219-23314812823313514315075231172148.webp
   │  ├─ 229-23314812823313514325643231172148.webp
   │  ├─ 328-23314812823313514316022231172148.webp
   │  ├─ 339-23314812823313514319553231172148.webp
   │  ├─ 499-23314812823313514311383231172148.webp
   │  ├─ 688-23314812823313514313459231172148.webp
   │  └─ 699-23314812823313514312821231172148.webp
   ├─ 绿植
   │  ├─ 5389-2331481282331351433236231172148.webp
   │  ├─ 5429-2331481282331351431256231172148.webp
   │  ├─ 5438-2331481282331351432845231172148.webp
   │  ├─ 5489-2331481282331351434563231172148.webp
   │  ├─ 5539-2331481282331351432549231172148.webp
   │  ├─ 5569-2331481282331351432569231172148.webp
   │  ├─ 5659-2331481282331351431359231172148.webp
   │  ├─ 65396-233148128233135143845231172148.webp
   │  └─ tinified
   │     ├─ 0.jpg
   │     ├─ 1.jpg
   │     ├─ 2.jpg
   │     └─ 3.jpg
   ├─ 蛋糕
   │  ├─ 5219-2331481282331351431945231172148.webp
   │  ├─ 5219-2331481282331351433501231172148.webp
   │  ├─ 5239-2331481282331351431558231172148.webp
   │  ├─ 5239-2331481282331351432678231172148.webp
   │  ├─ 5239-2331481282331351433178231172148.webp
   │  ├─ 5239-2331481282331351433732231172148.webp
   │  ├─ 5239-2331481282331351435011231172148.webp
   │  └─ 5459-2331481282331351431072231172148.webp
   └─ 鲜花礼盒
      ├─ 189-23314812823313514312354231172148.webp
      ├─ 239-23314812823313514311897231172148.webp
      ├─ 239-23314812823313514312248231172148.webp
      ├─ 239-23314812823313514315632231172148.webp
      ├─ 339-23314812823313514311366231172148.webp
      ├─ 339-23314812823313514313960231172148.webp
      ├─ 5189-2331481282331351439856231172148.webp
      ├─ 5339-2331481282331351436594231172148.webp
      └─ tinified
         ├─ 0.jpg
         ├─ 1.jpg
         ├─ 2.jpg
         └─ 3.jpg

```
