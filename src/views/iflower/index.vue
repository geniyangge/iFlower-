<template>
    <div id="iflower">
        <!-- 顶部导航栏 -->
        <!-- <header></header> -->

        <!-- 内容 -->
        <main>
            <!-- <transition name="van-fade" mode="out-in"> -->
            <keep-alive :include="['Home', 'Sort']">
                <router-view />
            </keep-alive>

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
                        :badge="userInfo === null ? null : cartGoodsList.length">购物车</van-tabbar-item>
                    <van-tabbar-item icon="user-o" :to="{ name: 'Mine' }">我的</van-tabbar-item>
                </van-tabbar>
            </template>
        </footer>
    </div>
</template>

<script>
// 引入vuex
import { mapState, mapActions } from 'vuex';

export default {
    name: "Iflower",
    data() {
        return {
            active: 0,
        };
    },
    computed: {
        ...mapState(['tabbarShow', 'cartGoodsList', 'userInfo']),
    },
    methods: {
        ...mapActions(['getCartGoodsList']),
    },
    async created() {
        // 获取购物车商品列表
        if (this.userInfo && sessionStorage.getItem('cartGoodsList') === null) {
            // 如果数据不存在，请求一次
            await this.getCartGoodsList();
        }
    },
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