<template>
    <!-- 我的订单 -->
    <div id="order">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="我的订单" left-arrow @click-left="$router.back()" :border="false" />
        </div>

        <main>
            <!-- 有订单信息 -->
            <div class="order-container">
                <!-- 导航栏 -->
                <div class="navBar">
                    <van-dropdown-menu>
                        <!-- 根据订单状态 筛选 -->
                        <van-dropdown-item v-model="reqOption.status" :options="filterMode" @change="filterOrder" />
                        <van-dropdown-item v-model="sortModeValue" :options="sortMode" @change="sortOrder" />
                    </van-dropdown-menu>
                </div>

                <!-- 订单列表 -->
                <div class="order-list">
                    <van-list :immediate-check="false" v-model="loadingMore" :finished="isFinished"
                        finished-text="我可是有底线的噢~" @load="loadMore">
                        <!-- 每个订单信息 -->
                        <template v-for="order in orderList">
                            <van-cell-group inset>
                                <!-- 订单信息 -->
                                <van-cell>
                                    <template #title>
                                        <!-- <p class="orderInfo">收货人：{{ order.shops_name }}</p> -->
                                        <p class="orderTime">下单日期：{{ order.createdAt }}</p>
                                    </template>
                                    <template #right-icon>
                                        <p class="orderState">{{ order.status_text }}</p>
                                    </template>
                                </van-cell>
                                <!-- 商品卡片 -->
                                <van-cell>
                                    <template v-for="good in order.goods_info">
                                        <van-card :num="good.num" :price="good.sale_price" :origin-price="good.price"
                                            desc="七天无理由退货" :title="good.goods_name" :thumb="good.s_goods_photos[0].path" />
                                    </template>
                                </van-cell>
                                <!-- 合计 -->
                                <van-cell>
                                    <template #title>
                                        <p class="total">共{{ order.goods_info.length }}件，合计：￥{{ order.total_price }}</p>
                                    </template>
                                    <template #right-icon>
                                        <van-button round size="mini" @click="deleteOrder(order.id)">删除订单</van-button>
                                    </template>
                                </van-cell>
                            </van-cell-group>
                        </template>
                    </van-list>
                </div>
            </div>


            <!-- 无订单信息 -->
            <div class="nothing" v-if="false">
                <div class="nothing-img">
                    <img src="@/assets/images/order/nothing.png" alt="nothing">
                </div>
                <p>暂无内容</p>
            </div>
        </main>

    </div>
</template>

<script>
// 引入api
import { getOrderListAPI, deleteOrderAPI } from '@/api/order.js';
// 引入日期格式化组件
import moment from 'moment';

export default {
    name: "Order",
    data() {
        return {
            sortModeValue: 'a',
            // 订单状态
            filterMode: [
                { text: '全部订单', value: '' },
                { text: '已下单', value: '1' },
                { text: '已支付', value: '2' },
                { text: '已发货', value: '3' },
                // { text: '退货中', value: '4' },
                { text: '退款中', value: '5' },
                { text: '已完成', value: '6' },
                { text: '已取消', value: '7' },
                { text: '已过期', value: '0' },
            ],
            sortMode: [
                { text: '默认排序', value: 'a' },
                { text: '下单时间', value: 'b' },
                { text: '付款金额', value: 'e' },
            ],
            // 请求订单列表配置项
            reqOption: {
                page: '1',  // 当前页数
                limit: '10',    // 每页条数
                status: this.$route.query.filterMode || '', // 订单状态
            },
            // 请求回来的订单列表
            orderList: [],
            // 数据总数
            listTotal: null,
            // 订单列表加载
            loadingMore: false,
        };
    },
    computed: {
        // 判断数据是否已经请求完
        isFinished() {
            return this.listTotal === this.orderList.length;
        },
    },
    methods: {
        // 订单状态码转译
        encodeStatus(status) {
            const mapStatus = {
                '-1': '已删除',
                '0': '已过期',
                '1': '已下单',
                '2': '已支付',
                '3': '已发货',
                '4': '退货中',
                '5': '退款中',
                '6': '已完成',
                '7': '已取消',
            };
            return mapStatus[status];
        },
        // 获取订单列表
        async getOrderList(option, isLoading = false) {
            let [data, err] = await getOrderListAPI(option);
            if (err) return;
            // 保存返回的订单列表信息
            this.listTotal = data.result.count;
            // 过滤处理返回的订单列表信息
            let tempList = data.result.rows.map(o => ({
                id: o.id, // 订单id
                shops_name: o.shops_name, // 收货人
                status: o.status, // 订单状态
                status_text: this.encodeStatus(o.status), // 订单状态文字
                goods_info: JSON.parse(o.goods_info),   // 订单商品信息
                createdAt: moment(o.createdAt).format('YYYY.MM.DD'), // 下单时间
                order_time: o.order_time, // 下单时间（时间戳）
                order_id: o.order_id, // 订单号
                total_price: o.total_price, // 订单总价
            }));
            // 如果是下拉刷新，就拼接在之前的列表中，否则赋为新的列表
            isLoading ? this.orderList.push(...tempList) : this.orderList = tempList;
            // console.log(data);
            // console.log(JSON.parse(data.result.rows[0].goods_info));
        },
        // 订单列表触底触发加载
        async loadMore() {
            this.reqOption.page = String(Number(this.reqOption.page) + 1);
            // 请求订单信息
            await this.getOrderList(this.reqOption, true);
            // list加载结束，可以下一轮加载
            this.loadingMore = false;
        },
        // 筛选订单信息
        async filterOrder(index) {
            // 携带新的筛选条件，重新进入页面
            this.$router.replace({ path: '/order', query: { filterMode: index } });
            this.$router.go(0);
            // 请求订单信息
            // this.reqOption.page = '1';
            // await this.getOrderList(this.reqOption);
        },
        // 删除订单
        async deleteOrder(id) {
            let [data, err] = await deleteOrderAPI(id);
            if (err) return this.$toast.fail('删除失败');
            this.$toast.success('删除成功');
            this.$router.go(0);
        },
        // 对订单信息进行排序
        async sortOrder() {

        },
    },
    async created() {
        // 请求订单列表
        await this.getOrderList(this.reqOption);
    },
};
</script>

<style lang="scss" scoped>
#order {
    @include funpage();

    // 标题栏
    .title {
        border-bottom: 1px solid #e4e4e4;

        // 标题栏高度
        ::v-deep .van-nav-bar__content {
            height: vw(55);
        }
    }

    main {

        // 有订单信息
        .order-container {

            // 导航栏
            .navBar {
                margin-bottom: vw(10);
            }

            // 订单列表
            .order-list {
                padding-bottom: vw(50);

                // 单元格组
                .van-cell-group--inset {
                    margin: 0 vw(10) vw(10);

                    p.orderInfo,
                    p.orderTime {
                        color: #555;
                        font-size: vw(13);
                    }

                    p.orderState {
                        color: #999;
                        font-size: vw(12);
                    }

                    p.total {
                        font-size: vw(14);
                        color: #f00;
                    }
                }

                // 按钮
                .van-button {
                    padding: 10px;
                }
            }
        }

        // 无订单信息
        .nothing {
            height: vw(300);
            background-color: #fff;
            margin-top: vw(10);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            // 图片
            .nothing-img {
                width: vw(315);
                height: vw(210);
                overflow: hidden;

                img {
                    width: 100%;
                }
            }

            // 文字
            p {
                font-size: vw(14);
                font-weight: 400;
                color: #FF734C;
                margin-top: vw(10);
            }
        }
    }

}
</style>