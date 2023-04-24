<template>
    <!-- 结算页 -->
    <div id="receiveInfo">
        <!-- 顶部标题栏 -->
        <header>
            <!-- 标题栏 -->
            <van-nav-bar title="填写订单" @click-left="$router.back()" :border="false">
                <template #left>
                    <van-icon name="arrow-left" size="5.8667vw" color="#555" />
                </template>
            </van-nav-bar>
        </header>

        <!-- loading -->
        <div class="loading" v-if="loading">
            <van-loading type="spinner" color="#1989fa" />
        </div>

        <!-- 主体 -->
        <main v-else>
            <!-- 配送信息 -->
            <div class="module shippingInfo">
                <van-cell-group inset>
                    <!-- 点击收货信息，携带原有的query前往地址列表页 -->
                    <van-cell required center value-class="addressInfo" title="收货信息" value="内容" is-link
                        :to="{ path: '/address', query: { goodsInfo: $route.query.goodsInfo } }">
                        <p class="van-ellipsis">{{ addressInfo.name }}&nbsp;{{ addressInfo.tel }}</p>
                        <p class="van-ellipsis">{{ addressInfo.address }}&nbsp;{{ addressInfo.desc }}</p>
                    </van-cell>
                    <van-cell title="送达日期" value="内容" is-link />
                    <van-cell title="配送时间" value="内容" is-link />
                    <van-cell title="配送方式" value="内容" is-link />
                </van-cell-group>
            </div>

            <!-- 订购人信息 -->
            <div class="module buyerInfo">
                <van-cell-group inset>
                    <van-cell title="订购人信息" value="请填写" is-link />
                </van-cell-group>
            </div>

            <!-- 留言 -->
            <div class="module voiceMsg">
                <van-cell-group inset>
                    <!-- 贺卡留言 -->
                    <van-cell title="贺卡留言" :border="false" />
                    <van-cell>
                        <van-field v-model="greetingMsg" rows="2" autosize type="textarea" placeholder="选填 请输入贺卡留言" />
                    </van-cell>
                    <!-- 买家留言 -->
                    <van-cell title="买家留言" :border="false" />
                    <van-cell>
                        <van-field v-model="buyerMsg" rows="2" autosize type="textarea" placeholder="选填 请输入买家留言" />
                    </van-cell>
                </van-cell-group>
            </div>

            <!-- 商品信息 -->
            <div class="module goodsInfo">
                <van-cell-group inset>
                    <template v-for="good in goodsList">
                        <van-cell>
                            <van-card v-bind="good" />
                        </van-cell>
                    </template>
                </van-cell-group>
            </div>

            <!-- 支付方式 -->
            <div class="module payMode">
                <van-radio-group v-model="radio">
                    <van-cell-group inset>
                        <van-cell title="支付方式" />
                        <!-- 微信支付 -->
                        <van-cell title="微信" clickable @click="radio = '1'">
                            <template #icon>
                                <i class="iconfont icon-weixinzhifu" style="color: #09bb07; font-size: 20px;"></i>
                            </template>
                            <template #right-icon>
                                <van-radio name="1" />
                            </template>
                        </van-cell>
                        <!-- 支付宝支付 -->
                        <van-cell title="支付宝" clickable @click="radio = '2'">
                            <template #icon>
                                <i class="iconfont icon-zhifubao" style="color:#02a9f1; font-size: 20px;"></i>
                            </template>
                            <template #right-icon>
                                <van-radio name="2" />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>

            <!-- 发票 -->
            <div class="module invoice">
                <van-cell-group inset>
                    <van-cell title="发票" value="选填" is-link />
                </van-cell-group>
            </div>

            <!-- 合计信息 -->
            <div class="module totalInfo">
                <van-cell-group inset>
                    <van-cell>
                        <div class="totalInfoBox">
                            <!-- 左 -->
                            <div class="total-left">
                                <!-- 商品总数 -->
                                <div class="totalNUm">
                                    <p>共<span>1</span>件商品</p>
                                </div>
                                <!-- 运费 -->
                                <div class="freight">
                                    <p>运费：<span>￥0</span></p>
                                </div>
                            </div>
                            <!-- 右 -->
                            <div class="total-right">
                                <!-- 优惠 -->
                                <div class="discounts">
                                    <p>优惠：<span>-￥0</span></p>
                                </div>
                                <!-- 商品总价 -->
                                <div class="totalPrice">
                                    <p>商品总价：<span>￥&nbsp;{{ payAmount.toFixed(2) }}</span></p>
                                </div>
                            </div>
                        </div>
                    </van-cell>
                </van-cell-group>
            </div>
        </main>

        <!-- 底部提交订单 -->
        <footer>
            <van-submit-bar :price="payAmount * 100" button-text="提交订单" @submit="onSubmit" />
        </footer>

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
// 引入API
import { getGoodDesc } from "@/api/goods";
import { getUserAddressList, getAddressByIdAPI } from '@/api/address';
import { addOrderAPI } from '@/api/order';
import { createPaymentAPI, queryPaymentAPI } from '@/api/payment';
// 引入vuex
import { mapActions, mapState } from "vuex";
// 引入QRCode
import QRCode from 'qrcode';

export default {
    name: 'ReceiveInfo',
    data() {
        return {
            // 加载中
            loading: true,
            // 支付二维码遮罩层
            isPopup: false,
            // 贺卡留言
            greetingMsg: '',
            // 买家留言
            buyerMsg: '',
            // 绑定单选框
            radio: '1',
            // 接收query的goodsInfo
            /* 
                接收query的goodsInfo
                goodsInfo === [
                    {
                        "id": 12, // 商品id
                        "num": 0, // 商品数量
                        "shoppingCartIds": 123 // 购物车id
                    }
                ]
            */
            goodsInfo: JSON.parse(this.$route.query.goodsInfo || null),
            // 接收query的shoppingCartIds
            shoppingCartIds: [],
            // 选购的商品列表（渲染用）
            /* 
                选购的商品列表
                goodsList === [
                    {
                        "id": 1, // 商品id
                        "title": '', // 商品名称
                        "num": 0, // 商品数量
                        "origin-price": 0, // 商品原价
                        "price": 0, // 商品优惠价
                        "thumb": '', // 商品图片
                    }
                ]
            */
            goodsList: [],
            // 收货地址信息
            addressInfo: {
                name: '',   // 收件人姓名
                tel: '',    // 收件人电话
                address: '',// 收件人地址
                desc: '',   // 收件人地址详情
            },
            // 收货地址id(默认是 默认地址)
            addressId: '',
            // 二维码链接
            paymentURL: '',
            // 定时器标号，用于轮询支付状态
            timerId: null,
        };
    },
    computed: {
        ...mapState(['defaultAddress']),
        // 需支付 总额
        payAmount() {
            return this.goodsList.reduce((a, b) => {
                return a + b.num * b.price;
            }, 0);
        },
    },
    methods: {
        ...mapActions(['getCartGoodsList']),
        // 提交订单
        async onSubmit() {
            let option = {
                goods_info: this.goodsInfo,
                addr_id: this.addressId,
                shoppingCartIds: this.shoppingCartIds,
            };
            // 创建订单
            let [order_data, order_err] = await addOrderAPI(option);
            if (order_err) return this.$toast('创建订单失败');

            // 重新请求购物车信息
            this.getCartGoodsList();

            if (order_data.code == 1) {
                // 库存不足
                this.$notify({
                    message: '库存不足，请选择其他商品',
                    type: 'danger',
                    duration: 2000,
                });
                return;
            }


            // 获取订单id
            let order_id = order_data.result.order_id;
            // console.log(order_data.result.order_id);
            // 创建微信支付
            let [payment_data, payment_err] = await createPaymentAPI(order_id);
            if (payment_err) return this.$toast('支付创建失败');

            // 获取支付链接
            // console.log(payment_data.result.code_url);
            // 将支付链接转换为二维码
            QRCode.toDataURL(payment_data.result.code_url)
                .then(url => {
                    // 转换成功，保存并渲染到页面上
                    // console.log(url);
                    this.paymentURL = url;

                    // 设置定时器，轮询支付状态
                    this.timerId = setInterval(async () => {
                        // 轮询支付状态
                        // console.log(payment_state);
                        let [payment_state, payment_err] = await queryPaymentAPI(order_id);
                        if (payment_err) return;
                        // console.log(payment_state.result.trade_state);
                        // 获取支付状态
                        if (payment_state?.result?.trade_state === 'SUCCESS') {
                            // 支付成功
                            this.$toast.success('支付成功');
                            // 停止轮询
                            clearInterval(this.timerId);
                            // 关闭二维码遮罩层
                            this.isPopup = false;

                            // 2秒后页面跳转
                            let timer_timeout = null;
                            timer_timeout = setTimeout(() => {
                                this.$router.replace('/order');
                                // 清除定时器
                                clearTimeout(timer_timeout);
                            }, 2000);
                        }
                    }, 2000);

                    // 弹出二维码遮罩层
                    this.isPopup = true;
                })
                .catch(err => {
                    // 转换失败
                    console.log('clearing/index.vue --> 支付二维码生成失败', err);
                });

            // 提示请支付订单
            // this.$notify({
            //     message: '请支付订单',
            //     type: 'warning',
            //     duration: 2000,
            // });
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
                    // 跳转到订单页
                    this.$router.replace('/order');
                })
                .catch(() => {
                    // 取消关闭
                    this.isPopup = true;
                });
        },
        // 根据query传入的商品id，批量获取商品信息
        async getGoodsInfo(goodsInfo = []) {
            // console.log(goodsInfo);
            // 将商品信息转换为请求队列
            let reqsQuene = goodsInfo.map(g => getGoodDesc(g.id));
            Promise.all(reqsQuene)
                .then(res => {
                    // console.log(res);
                    // 将商品信息添加到goodsList中
                    this.goodsList = res.map(g => g[0].result)
                        .map(g => (
                            {
                                "id": g.id, // 商品id
                                "title": g.name, // 商品名称
                                "num": goodsInfo.find(v => v.id == g.id).num,  // 商品数量
                                "origin-price": g.price, // 商品原价
                                "price": g.sale_price, // 商品优惠价
                                "thumb": g.s_goods_photos[0].path, // 商品图片
                            }
                        ));
                    // console.log(this.goodsList);
                })
                .catch(err => {
                    console.log('clearing/index.vue', '请求商品时发生错误', err);
                });
        },
        // 根据收货地址id，获取收货地址详细信息
        async getAddressInfo(addressId) {
            let [data, err] = await getAddressByIdAPI(addressId);
            if (err) return;
            // 取出需要的地址信息
            this.addressInfo = {
                name: data.result.name,         // 收件人姓名
                tel: data.result.phone,         // 收件人电话
                address: data.result.area_name, // 收件人地址
                desc: data.result.desc,         // 收件人地址详情
            };
        },
    },
    async created() {
        // console.log(JSON.parse(this.$route.query.goodsInfo));
        // 获取选中收货地址的id
        this.addressId = sessionStorage.getItem('addressId') || null;
        if (this.addressId) {
            // 这里表示点击了收货信息，从收货地址列表再跳转回来
            // 如果存在addressId,则请求收货地址信息
            await this.getAddressInfo(this.addressId);
            // 删除缓存的收货地址id
            sessionStorage.removeItem('addressId');
        } else {
            // 这里没有点击收货信息,没有跳转收货地址列表
            // 使用默认收货地址
            if (this.defaultAddress === null) {
                // 如果数据不存在，请求一次
                await getUserAddressList();
            }
            // 取出需要的地址信息
            this.addressInfo = {
                name: this.defaultAddress.name,         // 收件人姓名
                tel: this.defaultAddress.phone,         // 收件人电话
                address: this.defaultAddress.area_name, // 收件人地址
                desc: this.defaultAddress.desc,         // 收件人地址详情
            };
            // 使用默认收货地址的id
            this.addressId = this.defaultAddress.id;
        }

        // query中的商品信息
        if (!this.goodsInfo) {
            // 如果商品信息不存在，则返回到购物车页
            return this.$router.replace('/cart');
        }

        // 提取query中商品信息的 购物车id
        if (this.goodsInfo[0].shoppingCartIds) {
            // 如果存在购物车id，则将购物车id赋值
            this.shoppingCartIds = this.goodsInfo.map(g => g.shoppingCartIds);
        } else {
            this.shoppingCartIds = null;
        }

        // console.log(this.shoppingCartIds);

        // 获取商品信息
        await this.getGoodsInfo(this.goodsInfo);

        this.loading = false;
    },
    // 组件路由离开前触发
    beforeRouteLeave(to, from, next) {
        // 停止支付状态轮询
        clearInterval(this.timerId);
        // 放行页面跳转
        next();
    },
};
</script>

<style lang="scss" scoped>
#receiveInfo {
    @include funpage(#f7f7f7);
    display: flex;
    flex-direction: column;

    // 标题栏
    header {
        flex-shrink: 0;
    }

    // 加载中
    .loading {
        width: 100%;
        height: 40vh;
        display: flex;
        justify-content: center;
        align-items: center;
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

    // 主体
    main {
        flex: 1;
        padding: 0px vw(10) vw(60);

        >div.module {
            margin-top: vw(10);

            // 单元格样式
            .van-cell-group--inset {
                margin: 0px;
            }
        }

        // 配送信息
        .shippingInfo {

            // 控制收货信息单元格右侧内容的宽度
            .addressInfo.van-cell__value {
                flex: 2;
            }
        }

        // 订购人信息
        .buyerInfo {}

        // 留言
        .voiceMsg {

            // 单元格cell 样式
            .van-cell {
                // &:nth-of-type(odd) {
                //     padding-bottom: 0px;
                // }

                &:nth-of-type(even) {
                    padding-top: 0px;
                }

                &.van-field {
                    padding: 0;
                }
            }

            // 文本域输入框高度限制
            ::v-deep .van-field__control {
                min-height: vw(100);
                max-height: vw(100);
                padding: vw(4) vw(8);
                border: 1px solid #555;
                border-radius: vw(4);
            }
        }

        // 商品信息
        .goodsInfo {
            .van-card {
                background-color: transparent;
                padding: 0;
            }
        }

        // 支付方式
        .payMode {

            // icon
            i.iconfont {
                margin-right: 6px;
            }
        }

        // 发票
        .invoice {}

        // 合计信息
        .totalInfo {
            .totalInfoBox {
                width: 100%;
                display: flex;
                align-items: center;

                p {
                    font-size: vw(14);
                    color: #000;
                }

                .total-left {
                    width: 50%;

                    .totalNUm {
                        margin-bottom: vw(10);
                    }
                }

                .total-right {
                    width: 50%;

                    .discounts {
                        margin-bottom: vw(10);
                    }

                    .totalPrice {
                        >p>span {
                            color: #ff2222;
                        }
                    }
                }
            }
        }
    }

    // 底部 提交订单
    footer {
        .van-submit-bar__bar {
            height: vw(50);
            border-top: 1px solid #f7f7f7;
        }
    }
}
</style>