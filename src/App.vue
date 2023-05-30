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
  data() {
    return {
    };
  },
  computed: {
  },
};
</script>

<style lang="scss"></style>
