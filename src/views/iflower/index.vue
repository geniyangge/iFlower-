<template>
    <div id="iflower">
        <!-- 顶部导航栏 -->
        <!-- <header></header> -->

        <!-- 内容 -->
        <main>
            <!-- <transition name="van-fade" mode="out-in"> -->
            <router-view />
            <!-- </transition> -->
        </main>

        <!-- 底部 -->
        <footer>
            <!-- 底部导航栏 -->
            <template v-if="tabbarShow">
                <van-tabbar v-model="active" route>
                    <van-tabbar-item icon="wap-home-o" :to="{ name: 'Home' }">首页</van-tabbar-item>
                    <van-tabbar-item icon="apps-o" :to="{ name: 'Sort' }">分类</van-tabbar-item>
                    <van-tabbar-item icon="shopping-cart-o" :to="{ name: 'Cart' }"
                        :badge="userInfo?cartGoodsList.length:null">购物车</van-tabbar-item>
                    <van-tabbar-item icon="user-o" :to="{ name: 'Mine' }">我的</van-tabbar-item>
                </van-tabbar>
            </template>
        </footer>
    </div>
</template>

<script>
// 引入vuex
import { mapState } from 'vuex';

export default {
    name: "Iflower",
    data() {
        return {
            active: 0,
        };
    },
    computed: {
        ...mapState(['tabbarShow', 'cartGoodsList', 'userInfo']),
    }
};
</script>

<style lang="scss" scoped>
#iflower {
    main {
        // 底部留白，不让底部tabbar遮挡
        padding-bottom: vw(50);
    }
}
</style>