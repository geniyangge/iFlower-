<template>
    <!-- 收货地址 -->
    <div id="address">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="收货地址" left-arrow @click-left="$router.back()" :border="false" />
        </div>

        <!-- 用户收货地址列表 -->
        <main>
            <!-- 使用自定义组件 展示用户收货地址列表 -->
            <UserAddressList :userAddressList="userAddressList" :defaultAddress="defaultAddress">
                <template #slot="{ row, id }">
                    <van-button square text="删除" type="danger" class="delete-button" @click="deleteItem(row, id)" />
                </template>
            </UserAddressList>
        </main>

        <!-- 页面底部 新增收货地址 -->
        <div class="addAddress">
            <van-button round size="large" @click="$router.push({ name: 'NewAddress' })">+新建地址</van-button>
        </div>
    </div>
</template>

<script>
// 引入用户收货地址组件
import UserAddressList from '@/components/userAddressList';
// 引入地址模块API
import { getUserAddressAPI, getDefaultAddressAPI, deleteUserAddresssAPI } from '@/api/address.js';
// 引入vant组件
import { Dialog, Toast } from 'vant';

export default {
    name: 'Address',
    components: {
        UserAddressList,
    },
    data() {
        return {
            // 用户收货地址列表(除去默认收货地址)
            userAddressList: [],
            // 默认收货地址
            defaultAddress: {},
        };
    },
    async created() {
        // 获取用户收货地址列表 和 默认收货地址
        this.getUserAddressList();
    },
    methods: {
        //  获取用户收货地址列表 和 默认收货地址
        async getUserAddressList() {
            let [data1, err1] = await getDefaultAddressAPI();
            let [data2, err2] = await getUserAddressAPI();
            if (err1 || err2) return;
            // console.log(data1, data2);
            this.defaultAddress = data1.result;
            this.userAddressList = data2.result.filter(address => address.default_set !== '1');
            // console.log(this.defaultAddress);
        },
        // 删除用户收货地址信息
        async deleteUserAddresss(id) {
            let [data, err] = await deleteUserAddresssAPI(id);
            if (err) return;
            Toast.success(data.msg);
            // console.log(data);
        },
        // 删除收货地址
        deleteItem(row, id) {
            // 触发弹窗，防误点
            Dialog.confirm({
                message: '确定删除这条收货地址？',
            })
                .then(async () => {
                    // 确定
                    await this.deleteUserAddresss(id);
                    await this.getUserAddressList();
                })
                .catch(() => {
                    // 取消
                });
        }
    }
};
</script>

<style lang="scss" scoped>
#address {
    @include funpage();
    padding-bottom: vw(100);

    .title {

        // 标题栏高度
        ::v-deep .van-nav-bar__content {
            height: vw(41);
        }
    }

    main {}

    // 新增收货地址
    .addAddress {
        position: fixed;
        bottom: vw(40);
        width: 100vw;
        padding: 0 vw(38);
        box-sizing: border-box;

        // 按钮高度、字号
        .van-button--large {
            background-color: $theme-color;
            border: $theme-color;
            color: #fff;

            height: vw(42);
            font-size: vw(16);
        }
    }

}
</style>