import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户登录信息
    userInfo: JSON.parse(localStorage.getItem('userInfo') || null),
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
      localStorage.removeItem('userInfo');
    },
  },
  actions: {
  },
  modules: {
  }
});
