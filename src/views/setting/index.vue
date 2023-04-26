<template>
    <!-- 设置页 -->
    <div id="setting">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="设置" left-arrow @click-left="$router.back()" :border="false" />
        </div>

        <main>
            <van-cell-group inset>
                <van-cell title="个人资料" is-link to="/personalData" />
            </van-cell-group>
            <van-cell-group inset>
                <van-cell title="修改密码" is-link to="/changePassword" />
            </van-cell-group>
            <!-- 退出按钮 -->
            <div class="quitBtn">
                <van-button color="#894e22" size="small" round @click="quit">退出</van-button>
            </div>
        </main>
    </div>
</template>

<script>
// 引入vuex
import { mapMutations } from 'vuex';

export default {
    name: 'Setting',
    methods: {
        ...mapMutations(['removeUserInfo']),
        // 点击退出登录按钮触发事件
        quit() {
            this.$dialog.confirm({
                message: '是否退出登录？',
            })
                .then(() => {
                    // 确定

                    // 删除用户信息
                    this.removeUserInfo();
                    // 注销成功
                    this.$toast({
                        message: '退出成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            // 跳转到首页
                            this.$router.replace('/');
                        },
                    });
                })
                .catch(() => {
                    // 取消
                });
        }
    },
};
</script>

<style lang="scss" scoped>
#setting {
    @include funpage(#E9ECF0);

    // 标题栏
    .title {
        border-bottom: 1px solid #e4e4e4;

        // 标题栏高度
        ::v-deep .van-nav-bar__content {
            height: vw(50);
        }
    }

    main {

        // 单元格组
        .van-cell-group--inset {
            margin: vw(10) vw(10) 0px;
        }

        .quitBtn {
            margin: 0 auto;
            width: fit-content;

            // 按钮
            .van-button {
                margin-top: vw(50);
                width: vw(150);
                height: vw(30);
            }
        }
    }
}
</style>