<template>
    <!-- 收货地址 -->
    <div id="address">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="收货地址" left-arrow @click-left="$router.back()" :border="false" />
        </div>

        <main>

        </main>

        <!-- 新增收货地址 -->
        <div class="addAddress">
            <van-button round size="large" @click="$router.push({ name: 'NewAddress' })">+新建地址</van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Address'
};
</script>

<style lang="scss" scoped>
#address {
    @include funpage();
    padding-bottom: vw(100);

    .title {

        // 标题栏高度
        ::v-deep .van-nav-bar__content {
            height: vw(41);
        }
    }

    main {}

    // 新增收货地址
    .addAddress {
        position: fixed;
        bottom: vw(40);
        width: 100vw;
        padding: 0 vw(38);
        box-sizing: border-box;

        // 按钮高度、字号
        .van-button--large {
            background-color: $theme-color;
            border: $theme-color;
            color: #fff;

            height: vw(42);
            font-size: vw(16);
        }
    }

}
</style>