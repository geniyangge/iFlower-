<template>
    <!-- 收货地址 -->
    <div id="address">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar :title="fromClearing ? '选择收货地址' : '收货地址'" left-arrow
                :right-text="fromClearing && Object.keys(defaultAddress).length ? '确定' : null" @click-left="$router.back()"
                @click-right="commitInfo" :border="false" />
        </div>

        <!-- 用户收货地址列表 -->
        <main>
            <!-- 使用自定义组件 展示用户收货地址列表 -->
            <UserAddressList :userAddressList="userAddressList" :defaultAddress="defaultAddress"
                @chosedAddressId="getChosedAddressId" :fromClearing="fromClearing">
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
import { getUserAddressList, deleteUserAddresssAPI } from '@/api/address.js';
// 引入vant组件
import { Dialog, Toast } from 'vant';
// 引入vuex
import { mapState } from 'vuex';

export default {
    name: 'Address',
    components: {
        UserAddressList,
    },
    data() {
        return {
            // query上的商品信息(从订单结算页传递过来)
            goodsInfo: JSON.parse(this.$route.query.goodsInfo || null),
            // 选中的商品收货地址id
            chosedAddressId: 0,
        };
    },
    computed: {
        ...mapState(['userAddressList', 'defaultAddress']),
        // 判断是否从订单结算页跳转过来的
        fromClearing() {
            return Boolean(this.goodsInfo);
        }
    },
    methods: {
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
                    // 重新获取地址列表
                    await getUserAddressList();
                })
                .catch(() => {
                    // 取消
                });
        },
        // 点击标题栏的确定，跳转回订单结算页
        commitInfo() {
            // query增加 选中的地址id信息 ，返回到上一个页面中
            // let query = { goodsInfo: JSON.stringify(this.goodsInfo), addressId: this.chosedAddressId };
            // this.$router.replace({ path: '/clearing', query });

            // 保存选中的地址id 到sessionStorage中
            sessionStorage.setItem('addressId', this.chosedAddressId);
            // 返回商品订单页
            this.$router.back();
        },
        // 获取选中的用户收货地址id
        getChosedAddressId(id) {
            // 该函数由子组件通知触发
            // 保存 选中的商品收货地址id 到当前vue实例上
            this.chosedAddressId = id;
        },
    },
    async created() {
        // 如果没有收货地址数据，请求一次
        if (this.userAddressList === null || this.defaultAddress === null) {
            await getUserAddressList();
        }
    },
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