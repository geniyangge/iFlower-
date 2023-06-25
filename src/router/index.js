import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入组件
import iflower from '@/views/iflower';
// 引入vant组件
import { Notify } from 'vant';

Vue.use(VueRouter);

// 解决重复路由跳转报错
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};


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
      },
      // {
      // 触底加载
      //   path: 'searchResult',
      //   name: 'SearchResult',
      //   component: () => import('@/views/iflower/searchResult.vue'),
      // },
      {
        // test虚拟列表
        path: 'searchResult',
        name: 'SearchResult',
        component: () => import('@/views/test-virtual_list/index.vue'),
      },
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
  // search
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/index.vue'),
  },
  // 我的订单
  {
    path: '/order',
    component: () => import('@/views/personal-order/index.vue'),
    meta: {
      // 需要登录
      required: true,
    },
  },
  // 订单详情
  {
    path: '/orderDetails',
    name: 'OrderDetails',
    component: () => import('@/views/personal-order/orderDetails.vue'),
    meta: {
      // 需要登录
      required: true,
    },
  },
  // 收货地址
  {
    path: '/address',
    component: () => import('@/views/shipping-address/index.vue'),
    meta: {
      // 需要登录
      required: true,
    },
  },
  // 新增收货地址
  {
    path: '/newAddress',
    name: 'NewAddress',
    component: () => import('@/views/addShipping-address/index.vue'),
    meta: {
      // 需要登录
      required: true,
    },
  },
  // 编辑收货地址
  {
    path: '/editAddress',
    name: 'EditAddress',
    component: () => import('@/views/editShipping-address/index.vue'),
    meta: {
      // 需要登录
      required: true,
    },
  },
  // 商品详情
  {
    path: '/details',
    name: 'Details',
    component: () => import('@/views/details/index.vue'),
  },
  // 结算页
  {
    path: '/clearing',
    name: 'Clearing',
    component: () => import('@/views/clearing/index.vue'),
    meta: {
      // 需要登录
      required: true,
    },
  },
  // 设置页
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/setting/index.vue'),
    meta: {
      // 需要登录
      required: true,
    }
  },
  // 个人资料页
  {
    path: '/personalData',
    name: 'PersonalData',
    component: () => import('@/views/setting/personalData.vue'),
    meta: {
      // 需要登录
      required: true,
    }
  },
  // 修改密码页
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: () => import('@/views/setting/changePassword.vue'),
    meta: {
      // 需要登录
      required: true,
    }
  },
];

const router = new VueRouter({
  routes,
});

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // 获取登录状态
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || null);
  // 判断目标页面是否需要登录验证
  let isRequired = to.matched.some(route => route.meta.required === true);

  // 不用验证，直接放行
  if (!isRequired) return next();
  // 未登录，携带登录信息前往登录页
  if (!userInfo) {
    // 提示 请登录
    Notify({
      message: '请先登录',
      duration: 1500,
      type: 'danger',
    });
    let toPath = encodeURI(to.fullPath);
    return next({ name: 'Login', query: { toPath } });
  }

  // 已登录，直接放行
  next();
});

// 全局后置路由守卫
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

export default router;
