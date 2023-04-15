<template>
  <div id="app">
    <transition name="van-fade" mode="out-in">
      <router-view />
    </transition>

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
