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

        <!-- 主体 -->
        <main>
            <!-- 配送信息 -->
            <div class="module shippingInfo">
                <van-cell-group inset>
                    <van-cell title="收货信息" value="内容" is-link />
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
    </div>
</template>

<script>
// 引入API
import { getGoodDesc } from "@/api/goods";

export default {
    name: 'ReceiveInfo',
    data() {
        return {
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
        };
    },
    computed: {
        // 需支付 总额
        payAmount() {
            return this.goodsList.reduce((a, b) => {
                return a + b.num * b.price;
            }, 0);
        }
    },
    methods: {
        // 提交订单
        onSubmit() {
            console.log('clearing/index.vue', '功能开发中');
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
    },
    async created() {
        if (!this.goodsInfo) {
            // 如果商品信息不存在，则返回到购物车页
            return this.$router.replace('/cart');
        }
        // 获取商品信息
        await this.getGoodsInfo(this.goodsInfo);
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
        .shippingInfo {}

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