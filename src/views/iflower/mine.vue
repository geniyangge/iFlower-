<template>
    <div id="mine">
        <!-- 顶部 -->
        <header>
            <van-nav-bar title="个人中心" @click-left="$router.back()">
                <template #left>
                    <van-icon name="arrow-left" size="5.8667vw" color="#555" />
                </template>
            </van-nav-bar>
        </header>

        <!-- 内容 -->
        <main>
            <!-- 用户简要信息 -->
            <div class="user" v-if="userInfo">
                <div class="userHead">
                    <!-- 头像 -->
                    <div class="userHeadBox">
                        <van-image round width="17vw" height="17vw"
                            :src="userInfo.header_img ? userInfo.header_img : 'https://img01.yzcdn.cn/vant/cat.jpeg'" />
                    </div>
                    <p>{{ userInfo.name }}</p>
                </div>
                <h3 @click="logout">注销</h3>
            </div>
            <!-- 登录/注册 -->
            <div class="welcome" v-else>
                <h1>Hi,欢迎来到订花乐!</h1>
                <van-button type="default" size="small" @click="login" round>登录/注册</van-button>
            </div>

            <!-- 订单 -->
            <div class="order">
                <van-cell-group inset>
                    <van-cell title="我的订单" value="全部订单" is-link to="/order" />
                    <van-grid :border="false" clickable>
                        <van-grid-item icon="todo-list-o" text="待付款" to="/order?filterMode=1" />
                        <van-grid-item icon="logistics" text="已发货" to="/order?filterMode=3" />
                        <van-grid-item icon="smile-comment-o" text="退款中" to="/order?filterMode=5" />
                        <van-grid-item icon="completed" text="已完成" to="/order?filterMode=6" />
                    </van-grid>
                </van-cell-group>
            </div>

            <!-- 其他 -->
            <div class="other">
                <van-cell-group inset>
                    <van-cell icon="balance-pay" title="优惠券" is-link />
                    <van-cell icon="guide-o" title="收货地址" is-link to="/address" />
                    <van-cell icon="setting-o" title="设置" is-link to="/setting" />
                </van-cell-group>
            </div>
        </main>
    </div>
</template>

<script>
// 引入vuex
import { mapMutations } from 'vuex';
// 引入vant组件
import { Toast } from 'vant';

export default {
    name: 'Mine',
    data() {
        return {
            userInfo: JSON.parse(localStorage.getItem('userInfo') || null),
        };
    },
    methods: {
        ...mapMutations(['removeUserInfo']),
        // 点击登录，跳转到登录页
        login() {
            this.$router.push({ name: 'Login' });
        },
        // 点击注销，注销登录
        logout() {
            // 删除用户信息
            this.removeUserInfo();
            // 注销成功
            Toast({
                message: '注销成功',
                type: 'success',
                duration: 500,
                onClose: () => {
                    // 重新进入当前路由
                    this.$router.go(0);
                },
            });
        },
    },
    mounted() {
        // console.log(this.userInfo);
    }
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
    @include funpage();

    header {}

    main {
        width: 100%;
        background: url('@/assets/images/mine/mine_bgi.webp') no-repeat center top/100vw auto;


        // 用户简要信息
        .user {
            padding: vw(25) 0;

            // 头像
            .userHead {
                display: flex;
                justify-content: center;
                align-items: center;

                .userHeadBox {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: vw(68);
                    width: vw(68);
                    border-radius: 50%;
                    background-color: rgba(#fff, 0.4);
                }

                p {
                    font-size: vw(14);
                    color: #fff;
                    margin-left: vw(14);
                }
            }

            // 注销
            h3 {
                font-size: vw(14);
                color: #fff;
                text-align: center;
                margin-top: vw(4);
            }
        }

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