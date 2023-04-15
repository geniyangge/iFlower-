<template>
    <!-- 这里使用到插槽做封装 #slot -->
    <!-- 向父组件传递两个值 -->
    <!-- row 选中元素 -->
    <!-- id 选中元素的ID -->

    <!-- 用户收货地址列表 -->
    <div id="userAddressList">
        <!-- 默认地址 -->
        <template v-if="defaultAddress" v-cloak>
            <van-swipe-cell>
                <van-cell clickable style="margin-top: 1.3333vw;">
                    <!-- 地址卡片 -->
                    <div class="addressCard">
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
                        <div class="icon">
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
                <van-cell clickable style="margin-top: 1.3333vw;">
                    <!-- 地址卡片 -->
                    <div class="addressCard">
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
                        <div class="icon">
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
        }
    },
    methods: {
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
        display: flex;
        justify-content: space-between;
        align-items: center;

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
            >i {
                font-size: vw(22);
            }
        }
    }
}
</style>