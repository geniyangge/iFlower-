<template>
    <div id="login">
        <!-- 登录表单 -->
        <van-form ref="loginForm" validate-first :show-error="false">
            <van-field center required v-model="loginForm.phone" name="账号" label="账号" placeholder="请输入手机号"
                :rules="[{ required: true }]" />
            <van-field center required v-model="loginForm.password" type="password" name="密码" label="密码" placeholder="请输入密码"
                :rules="[{ required: true }]" />
            <!-- 验证码 -->
            <van-field center v-model="loginForm.verifyCode" name="验证码" label="验证码" placeholder="请输入验证码"
                :rules="[{ required: true }, { validator, message: '验证码错误' }]">
                <template #button>
                    <div v-html="verify.code" @click="reqVerifyCode"></div>
                </template>
            </van-field>
            <div class="loginBtn">
                <van-button round block type="info" native-type="button" @click="login">登录</van-button>
            </div>
            <h3 @click="switchMode">没有账号？前往注册</h3>
        </van-form>
    </div>
</template>

<script>
// 引入API
import { userLoginAPI } from '@/api/user';
import { getVerifyCodeAPI } from '@/api/veriCode';
import { getUserAddressList } from '@/api/address';
import { getCityListAPI } from '@/api/city';
import { saveCartGoodsList } from '@/api/cart';
// 引入vant组件
import { Notify } from 'vant';
import { Toast } from 'vant';
// 引入vuex
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            // 表单数据
            loginForm: {
                phone: '13412341234',
                password: '123456',
                verifyCode: '',
            },
            // 请求获得的验证码
            verify: {
                text: '',
                code: '',
            },
        };
    },
    computed: {
        ...mapState(['cityList']),
    },
    methods: {
        ...mapMutations(['addUserInfo', 'saveCityList']),
        // 请求验证码
        async reqVerifyCode() {
            let [data, err] = await getVerifyCodeAPI();
            if (err) return;
            this.verify.text = data.text;
            this.verify.code = data.data;
        },
        // 表单校验规则
        validator() {
            return this.verify.text.toLowerCase() === this.loginForm.verifyCode.toLocaleLowerCase();
        },
        // 去注册
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
                // 登录成功
                Toast.success('登录成功');
                // 保存用户信息到vuex和localStorage
                await this.addUserInfo(data.result);
                // 请求用户收货地址信息
                await getUserAddressList();
                // 请求用户购物车商品列表
                await saveCartGoodsList();
                // 跳转
                let toPath = this.$route.query.toPath;
                this.$router.replace(toPath ? decodeURI(toPath) : '/');
                // 获取全国城市列表
                this.getCityList();
            }).catch(err => {
                // 验证失败
                let msg = err[0].message || '请输入' + err[0].name;
                if (msg === '验证码错误') {
                    // 请求一个新的验证码
                    this.reqVerifyCode();
                    // 清空验证码输入框
                    this.loginForm.verifyCode = '';
                }
                // 提示错误信息
                Notify({
                    message: msg,
                    duration: 2000,
                    type: 'warning',
                });
            });
        },
        // 获取全国城市信息
        async getCityList() {
            // 如果cityList已存在，则跳出
            if (this.cityList) return;
            // 不存在，发起请求
            let [data, err] = await getCityListAPI();
            if (err) return;
            // 保存cityList
            this.saveCityList(data.result);
        },
    },
    async mounted() {
        // 获取验证码
        this.reqVerifyCode();
    },
};
</script>

<style lang="scss" scoped>
#login {
    padding: vw(20) 0;

    // 登录按钮
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