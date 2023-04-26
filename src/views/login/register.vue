<template>
    <div id="register">
        <!-- 注册表单 -->
        <van-form ref="registerForm" validate-first :show-error="false">
            <van-field center required v-model="registerForm.phone" name="手机号" label="手机号" placeholder="请输入手机号"
                :rules="[{ required: true }]" />
            <van-field center required v-model="registerForm.name" name="用户名" label="用户名" placeholder="请输入用户名"
                :rules="[{ required: true }]" />
            <van-field center required v-model="registerForm.password" type="password" name="密码" label="密码"
                placeholder="请输入密码" :rules="[{ required: true }]" />
            <van-field center required v-model="registerForm.againPassword" type="password" name="确认密码" label="确认密码"
                placeholder="请再次输入密码" :rules="[{ required: true }, { validator, message: '两次输入的密码不一致' }]" />
            <div class="loginBtn">
                <van-button round block type="info" native-type="button" @click="register">注册</van-button>
            </div>
            <h3 @click="switchMode">已有账号，立即登录</h3>
        </van-form>
    </div>
</template>

<script>
// 引入API
import { userRegisterAPI } from '@/api/user.js';
// 引入vant组件
import { Notify } from 'vant';
import { Toast } from 'vant';
// 引入md5
import md5 from 'md5';

export default {
    name: 'Register',
    data() {
        return {
            // 表单数据
            registerForm: {
                phone: '',
                name: '',
                password: '',
                againPassword: '',
            },
        };
    },
    computed: {
        md5Password() {
            return md5(this.registerForm.againPassword);
        }
    },
    methods: {
        switchMode() {
            // 跳转到注册界面
            this.$router.replace({ name: 'Login' });
        },
        // 密码校验
        validator(val) {
            return val === this.registerForm.password;
        },
        // 注册用户
        register() {
            // 表单验证
            this.$refs.registerForm.validate().then(async res => {
                // 验证成功

                // 请求配置项
                let option = {
                    phone: this.registerForm.phone,
                    name: this.registerForm.name,
                    password: this.md5Password,
                };
                // 发送请求
                let [data, err] = await userRegisterAPI(option);
                if (err) return;
                // 注册成功
                Toast.success(data.msg);
                // 跳转到登录页面
                this.$router.replace('/login');
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
#register {
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