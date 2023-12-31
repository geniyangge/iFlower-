<template>
    <!-- 订单详情页 -->
    <div id="orderDetails">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="订单详情" left-arrow @click-left="$router.back()" :border="false" />
        </div>

        <!-- loading -->
        <div class="loading" v-if="loading">
            <van-loading type="spinner" color="#1989fa" />
        </div>

        <main v-else>
            <!-- 订单状态 -->
            <div class="orderStatus" :class="satusBgc">
                <i class="iconfont" :class="statusIcon"></i>
                <h3>{{ orderStatus }}</h3>
                <!-- 倒计时 -->
                <div class="deadline" v-if="orderInfo?.status === '1'">
                    <van-count-down :time="deadlineTime" @finish="$router.go(0)">
                        <template #default="timeData">
                            <span class="block">{{ timeData.hours }}</span>
                            <span class="colon">:</span>
                            <span class="block">{{ timeData.minutes }}</span>
                            <span class="colon">:</span>
                            <span class="block">{{ timeData.seconds }}</span>
                        </template>
                    </van-count-down>
                </div>
            </div>

            <!-- 商品列表 -->
            <div class="goodsList">
                <van-cell-group inset>
                    <!-- 商品信息 -->
                    <van-cell>
                        <template v-for="good in goodsList">
                            <van-card :num="good.num" :price="good.sale_price" desc="七天无理由退货" :title="good.name"
                                :thumb="good.img" />
                        </template>
                    </van-cell>
                    <!-- 合计 -->
                    <van-cell>
                        <template #title>
                            <p class="total">共{{ goodsList.length }}件，合计：￥{{ orderInfo.total_price }}</p>
                        </template>
                        <template #right-icon>
                            <!-- 去支付 -->
                            <van-button round size="mini" @click.stop="payOrder(orderInfo.order_id)"
                                v-if="orderInfo.status === '1'">去支付</van-button>
                            <!-- 删除订单 -->
                            <van-button round size="mini" @click.stop="deleteOrder(orderInfo.id)">删除订单</van-button>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>

            <!-- 订单详情 -->
            <div class="details">
                <van-cell-group inset>
                    <van-cell :border="false" title="订单编号" :value="orderInfo.order_id" />
                    <van-cell :border="false" title="下单时间" :value="orderInfo.createdTime" />
                    <van-cell :border="false" title="支付方式" :value="orderInfo.payWay || '无'" />
                    <van-cell :border="false" title="支付时间" :value="orderInfo.payTime" />
                    <van-cell :border="false" title="配送方式" value="先付后寄" />
                    <van-cell :border="false" title="商品总额" :value="orderInfo.total_price" />
                </van-cell-group>
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
import { getOrderAPI, deleteOrderAPI } from '@/api/order';
import { createPaymentAPI, queryPaymentAPI } from '@/api/payment.js';
// 引入日期格式化工具
import moment from 'moment';
// 引入二维码生成模块
import QRCode from 'qrcode';

export default {
    name: 'OrderDetails',
    data() {
        return {
            // loading
            loading: true,
            // 控制支付二维码弹出层
            isPopup: false,
            // 支付二维码链接
            paymentURL: '',
            // 支付轮询定时器编号
            timerId: null,
            // 路由跳转传递过来的订单id
            order_id: this.$route.query.id || null,
            // 订单内商品信息
            /* 
                goodsList === [
                    {
                        name: '', // 商品名称
                        id: '', // 商品id
                        num: 0, // 商品数量
                        sale_price: 0, // 商品价格
                        img: '', // 商品图片
                    }
                ]
            */
            goodsList: [],
            // 订单详情
            orderInfo: {
                id: '', // 订单id
                order_id: '',// 订单编号
                status: '', // 订单状态
                order_time: '', // 下单时间（时间戳）
                createdTime: '',// 下单时间
                payWay: '无',// 支付方式
                payTime: '',// 支付时间
                total_price: 0,// 商品总额
            },
        };
    },
    computed: {
        // 订单状态 转 文字
        orderStatus() {
            if (!this.orderInfo?.status) return '订单不存在';
            if (this.orderInfo.status === '-1') return '订单已删除';
            // 订单状态映射
            const statusMap = ['订单已过期', '订单待支付', '订单已支付', '订单已发货', '退货中', '退款中', '订单已完成', '订单已取消'];
            return statusMap[this.orderInfo.status];
        },
        // 控制 订单状态 图标
        statusIcon() {
            // 关闭图标
            if (!this.orderInfo?.status ||
                this.orderInfo.status === '-1' ||
                this.orderInfo.status === '0' ||
                this.orderInfo.status === '7')
                return 'icon-cuowuguanbi';

            // 完成图标
            if (this.orderInfo.status === '6') return 'icon-chenggong';

            // 进行中图标
            return 'icon-shijian';
        },
        // 控制 订单状态 背景色
        satusBgc() {
            // 红色
            if (!this.orderInfo?.status ||
                this.orderInfo.status === '-1' ||
                this.orderInfo.status === '0' ||
                this.orderInfo.status === '7')
                return 'fail';

            // 绿色
            if (this.orderInfo.status === '2' ||
                this.orderInfo.status === '3' ||
                this.orderInfo.status === '6')
                return 'success';

            // 灰色
            return 'other';
        },
        // 支付倒计时
        deadlineTime() {
            if (!this.orderInfo?.order_time) return 0;
            // 下单后三十分钟为最后支付时间
            let deadline = Number(this.orderInfo.order_time) + (30 * 60 * 1000);
            // 当前剩余可支付时间
            return deadline - new Date() >= 0 ? deadline - new Date() : 0;
        },
    },
    methods: {
        // 获取订单详细信息
        async getOrder(id) {
            let [data, err] = await getOrderAPI(id);
            if (err) return;
            // 保存商品列表信息
            this.goodsList = data.result.goods_info.map(g => ({
                name: g.goods_name,
                id: g.id,
                num: g.num,
                sale_price: g.sale_price,
                img: g.s_goods_photos[0].path,
            }));
            // 保存订单详情信息
            this.orderInfo = {
                id: data.result.id,// 订单id
                order_id: data.result.order_id,// 订单编号
                status: data.result.status,// 订单状态
                order_time: data.result.order_time,// 下单时间(时间戳)
                createdTime: moment(data.result.createdAt).format('YYYY-MM-DD HH:mm:ss'),// 下单时间
                payWay: '微信支付',// 支付方式
                payTime: data.result.payment_time ? moment(Number(data.result.payment_time)).format('YYYY-MM-DD HH:mm:ss') : '无',// 支付时间
                total_price: data.result.total_price,// 商品总额
            };
            // console.log(data.result);
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
            this.$dialog.confirm({
                message: '确认删除这条订单信息吗？',
            })
                .then(async () => {
                    // 确认删除
                    let [data, err] = await deleteOrderAPI(id);
                    if (err) return this.$toast.fail('删除失败');
                    this.$toast.success('删除成功');
                    // 跳转回上一个页面
                    this.$router.back();
                })
                .catch(() => {
                    // 取消删除
                });
        },
    },
    async created() {
        if (this.order_id === null) {
            // 如果订单id不存在，就跳转到 首页
            this.$router.replace('/');
        }

        // 请求订单详细信息
        await this.getOrder(this.order_id);

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
#orderDetails {
    @include funpage();
    padding-bottom: vw(50);

    // 标题栏
    .title {
        border-bottom: 1px solid #e4e4e4;

        // 标题栏高度
        ::v-deep .van-nav-bar__content {
            height: vw(50);
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

        // cell单元格组样式
        .van-cell-group {
            margin: 0px vw(10);
        }

        // 订单状态
        .orderStatus {
            height: vw(40);
            display: flex;
            align-items: center;
            padding-left: vw(16);
            margin-bottom: vw(10);

            &.success {
                background-color: #07c160;
            }

            &.fail {
                background-color: #fa5151;
            }

            &.other {
                background-color: #9fa4a7;
            }

            >i {
                font-size: vw(16);
                color: #fff;
                margin-right: vw(10);
            }

            >h3 {
                font-size: vw(16);
                color: #fff;
                margin-right: vw(10);
            }

            // 倒计时
            .deadline {
                margin-left: vw(10);

                .colon {
                    display: inline-block;
                    color: #fff;
                    margin: 0 4px;
                }

                .block {
                    display: inline-block;
                    width: 22px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    background-color: #c4c4c4;
                    border-radius: 20%;
                }
            }
        }

        // 商品列表
        .goodsList {
            margin-bottom: vw(10);

            // 单元格组
            .van-cell-group--inset {

                // 合计
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

        // 订单详情
        .details {}
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