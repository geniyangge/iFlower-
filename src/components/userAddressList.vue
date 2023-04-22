<template>
    <!-- 封装用户收货地址列表 组件 -->

    <!-- 这里使用到插槽做封装 #slot -->
    <!-- 向父组件传递两个值 -->
    <!-- row 选中元素 -->
    <!-- id 选中元素的ID -->

    <div id="userAddressList">
        <!-- 默认地址 -->
        <template v-if="defaultAddress" v-cloak>
            <van-swipe-cell>
                <van-cell clickable style="margin-top: 1.3333vw;"
                    @click="fromClearing ? saveAddressInfo(defaultAddress.id) : toEditAddress({ item: defaultAddress, isDefault: true })">
                    <!-- 地址卡片 -->
                    <div class="addressCard" :class="{ active: fromClearing && chosedAddressId === defaultAddress.id }">
                        <!-- 左侧信息 -->
                        <div class="info">
                            <h2>
                                <div class="text">
                                    <span class="name">{{ defaultAddress.name }}</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="phone">{{ defaultAddress.phone }}</span>
                                    &nbsp;&nbsp;
                                </div>
                                <span class="default">默认</span>
                            </h2>
                            <p>
                                <span class="area">{{ defaultAddress.area_name }}</span>
                                &nbsp;
                                <span class="desc">{{ defaultAddress.desc }}</span>
                            </p>
                        </div>
                        <!-- 右侧图标 -->
                        <div class="icon" @click.stop="toEditAddress({ item: defaultAddress, isDefault: true })">
                            <i class="iconfont icon-bianji"></i>
                        </div>
                    </div>
                </van-cell>
                <template #right>
                    <!-- 这里使用插槽做封装 向父组件传递两个值 -->
                    <!-- row 选中元素 -->
                    <!-- id 选中元素的ID -->
                    <slot name="slot" :row="defaultAddress" :id="defaultAddress.id"></slot>
                </template>
            </van-swipe-cell>
        </template>


        <!-- 收货地址列表 -->
        <template v-for="addressInfo in userAddressList" v-cloak>
            <van-swipe-cell>
                <van-cell clickable style="margin-top: 1.3333vw;"
                    @click="fromClearing ? saveAddressInfo(addressInfo.id) : toEditAddress({ item: addressInfo })">
                    <!-- 地址卡片 -->
                    <div class="addressCard" :class="{ active: fromClearing && chosedAddressId === addressInfo.id }">
                        <!-- 左侧信息 -->
                        <div class="info">
                            <h2>
                                <div class="text">
                                    <span class="name">{{ addressInfo.name }}</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="phone">{{ addressInfo.phone }}</span>
                                </div>
                            </h2>
                            <p>
                                <span class="area">{{ addressInfo.area_name }}</span>
                                &nbsp;
                                <span class="desc">{{ addressInfo.desc }}</span>
                            </p>
                        </div>
                        <!-- 右侧图标 -->
                        <div class="icon" @click.stop="toEditAddress({ item: addressInfo })">
                            <i class="iconfont icon-bianji"></i>
                        </div>
                    </div>
                </van-cell>
                <template #right>
                    <!-- 这里使用插槽做封装 -->
                    <slot name="slot" :row="addressInfo" :id="addressInfo.id"></slot>
                </template>
            </van-swipe-cell>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 选中地址id(默认选中 默认地址)
            chosedAddressId: this.defaultAddress.id,
        };
    },
    props: {
        // 用户收货地址列表
        userAddressList: {
            type: Array,
            default: () => { },
        },
        // 默认收货地址
        defaultAddress: {
            type: Object,
            default: () => { },
        },
        // 判断是否从订单结算页跳转过来的
        fromClearing: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        // 跳转到地址编辑页
        toEditAddress(params) {
            this.$router.push({ name: 'EditAddress', params });
        },
        // 保存选中地址信息
        saveAddressInfo(id) {
            this.chosedAddressId = id;
            // 通知父组件 选中地址的id
            this.$emit('chosedAddressId', this.chosedAddressId);
        },
    },
    created() {
        // 通知父组件 选中地址的id
        this.$emit('chosedAddressId', this.chosedAddressId);
    },
};
</script>

<style lang="scss" scoped>
#userAddressList {
    [v-cloak] {
        display: none;
    }

    // 隐藏式删除按钮
    ::v-deep .delete-button {
        height: 100%;
    }

    // 单元格内边距
    .van-cell {
        padding: 0;
    }

    // 地址卡片
    .addressCard {
        // background-color: #fff;
        padding: vw(15);
        padding-right: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.active {
            background-color: #eee;
        }

        // 左侧信息
        .info {
            max-width: vw(300);

            >h2 {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: vw(16);
                font-weight: 700;
                line-height: vw(20);
                color: #555;
                margin-bottom: vw(10);

                // 用户
                .text {
                    max-width: vw(260);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                // “默认”
                .default {
                    text-align: center;
                    vertical-align: middle;
                    font-size: vw(12);
                    font-weight: 400;
                    border-radius: 999px;
                    color: #fff;
                    background-color: #ee0a24;
                    padding: 0 vw(5);
                    line-height: vw(20);
                }
            }

            >p {
                font-size: vw(14);
                font-weight: 400;
                line-height: vw(20);
                color: #555;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        // 右侧图标
        .icon {
            width: vw(54);
            display: flex;
            justify-content: center;
            align-items: center;

            >i {
                font-size: vw(22);
            }
        }
    }
}
</style>