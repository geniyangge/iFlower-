<template>
    <!-- 我的订单 -->
    <div id="order">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="我的订单" left-arrow @click-left="$router.back()" :border="false" />
        </div>

        <main>
            <!-- 无订单信息 -->
            <div class="nothing">
                <div class="nothing-img">
                    <img src="@/assets/images/order/nothing.png" alt="nothing">
                </div>
                <p>暂无内容</p>
            </div>
        </main>

    </div>
</template>

<script>
export default {
    name: "Order",
};
</script>

<style lang="scss" scoped>
#order {
    min-height: 100vh;
    background-color: $bgc;

    .title {

        // 标题栏高度
        ::v-deep .van-nav-bar__content {
            height: vw(55);
        }
    }

    main {

        // 无订单信息
        .nothing {
            height: vw(300);
            background-color: #fff;
            margin-top: vw(20);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            // 图片
            .nothing-img {
                width: vw(315);
                height: vw(210);
                overflow: hidden;

                img {
                    width: 100%;
                }
            }

            // 文字
            p {
                font-size: vw(14);
                font-weight: 400;
                color: #FF734C;
                margin-top: vw(10);
            }
        }
    }

}
</style>