<template>
    <div id="details">
        <!-- 顶部title -->
        <header>
            <van-nav-bar :border="false" @click-left="onClickLeft">
                <template #left>
                    <van-icon name="arrow-left" size="5.8667vw" color="#555" />
                </template>
                <template #title>
                    <img class="logo" src="@/assets/images/logo.webp" alt="logo" />
                </template>
            </van-nav-bar>
        </header>

        <!-- 主体 -->
        <main>
            <!-- 商品轮播图 -->
            <div class="swiper">
                
            </div>
            <!-- 商品描述 -->
            <div class="desc">

            </div>
            <!-- 数量 -->
            <div class="number">

            </div>
        </main>

        <!-- 底部 商品导航 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
            <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
            <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" />
            <van-goods-action-button type="warning" text="加入购物车" />
            <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
        </van-goods-action>
    </div>
</template>

<script>
export default {
    name: 'Details',
};
</script>

<style lang="scss" scoped>
#details {
    @include funpage(#e9ecf0);
    display: flex;
    flex-direction: column;
    padding-bottom: vw(50);

    // 底部商品导航高度
    .van-goods-action {
        height: vw(50);
    }

    // 标题栏
    header {
        flex-shrink: 0;

        // 顶部标题栏高度
        ::v-deep .van-nav-bar__content {
            height: vw(55);
        }

        i.iconfont {
            font-size: vw(22);
            color: #000;
        }

        // logo尺寸
        img.logo {
            width: vw(75);
            height: vw(30);
            object-fit: cover;
        }

    }

    // 主体
    main {
        flex: 1;
        background-color: #fff;
    }
}
</style>