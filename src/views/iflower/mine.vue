<template>
    <div id="mine">
        <!-- 顶部 -->
        <header>
            <van-nav-bar title="个人中心" @click-left="" @click-right="" />
        </header>

        <!-- 内容 -->
        <main>
            <!-- 登录/注册 -->
            <div class="welcome">
                <h1>Hi,欢迎来到订花乐!</h1>
                <van-button type="default" size="small" @click="login" round>登录/注册</van-button>
            </div>

            <!-- 订单 -->
            <div class="order">
                <van-cell-group inset>
                    <van-cell title="我的订单" value="全部订单" is-link />
                    <van-grid :border="false">
                        <van-grid-item icon="todo-list-o" text="待付款" />
                        <van-grid-item icon="logistics" text="派送中" />
                        <van-grid-item icon="smile-comment-o" text="待评价" />
                        <van-grid-item icon="completed" text="已完成" />
                    </van-grid>
                </van-cell-group>
            </div>

            <!-- 其他 -->
            <div class="other">
                <van-cell-group inset>
                    <van-cell icon="balance-pay" title="优惠券" is-link />
                    <van-cell icon="guide-o" title="收货地址" is-link />
                    <van-cell icon="setting-o" title="设置" is-link />
                </van-cell-group>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'Mine',
    methods: {
        login() {
            this.$router.push({ name: 'Login' });
        }
    },
};
</script>

<style lang="scss" scoped>
// 顶部导航栏
::v-deep .van-nav-bar__content {
    height: vw(42);
}

// 圆角卡片
.van-cell-group--inset {
    margin: 0px vw(5);
}

#mine {
    header {}

    main {
        width: 100%;
        height: 100vh;
        background: #f7f7f7 url('@/assets/images/mine/mine_bgi.webp') no-repeat center top/100vw auto;

        // 登录/注册
        .welcome {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: vw(25) 0px;

            h1 {
                font-size: vw(14);
                font-weight: 400;
                color: #fff;
                margin-bottom: vw(16);
            }

            .van-button {
                width: vw(120);
                font-size: vw(14);
            }

        }

        // 订单
        .order {
            margin-bottom: vw(5);
        }

        // 其他
        .other {}
    }
}
</style>