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
│  ├─ dist
│  │  ├─ css
│  │  │  ├─ 154.f1a698d5.css
│  │  │  ├─ 309.161b3492.css
│  │  │  ├─ 37.e950ce3d.css
│  │  │  ├─ 391.041a6d5b.css
│  │  │  ├─ 404.9ee24e02.css
│  │  │  ├─ 413.a41931f6.css
│  │  │  ├─ 463.359320f2.css
│  │  │  ├─ 490.87f47236.css
│  │  │  ├─ 546.c353f637.css
│  │  │  ├─ 613.7a7d980c.css
│  │  │  ├─ 637.4ab579c6.css
│  │  │  ├─ 67.cfabb294.css
│  │  │  ├─ 675.a6ca58d1.css
│  │  │  ├─ 682.c12dadb5.css
│  │  │  ├─ 745.34243b45.css
│  │  │  ├─ 897.69a32bf5.css
│  │  │  ├─ 898.01f753f2.css
│  │  │  ├─ 899.fad6a03f.css
│  │  │  ├─ 935.9e7ed103.css
│  │  │  ├─ app.f5df7524.css
│  │  │  └─ chunk-vendors.119c3cd9.css
│  │  ├─ favicon.ico
│  │  ├─ img
│  │  │  ├─ 5.8695fbbd.webp
│  │  │  ├─ 6.28e61201.webp
│  │  │  ├─ banner.d8a0ea96.webp
│  │  │  ├─ logo.f58906c9.webp
│  │  │  └─ nothing.8a54289b.png
│  │  ├─ index.html
│  │  └─ js
│  │     ├─ 154.1bcfd972.js
│  │     ├─ 154.1bcfd972.js.map
│  │     ├─ 309.117fc126.js
│  │     ├─ 309.117fc126.js.map
│  │     ├─ 37.257d1480.js
│  │     ├─ 37.257d1480.js.map
│  │     ├─ 391.2e62c2cd.js
│  │     ├─ 391.2e62c2cd.js.map
│  │     ├─ 404.3ff65ed6.js
│  │     ├─ 404.3ff65ed6.js.map
│  │     ├─ 413.2f6927cf.js
│  │     ├─ 413.2f6927cf.js.map
│  │     ├─ 463.5891b0eb.js
│  │     ├─ 463.5891b0eb.js.map
│  │     ├─ 490.e9dc8ab8.js
│  │     ├─ 490.e9dc8ab8.js.map
│  │     ├─ 546.c3da8371.js
│  │     ├─ 546.c3da8371.js.map
│  │     ├─ 613.11b91161.js
│  │     ├─ 613.11b91161.js.map
│  │     ├─ 637.2246ca2a.js
│  │     ├─ 637.2246ca2a.js.map
│  │     ├─ 67.da65f0a2.js
│  │     ├─ 67.da65f0a2.js.map
│  │     ├─ 675.c4d2cf61.js
│  │     ├─ 675.c4d2cf61.js.map
│  │     ├─ 682.3204070e.js
│  │     ├─ 682.3204070e.js.map
│  │     ├─ 745.c13b16a5.js
│  │     ├─ 745.c13b16a5.js.map
│  │     ├─ 786.f7308841.js
│  │     ├─ 786.f7308841.js.map
│  │     ├─ 797.3544193a.js
│  │     ├─ 797.3544193a.js.map
│  │     ├─ 826.ebd016bd.js
│  │     ├─ 826.ebd016bd.js.map
│  │     ├─ 897.0d5cd9be.js
│  │     ├─ 897.0d5cd9be.js.map
│  │     ├─ 898.e40c17e0.js
│  │     ├─ 898.e40c17e0.js.map
│  │     ├─ 899.0d40931a.js
│  │     ├─ 899.0d40931a.js.map
│  │     ├─ 935.9eaf1c03.js
│  │     ├─ 935.9eaf1c03.js.map
│  │     ├─ app.99f2bd33.js
│  │     ├─ app.99f2bd33.js.map
│  │     ├─ chunk-vendors.b95e0976.js
│  │     └─ chunk-vendors.b95e0976.js.map
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
