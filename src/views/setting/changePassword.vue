<template>
    <!-- 修改密码页 -->
    <div id="changePassword">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="修改密码" left-arrow @click-left="$router.back()" :border="false" />
        </div>

        <main>
            <van-form @submit="onSubmit" validate-first :show-error="false" show-error-message>
                <!-- 旧密码 -->
                <van-field required v-model="passwordFormData.oldPassword" type="password" name="旧密码" label="旧密码"
                    placeholder="请输入旧密码" :rules="[{ required: true, message: '请输入旧密码' }]" />
                <!-- 新密码 -->
                <van-field required v-model="passwordFormData.newPassword" type="password" name="新密码" label="新密码"
                    placeholder="请设置新密码" :rules="[{ required: true, message: '请设置新密码' }]" />
                <!-- 再次输入新密码 -->
                <van-field required v-model="passwordFormData.confirmPassword" type="password" name="确认密码" label="确认密码"
                    placeholder="请再次输入新密码"
                    :rules="[{ required: true, message: '请输入确认密码' }, { validator: validatePassword, message: '两次输入的密码不一致' }]" />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </main>
    </div>
</template>

<script>
import { duration } from 'moment';

export default {
    name: 'ChangePassword',
    data() {
        return {
            passwordFormData: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            }
        };
    },
    methods: {
        // 输入确认密码校验
        validatePassword() {
            // 判断两次输入的密码是否一致
            return this.passwordFormData.newPassword === this.passwordFormData.confirmPassword;
        },
        // 提交表单
        onSubmit() {
            if (this.passwordFormData.oldPassword === this.passwordFormData.newPassword) {
                // 新密码与旧密码一致，提示后退出
                this.$notify({
                    type: 'danger',
                    message: '新密码不能与旧密码相同',
                    duration: 2000,
                });
                return;
            }
            this.$notify({
                type: 'warning',
                message: '功能还在开发中...',
                duration: 2000,
            });
        }
    },
};
</script>

<style lang="scss" scoped>
#changePassword {
    @include funpage(#E9ECF0);

    // 标题栏
    .title {
        border-bottom: 1px solid #e4e4e4;

        // 标题栏高度
        ::v-deep .van-nav-bar__content {
            height: vw(50);
        }
    }
}
</style>