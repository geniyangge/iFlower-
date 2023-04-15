import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户登录信息
    userInfo: JSON.parse(localStorage.getItem('userInfo') || null),
    // 用户收货地址信息(除默认地址)
    userAddressList: JSON.parse(localStorage.getItem('userAddressList') || null),
    // 用户默认收货地址
    defaultAddress: JSON.parse(localStorage.getItem('defaultAddress') || null),
    // 全国城市列表
    cityList: JSON.parse(localStorage.getItem('cityList') || null),
  },
  getters: {
  },
  mutations: {
    // 添加用户登录信息
    addUserInfo(state, userInfo) {
      // 保存用户信息到vuex
      state.userInfo = userInfo;
      // 保存用户信息到localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = null;
      state.defaultAddress = null;
      state.userAddressList = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('defaultAddress');
      localStorage.removeItem('userAddressList');
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
  },
  actions: {
  },
  modules: {
  }
});
