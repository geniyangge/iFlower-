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

                <!-- loading -->
                <div class="loading" v-if="loading">
                    <van-loading type="spinner" color="#1989fa" />
                </div>

                <!-- 订单列表 只有订单存在才显示 -->
                <div class="order-list" v-if="renderOrderList.length && !loading">
                    <van-list :immediate-check="false" v-model="loadingMore" :finished="isFinished"
                        finished-text="我可是有底线的噢~" @load="loadMore">
                        <!-- 每个订单信息 -->
                        <template v-for="order in renderOrderList">
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
                                <van-cell @click="toOrderDetails(order.id)" clickable>
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
                                        <!-- 去支付 -->
                                        <van-button round size="mini" @click.stop="payOrder(order.order_id)"
                                            v-if="order.status === '1'">去支付</van-button>
                                        <!-- 删除订单 -->
                                        <van-button round size="mini" @click.stop="deleteOrder(order.id)">删除订单</van-button>
                                    </template>
                                </van-cell>
                            </van-cell-group>
                        </template>
                    </van-list>
                </div>
            </div>

            <!-- 无订单信息 未登录或无订单就显示 -->
            <div class="nothing" v-if="renderOrderList.length === 0 && !loading">
                <div class="nothing-img">
                    <img src="@/assets/images/order/nothing.png" alt="nothing">
                </div>
                <p>暂无内容</p>
            </div>
        </main>

        <!-- 弹出层 支付二维码 -->
        <van-popup v-model="isPopup" closeable round position="bottom" :style="{ height: '60%' }"
            @click-close-icon="closePopup" @click-overlay="closePopup">
            <div class="qrcode">
                <h3>扫码付款</h3>
                <!-- 二维码 -->
                <div class="imgBox">
                    <img :src="paymentURL" alt="微信支付二维码">
                    <p>请使用微信扫码支付!</p>
                </div>
            </div>
        </van-popup>

    </div>
</template>

<script>
// 引入api
import { getOrderListAPI, deleteOrderAPI } from '@/api/order.js';
import { createPaymentAPI, queryPaymentAPI } from '@/api/payment.js';
// 引入日期格式化组件
import moment from 'moment';
// 引入vuex
import { mapState } from 'vuex';
// 引入二维码生成模块
import QRCode from 'qrcode';

export default {
    name: "Order",
    data() {
        return {
            // 是否显示loading
            loading: true,
            // 支付二维码弹出层是否显示
            isPopup: false,
            // 支付二维码链接
            paymentURL: '',
            // 支付轮询定时器编号
            timerId: null,
            // 排序模式值
            sortModeValue: 'default',
            // 订单状态
            filterMode: [
                { text: '全部订单', value: '' },
                { text: '待付款', value: '1' },
                { text: '已支付', value: '2' },
                { text: '已发货', value: '3' },
                // { text: '退货中', value: '4' },
                { text: '退款中', value: '5' },
                { text: '已完成', value: '6' },
                // { text: '已取消', value: '7' },
                { text: '已过期', value: '0' },
            ],
            sortMode: [
                { text: '默认排序', value: 'default' },
                { text: '下单时间 ↓', value: 'time_down' },
                { text: '下单时间 ↑', value: 'time_up' },
                { text: '下单金额 ↓', value: 'total_down' },
                { text: '下单金额 ↑', value: 'total_up' },
            ],
            // 请求订单列表配置项
            reqOption: {
                page: '1',  // 当前页数
                limit: '10',    // 每页条数
                status: this.$route.query.filterMode || '', // 订单状态
            },
            // 请求回来的订单列表
            orderList: [],
            // 渲染的订单列表
            renderOrderList: [],
            // 数据总数
            listTotal: null,
            // 订单列表加载
            loadingMore: false,
        };
    },
    computed: {
        ...mapState(['userInfo']),
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
                '1': '待付款',
                '2': '已支付',
                '3': '已发货',
                '4': '退货中',
                '5': '退款中',
                '6': '已完成',
                '7': '已取消',
            };
            return mapStatus[status];
        },
        // 关闭二维码弹出层
        closePopup() {
            this.$dialog.confirm({
                message: '确认关闭吗？',
            })
                .then(() => {
                    // 确认关闭
                    // 停止支付状态轮询
                    clearInterval(this.timerId);
                })
                .catch(() => {
                    // 取消关闭
                    this.isPopup = true;
                });
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
            // 深拷贝一份 作为渲染的订单列表
            this.renderOrderList = this._.cloneDeep(this.orderList);
            // console.log(data);
            // console.log(JSON.parse(data.result.rows[0].goods_info));
        },
        // 携带订单id，前往订单详情
        toOrderDetails(id) {
            this.$router.push({ path: '/orderDetails', query: { id: id } });
        },
        // 订单列表触底触发加载
        async loadMore() {
            this.reqOption.page = String(Number(this.reqOption.page) + 1);
            // 请求订单信息
            await this.getOrderList(this.reqOption, true);
            // 对订单信息进行排序
            this.sortOrder();
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
        // 支付订单
        async payOrder(id) {
            // console.log(id);
            // 创建微信支付
            let [pay_data, pay_err] = await createPaymentAPI(id);
            if (pay_err) return this.$toast('支付创建失败');
            // 将支付链接转换为二维码
            QRCode.toDataURL(pay_data.result.code_url)
                .then(url => {
                    // console.log(url);
                    // 保存支付二维码链接
                    this.paymentURL = url;
                    // 弹出 付款遮罩层
                    this.isPopup = true;

                    // 开启支付状态轮询
                    this.timerId = setInterval(async () => {
                        let [data, err] = await queryPaymentAPI(id);
                        if (err) return;
                        // console.log(data);
                        if (data?.result?.trade_state === 'SUCCESS') {
                            // 支付成功
                            this.$toast.success('支付成功');
                            // 刷新页面
                            this.$router.go(0);
                            // 关闭定时器
                            clearInterval(this.timerId);
                        }
                    }, 2000);
                })
                .catch(err => {
                    console.log('personal-order/index.vue --> payOrder', '二维码生成失败');
                });
        },
        // 删除订单
        async deleteOrder(id) {
            let [data, err] = await deleteOrderAPI(id);
            if (err) return this.$toast.fail('删除失败');
            this.$toast.success('删除成功');
            this.$router.go(0);
        },
        // 默认排序
        sortByDefault() {
            // 再拉取原数据
            this.renderOrderList = this._.cloneDeep(this.orderList);
        },
        // 下单时间↓ 排序
        sortByTime_down() {
            this.renderOrderList.sort((a, b) => b.order_time - a.order_time);
        },
        // 下单时间↑ 排序
        sortByTime_up() {
            this.renderOrderList.sort((a, b) => a.order_time - b.order_time);
        },
        // 下单金额↓ 排序
        sortByTotal_down() {
            this.renderOrderList.sort((a, b) => b.total_price - a.total_price);
        },
        // 下单金额↑ 排序
        sortByTotal_up() {
            this.renderOrderList.sort((a, b) => a.total_price - b.total_price);
        },
        // 对订单信息进行排序
        async sortOrder() {
            // 根据排序方式 调用对应排序函数
            switch (this.sortModeValue) {
                case 'default': this.sortByDefault(); break;
                case 'time_down': this.sortByTime_down(); break;
                case 'time_up': this.sortByTime_up(); break;
                case 'total_down': this.sortByTotal_down(); break;
                case 'total_up': this.sortByTotal_up(); break;
                default: break;
            }
        },
    },
    async created() {
        // 请求订单列表
        await this.getOrderList(this.reqOption);
        // 关闭loading
        this.loading = false;
    },
    beforeRouteLeave(to, from, next) {
        // 路由离开前，清空定时器
        clearInterval(this.timerId);
        next();
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

    // 加载中
    .loading {
        width: 100%;
        height: 40vh;
        display: flex;
        justify-content: center;
        align-items: center;
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

    // 二维码弹出层
    .qrcode {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        >h3 {
            width: 100%;
            text-align: center;
            font-size: vw(16);
            color: #555;
            font-weight: 700;
            border-bottom: 2px solid #ddd;
            padding: 20px 0px;
        }

        .imgBox {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            >img {
                width: vw(200);
                height: vw(200);
                object-fit: contain;
            }

            >p {
                font-size: vw(12);
                color: #999;
                font-weight: 700;
            }
        }
    }

}
</style>