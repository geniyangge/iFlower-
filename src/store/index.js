import Vue from 'vue';
import Vuex from 'vuex';

// 引入api
import { getUserCartInfo } from '@/api/cart.js';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 控制底部Tabbar的显示与隐藏
    tabbarShow: true,
    // 用户登录信息
    userInfo: JSON.parse(localStorage.getItem('userInfo') || null),
    // 用户收货地址信息(除默认地址)
    userAddressList: JSON.parse(localStorage.getItem('userAddressList') || null),
    // 用户默认收货地址
    defaultAddress: JSON.parse(localStorage.getItem('defaultAddress') || null),
    // 全国城市列表
    cityList: JSON.parse(localStorage.getItem('cityList') || null),
    // 首页轮播图列表
    swiperList: JSON.parse(localStorage.getItem('swiperList') || null),
    // 首页分类及其商品信息
    sortGoodsList: JSON.parse(localStorage.getItem('sortGoodsList') || null),
    // 所有商品分类信息(必须是个数组)
    allSortList: JSON.parse(localStorage.getItem('allSortList') || null) || [],
    // 热门商品列表
    hotGoodsList: JSON.parse(localStorage.getItem('hotGoodsList') || null),
    // 用户购物车商品列表(必须是个数组)
    cartGoodsList: JSON.parse(sessionStorage.getItem('cartGoodsList') || null) || [],
  },
  getters: {
  },
  mutations: {
    // 控制底部Tabbar的显示与隐藏
    showTabbar(state, bool) {
      state.tabbarShow = bool;
    },
    // 添加用户登录信息
    addUserInfo(state, userInfo) {
      // 保存用户信息到vuex
      state.userInfo = userInfo;
      // 保存用户信息到localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    // 删除用户信息
    removeUserInfo(state) {
      // 删除用户登录信息
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      // 删除默认收货地址
      state.defaultAddress = null;
      localStorage.removeItem('defaultAddress');
      // 删除用户收货地址列表
      state.userAddressList = null;
      localStorage.removeItem('userAddressList');
      // 删除购物车商品信息
      state.cartGoodsList = null;
      sessionStorage.removeItem('cartGoodsList');
    },
    // 保存用户收货地址信息
    saveUserAddressInfo(state, { defaultAddress, userAddressList }) {
      // 保存到vuex
      state.defaultAddress = defaultAddress;
      state.userAddressList = userAddressList;
      // 保存到localStorage
      localStorage.setItem('defaultAddress', JSON.stringify(defaultAddress));
      localStorage.setItem('userAddressList', JSON.stringify(userAddressList));
    },
    // 保存全国城市列表
    saveCityList(state, cityList) {
      state.cityList = cityList;
      localStorage.setItem('cityList', JSON.stringify(cityList));
    },
    // 保存首页轮播图列表
    SaveSwiperList(state, swiperList) {
      state.swiperList = swiperList;
      localStorage.setItem('swiperList', JSON.stringify(swiperList));
    },
    // 保存首页分类及其商品信息
    SaveSortGoodsList(state, sortGoodsList) {
      state.sortGoodsList = sortGoodsList;
      localStorage.setItem('sortGoodsList', JSON.stringify(sortGoodsList));
    },
    // 保存所有商品分类信息
    SaveAllSortList(state, allSortList) {
      state.allSortList = allSortList;
      localStorage.setItem('allSortList', JSON.stringify(allSortList));
    },
    // 保存热门商品列表
    SaveHotGoodsList(state, hotGoodsList) {
      state.hotGoodsList = hotGoodsList;
      localStorage.setItem('hotGoodsList', JSON.stringify(hotGoodsList));
    },
    // 保存用户购物车商品列表
    SaveCartGoodsList(state, cartGoodsList) {
      state.cartGoodsList = cartGoodsList;
      sessionStorage.setItem('cartGoodsList', JSON.stringify(cartGoodsList));
    },
  },
  actions: {
    // 请求购物车商品列表(页面进入时调用、购物车商品变化时调用)
    async getCartGoodsList({ commit }) {
      // 获取购物车信息
      let [cartInfo, err] = await getUserCartInfo();
      if (err) return;
      // console.log(cartInfo.result);

      // 保存购物车商品信息
      let cartGoodsList = cartInfo.result.map(g => {
        let temp = {
          id: g.id,   // 购物车商品ID
          goods_id: g.goods_id,   // 商品ID
          name: g.s_good.name,   // 购物车商品名称
          num: g.num,   // 购物车商品数量
          price: g.s_good.price,   // 购物车商品价格
          sale_price: g.s_good.sale_price,   // 购物车商品优惠价格
          img: g.s_good.s_goods_photos[0].path,   // 购物车商品图片
        };
        return temp;
      });

      // 保存到vuex
      commit('SaveCartGoodsList', cartGoodsList);
    }
  },
  modules: {
  }
});
