import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 载入样式重置文件
import '@/assets/styles/scss/reset.scss';
// 按需引入vant组件
import '@/utils/vant/index.js';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
