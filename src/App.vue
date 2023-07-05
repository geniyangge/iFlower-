<template>
  <div id="app">
    <!-- 通知栏 -->
    <van-notice-bar mode="closeable" left-icon="volume-o" text="仅供测试。" />
    <!-- <transition name="van-fade" mode="out-in"> -->
    <router-view />
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  beforeCreate() {
    // console.log(process.env.NODE_ENV);
    // 生产环境下，将请求升级为https
    if (process.env.NODE_ENV === "production") {
      let meta = document.createElement("meta");
      meta.setAttribute("http-equiv", "Content-Security-Policy");
      meta.setAttribute("content", "upgrade-insecure-requests");
      document.head.appendChild(meta);
    }
  },
};
</script>

<style lang="scss"></style>
