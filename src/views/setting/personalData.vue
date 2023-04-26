<template>
    <!-- 个人资料页 -->
    <div id="personalData">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="个人资料" left-arrow right-text="保存" @click-left="$router.back()" @click-right="onSubmit"
                :border="false" />
        </div>

        <main>
            <!-- 修改头像 -->
            <div class="personalHead">
                <van-grid :column-num="1">
                    <van-grid-item text="点击修改头像">
                        <template #icon>
                            <div class="personalHeadBox">
                                <van-uploader :after-read="afterUpload"
                                    :upload-icon="formData?.header_img || 'https://img01.yzcdn.cn/vant/cat.jpeg'" />
                            </div>
                        </template>
                    </van-grid-item>
                </van-grid>
            </div>
            <!-- 修改个人信息 -->
            <div class="personalInfo">
                <van-form :show-error="false" ref="personalForm" :show-error-message="false" :validate-first="true">
                    <!-- 用户名 -->
                    <van-field required v-model="formData.name" name="用户名" label="用户名" placeholder="请输入用户名"
                        :rules="[{ required: true, message: '请输入用户名' }]" />
                    <!-- 手机 -->
                    <van-field disabled v-model="formData.phone" name="手机号" label="手机号" placeholder="请输入手机号"
                        :rules="[{ required: true, message: '请输入手机号' }]" />
                    <!-- 性别 -->
                    <van-field name="性别" label="性别">
                        <template #input>
                            <van-radio-group v-model="formData.sex" direction="horizontal">
                                <van-radio :name="1">男</van-radio>
                                <van-radio :name="2">女</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                    <!-- 生日 -->
                    <van-field readonly clickable name="生日" :value="formatBirthday" label="生日" placeholder="点击选择日期"
                        @click="showPicker = true" />
                    <van-popup v-model="showPicker" position="bottom">
                        <van-datetime-picker type="date" :min-date="minDate" :max-date="maxDate" @confirm="onConfirmDate"
                            @cancel="showPicker = false" />
                    </van-popup>
                </van-form>
            </div>
        </main>
    </div>
</template>

<script>
// 引入vuex
import { mapState, mapMutations } from 'vuex';
// 引入日期格式化组件
import moment from 'moment';
// 引入API
import { uploaderAPI } from '@/api/uploader';
import { updateUserInfoAPI } from '@/api/user';

export default {
    name: 'PersonalData',
    data() {
        return {
            // 选择日期
            minDate: new Date(1960, 0, 1),
            maxDate: new Date(),
            // 选择日期弹窗
            showPicker: false,
            // 表单数据
            formData: {
                id: '',    // 用户id
                name: '',   // 用户名
                phone: '',  // 手机号
                sex: '',    // 性别
                birth_date: '', // 生日
                header_img: '', // 头像
            },
        };
    },
    computed: {
        ...mapState(['userInfo']),
        // 出生日期格式化
        formatBirthday() {
            if (!this.formData.birth_date) return '请选择出生日期';
            return moment(this.formData.birth_date).format('YYYY-MM-DD');
        },
    },
    methods: {
        ...mapMutations(['updateUserInfo']),
        // 头像上传成功后的回调函数
        async afterUpload(file) {
            // console.log(file.file);
            // 上传头像
            let [data, err] = await uploaderAPI(file.file);
            if (err) return this.$toast.fail('上传失败');
            // 保存头像在线链接地址
            // console.log(data.result.path);
            this.formData.header_img = data.result.path;
            this.$notify({
                type: 'success',
                message: '上传成功',
                duration: 1500,
            });
        },
        // 日期选择触发(点击确定触发)
        onConfirmDate(date) {
            // 赋值给表单数据(转换为ISO日期格式)
            this.formData.birth_date = date.toISOString();
            this.showPicker = false;
        },
        // 提交表单
        onSubmit() {
            // 表单校验
            this.$refs.personalForm.validate()
                .then(async () => {
                    // 请求更新用户信息
                    let [data, err] = await updateUserInfoAPI(this.formData);
                    if (err?.response?.data?.msg === 'Validation error') {
                        this.$toast.fail('操作失败');
                        this.$notify({
                            type: 'danger',
                            message: '用户名已存在',
                            duration: 2000,
                        });
                    }
                    if (err) return this.$toast.fail('操作失败');
                    // 请求成功
                    // console.log(data);
                    // 更新本地的用户信息
                    this.updateUserInfo(data.result);
                    this.$toast.success('操作成功');
                })
                .catch(err => {
                    console.log('setting/personalData.vue --> onSubmit()', err);
                    // 提示信息
                    this.$notify({
                        type: 'danger',
                        // message: err[0].message,
                        message: '未知错误',
                        duration: 1500,
                    });
                });
        }
    },
    created() {
        // 赋值给表单数据
        this.formData.id = this.userInfo.id;
        this.formData.name = this.userInfo.name;
        this.formData.phone = this.userInfo.phone;
        this.formData.sex = this.userInfo.sex;
        this.formData.birth_date = this.userInfo.birth_date;
        this.formData.header_img = this.userInfo.header_img;
    },
};
</script>

<style lang="scss" scoped>
#personalData {
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

        // 修改头像
        .personalHead {
            border-bottom: 1px solid #f4f5f7;

            .personalHeadBox {
                width: vw(66);
                height: vw(66);
                border-radius: 50%;
                overflow: hidden;

                ::v-deep .van-uploader__upload {
                    margin: 0;

                    // 头像
                    .van-icon {
                        width: 100%;
                        height: 100%;
                        font-size: vw(80);

                        >img {
                            object-fit: cover;
                            width: vw(66);
                        }
                    }
                }
            }

            // 宫格样式
            ::v-deep .van-grid-item__content {
                padding: vw(20) 0px vw(30);

                .van-grid-item__text {
                    margin-top: vw(8);
                }
            }

        }
    }
}
</style>