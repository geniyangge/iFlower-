import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入组件
import iflower from '@/views/iflower';

Vue.use(VueRouter);

const routes = [
  // 主页
  {
    path: '/',
    component: iflower,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/iflower/home.vue'),
      },
      {
        path: 'sort',
        name: 'Sort',
        component: () => import('@/views/iflower/sort.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/iflower/cart.vue'),
      },
      {
        path: 'mine',
        name: 'Mine',
        component: () => import('@/views/iflower/mine.vue'),
      }
    ],
  },
  // login
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/login/login.vue'),
        meta: {
          title: '登录',
        },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/login/register.vue'),
        meta: {
          title: '注册',
        },
      }
    ],
  },
  // 我的订单
  {
    path: '/order',
    component: () => import('@/views/personal-order/index.vue'),
  },
  // 收货地址
  {
    path: '/address',
    component: () => import('@/views/shipping-address/index.vue'),
  },
  // 新增收货地址
  {
    path: '/newAddress',
    name:'NewAddress',
    component: () => import('@/views/addShipping-address/index.vue'),
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // console.log(to);
  next();
});

export default router;
