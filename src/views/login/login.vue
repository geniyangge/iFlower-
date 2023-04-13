<template>
    <div id="login">
        <van-form ref="loginForm" validate-first>
            <van-field v-model="loginForm.phone" name="账号" label="账号" placeholder="请输入手机号" :rules="[{ required: true }]" />
            <van-field v-model="loginForm.password" type="password" name="密码" label="密码" placeholder="请输入密码"
                :rules="[{ required: true }]" />
            <div class="loginBtn">
                <van-button round block type="info" native-type="button" @click="login">登录</van-button>
            </div>
            <h3 @click="switchMode">用户注册</h3>
        </van-form>
    </div>
</template>

<script>
// 引入API
import { userLoginAPI } from '@/api/user';
import { Notify } from 'vant';
import { Toast } from 'vant';

export default {
    name: 'Login',
    data() {
        return {
            // 表单数据
            loginForm: {
                phone: '13412341234',
                password: '123456',
            },
        };
    },
    methods: {
        switchMode() {
            // 跳转到注册界面
            this.$router.replace({ name: 'Register' });
        },
        // 登录账号
        login() {
            // 表单验证
            this.$refs.loginForm.validate().then(async res => {
                // 验证成功,发送请求
                let [data, err] = await userLoginAPI(this.loginForm);
                if (err) return;
                Toast.success('登录成功');
                // 跳转至首页
                this.$router.replace({ name: 'Home' });
            }).catch(err => {
                // 验证失败
                let msg = err[0].message || '请输入' + err[0].name;
                Notify({
                    message: msg,
                    duration: 2000,
                    type: 'warning',
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
#login {
    padding: vw(20) 0;

    .loginBtn {
        margin: vw(30) 0;
    }

    // 按钮内字号
    .van-button {
        font-size: vw(18);
    }

    // 切换登录方式
    h3 {
        text-align: center;
        font-size: vw(18);
        color: #555;
        margin: vw(30) 0 vw(10) 0;
    }
}
</style>