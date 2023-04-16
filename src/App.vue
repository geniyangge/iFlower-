<template>
  <div id="app">
    <!-- 通知栏 -->
    <van-notice-bar mode="closeable" left-icon="volume-o" text="本站仅供个人学习使用，并无任何商业用途。" />
    <!-- <transition name="van-fade" mode="out-in"> -->
    <router-view />
    <!-- </transition> -->

  </div>
</template>

<script>

export default {
  data() {
    return {

    };
  },
};
</script>

<style lang="scss"></style>
