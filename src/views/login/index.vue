<template>
    <div id="loginPage">
        <!-- 顶部 -->
        <header>
            <!-- 标题 -->
            <div class="title">
                <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="" :border="false" />
            </div>
        </header>

        <!-- 内容 -->
        <div class="content">
            <main>
                <!-- logo -->
                <div class="logo">
                    <img src="@/assets/images/login/logo.webp" alt="logo" />
                </div>

                <keep-alive>
                    <router-view />
                </keep-alive>
            </main>

            <!-- 底部 -->
            <header>
                <van-divider>第三方登录</van-divider>
                <!-- 登录方式 -->
                <van-grid :border="false" :column-num="2" direction="horizontal">
                    <van-grid-item>
                        <i class="iconfont icon-QQ" />
                        <p>QQ</p>
                    </van-grid-item>
                    <van-grid-item>
                        <i class="iconfont icon-weixin" />
                        <p>微信</p>
                    </van-grid-item>
                </van-grid>
            </header>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
        };
    },
    mounted() {
        // 标题
        this.title = this.$route.meta.title;
    },
    updated() {
        // 标题
        this.title = this.$route.meta.title;
    }
};
</script>

<style lang="scss" scoped>
// 顶部导航栏
::v-deep .van-nav-bar__content {
    height: vw(50);
}

#loginPage {
    .content {
        padding: vw(15);

        main {

            // logo
            .logo {
                display: flex;
                justify-content: center;
                margin-top: vw(15);

                img {
                    width: vw(138);
                    height: vw(56);
                }
            }
        }

        // 底部
        header {
            padding: 0 vw(25);

            //分隔线
            .van-divider {
                margin: 0;
            }

            // 图标
            i.iconfont {
                font-size: vw(22);
                margin-right: vw(5);
                color: #555;
            }

            p {
                font-size: vw(14);
                color: #555;
            }
        }
    }
}
</style>