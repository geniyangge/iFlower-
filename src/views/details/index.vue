<template>
    <div id="details">
        <!-- 顶部title -->
        <header>
            <van-nav-bar :border="false" @click-left="$router.back()">
                <template #left>
                    <van-icon name="arrow-left" size="5.8667vw" color="#555" />
                </template>
                <template #title>
                    <img class="logo" src="@/assets/images/logo.webp" alt="logo" />
                </template>
            </van-nav-bar>
        </header>

        <!-- loading -->
        <div class="loading" v-if="loading">
            <van-loading type="spinner" color="#1989fa" />
        </div>
        <!-- 主体 -->
        <main v-else>
            <!-- 商品轮播图 -->
            <div class="swiper">
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(image, index) in goodDesc.img" :key="index">
                        <img v-lazy="image.path" />
                    </van-swipe-item>
                    <!-- 测试用，下面可删,<van-swipe-item> -->
                    <van-swipe-item v-for="(image, index) in goodDesc.img" :key="Math.random()">
                        <img v-lazy="image.path" />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- 商品介绍 -->
            <div class="desc">
                <!-- 商品名称 -->
                <h2>{{ goodDesc.name }}</h2>
                <!-- 商品价格 -->
                <div class="price">
                    <h3>￥{{ goodDesc.sale_price }}<span>￥{{ goodDesc.price }}</span></h3>
                    <p>已售{{ goodDesc.sold_num }}笔</p>
                </div>
            </div>
            <!-- 描述 -->
            <div class="description">
                <!-- 每个描述 -->
                <template v-for="desc in goodSku">
                    <div class="goodDesc" v-if="desc">
                        <div class="title">
                            <h3>{{ desc.name }}</h3>
                        </div>
                        <div class="text">
                            <p>{{ desc.sku_value }}</p>
                        </div>
                    </div>
                </template>
            </div>
            <!-- 数量 -->
            <div class="number">
                <van-field name="stepper" label="数量">
                    <template #input>
                        <van-stepper v-model="goodNumber" input-width="13.3333vw" button-size="8.5333vw" />
                    </template>
                </van-field>
            </div>
            <!-- 订单评价 -->
            <div class="evaluate">
                <!-- 评价标头 -->
                <div class="evaluate-title">
                    <h3>订单评价</h3>
                    <p>最近已有<span>321</span>条评论&nbsp;
                        <van-icon name="arrow" size="3.2vw" />
                    </p>
                </div>
                <!-- 评价内容 -->
                <div class="evaluate-content">
                    <!-- 评论区 -->
                    <div class="evaluate-area">
                        <!-- 每一条评论 -->
                        <template v-for="item in 2">
                            <div class="evaluate-item">
                                <!-- 用户 -->
                                <div class="evaluate-user">
                                    <!-- 左侧 -->
                                    <div class="evaluate-user-left">
                                        <van-image round width="8vw" height="8vw"
                                            src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                                        <p>136****7812</p>
                                    </div>
                                    <!-- 右侧 -->
                                    <div class="evaluate-user-right">
                                        <i class="iconfont icon-shoucang"></i>
                                    </div>
                                </div>
                                <!-- 信息 -->
                                <div class="evaluate-info">
                                    <p>沟通愉悦，配送及时，价格美丽，非常喜欢</p>
                                </div>
                            </div>
                        </template>
                    </div>
                    <!-- 查看更多评价 -->
                    <div class="lookMore">
                        <button>查看更多评价</button>
                    </div>
                </div>
            </div>
            <!-- 产品详情 -->
            <div class="goodDetails">
                <!-- 标题 -->
                <div class="goodDetails-title">
                    <h3>产品详情</h3>
                </div>
                <!-- 图片 -->
                <div class="goodDetails-images" v-html="goodDesc.rich_text"></div>
            </div>
        </main>

        <!-- 底部 商品导航 -->
        <van-goods-action>
            <van-goods-action-icon icon="home-o" text="首页" to="/" />
            <van-goods-action-icon icon="phone-o" text="电话" />
            <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartGoodsNum" to="/cart" />
            <van-goods-action-button type="warning" text="加入购物车" @click="addGood" />
            <van-goods-action-button type="danger" text="立即购买" @click="" />
        </van-goods-action>
    </div>
</template>

<script>
// 引入API
import { getGoodSku } from '@/api/specification';
import { getGoodDesc } from '@/api/goods';
import { getUserCartInfo, addGoodsToCart } from '@/api/cart';

export default {
    name: 'Details',
    data() {
        return {
            // loading
            loading: true,
            // 要购买的商品数量
            goodNumber: 1,
            // 商品id
            id: this.$route.query.id || null,
            // 商品规格
            goodSku: [],
            // 商品详细信息
            goodDesc: {
                id: '',  // 商品ID
                name: '',  // 商品名称
                price: 0,    // 商品价格
                sale_price: 0,   // 商品优惠价格
                sold_num: 0,    // 商品销量
                img: [],    // 商品图片
                rich_text: '',  // 富文本
            },
            // 购物车商品种类数量
            cartGoodsNum: 0,
            // 未添加过商品?
            notAdd: true,
        };
    },
    methods: {
        // 获取商品信息
        getGoodInfo(id) {
            // 请求商品的规格以及详细信息
            Promise.all([getGoodSku(id), getGoodDesc(id)])
                .then(res => {
                    let [[sku, err1], [desc, err2]] = res;
                    // 商品规格
                    // console.log(sku.result);
                    // console.log(desc.result);
                    // 获取规格码
                    let skuCodes = sku.result.stock_list[0].goods_specs.split(",");
                    // 遍历每类规格
                    this.goodSku = sku.result.property.map(p => {
                        // 根据规格码，筛选出需要的规格
                        let sku = p.s_attributesValues.map(v => {
                            if (skuCodes.includes(v.id.toString())) {
                                return {
                                    sku_value: v.attribute_value,
                                };
                            }
                            return null;
                        });
                        // sku === [null,{},null]
                        let property = sku.filter(v => v !== null);
                        // // 如果此次没有需要的规格
                        if (!property.length) return null;
                        property = property[0];
                        // property === {}
                        property.name = p.keyName;
                        return property;
                    });
                    // 商品详细信息
                    this.goodDesc = {
                        id: desc.result.id,  // 商品ID
                        name: desc.result.name,  // 商品名称
                        price: desc.result.price,    // 商品价格
                        sale_price: desc.result.sale_price,   // 商品优惠价格
                        sold_num: desc.result.sold_num,    // 商品销量
                        img: desc.result.s_goods_photos,    // 商品图片
                        rich_text: desc.result.rich_text,   // 富文本
                    };
                    // console.log(this.goodDesc);
                })
                .catch(err => {
                    console.log('details/index.vue', err);
                });
        },
        // 获取购物车信息
        async getCartInfo() {
            let [data, err] = await getUserCartInfo();
            if (err) return;
            this.cartGoodsNum = data.result.length;
        },
        // 添加商品至购物车
        async addGood() {
            let option = {
                goods_id: this.id, // 商品ID
                num: this.goodNumber,        // 数量
            };
            let [data, err] = await addGoodsToCart(option);
            if (err) return;
            if (this.notAdd) {
                // 如果没添加过商品
                await this.getCartInfo();
                this.notAdd = false;
            }
            this.$toast.success('添加成功');
        },
    },
    async created() {
        // 获取商品信息
        await this.getGoodInfo(this.id);
        // 获取购物车信息
        await this.getCartInfo();
        // 取消loading
        this.loading = false;
    },
};
</script>

<style lang="scss" scoped>
#details {
    @include funpage(#e9ecf0);
    display: flex;
    flex-direction: column;
    padding-bottom: vw(50);

    // 底部商品导航高度
    .van-goods-action {
        height: vw(50);
    }

    // 标题栏
    header {
        flex-shrink: 0;

        // 顶部标题栏高度
        ::v-deep .van-nav-bar__content {
            height: vw(55);
        }

        i.iconfont {
            font-size: vw(22);
            color: #000;
        }

        // logo尺寸
        img.logo {
            width: vw(75);
            height: vw(30);
            object-fit: cover;
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

    // 主体
    main {
        flex: 1;

        // 轮播图
        .swiper {
            width: vw(375);
            height: vw(375);

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        // 商品介绍
        .desc {
            background-color: #fff;
            padding: vw(15);
            margin-bottom: vw(1);

            // 商品名称
            >h2 {
                font-size: vw(15);
                color: #555;
                line-height: vw(20);
            }

            // 商品价格
            .price {
                padding-top: vw(15);
                display: flex;
                justify-content: space-between;
                align-items: flex-end;

                >h3 {
                    color: #ff734c;
                    font-size: vw(20);
                    line-height: vw(26);
                    font-weight: 700;

                    >span {
                        color: #b4babf;
                        font-size: vw(14);
                        line-height: vw(18.5);
                        font-weight: 400;
                        text-decoration: line-through;
                        margin-left: vw(4);
                    }
                }

                >p {
                    align-self: center;
                    font-size: vw(12);
                    color: #555;
                    line-height: vw(16);
                }
            }


        }

        // 描述
        .description {
            background-color: #fff;
            padding: vw(5) vw(15);

            // 每个描述
            .goodDesc {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .title {
                    width: vw(50);
                    height: vw(20);
                    display: flex;
                    align-items: center;
                    padding: vw(10) 0px;

                    >h3 {
                        color: #555;
                        font-size: vw(14);
                    }
                }

                .text {
                    flex: 1;
                    padding: vw(10) 0px;

                    >p {
                        color: #555;
                        font-size: vw(14);
                        line-height: 1.5;
                    }
                }

                // 下划线
                &:not(:last-of-type) {
                    .text {
                        border-bottom: 1px solid #e9ecf0;
                    }
                }
            }
        }

        // 数量
        .number {
            background-color: #fff;
            margin: vw(7.5) 0px;
            padding: vw(15) vw(15);

            // 修改field内边距
            .van-cell {
                padding: 0px;

                // 文本
                ::v-deep .van-field__label {
                    color: #555;
                    font-size: vw(14);
                    width: vw(60);
                }
            }
        }

        // 订单评价
        .evaluate {
            background-color: #fff;
            margin-bottom: vw(7.5);

            // 标头
            .evaluate-title {
                padding: vw(15);
                border-bottom: 1px solid #e9ecf0;
                display: flex;
                justify-content: space-between;
                align-items: center;

                >h3 {
                    line-height: vw(20);
                    color: #555;
                    font-size: vw(16);
                }

                >p {
                    line-height: vw(14);
                    color: #333;
                    font-size: vw(12);
                }
            }

            // 评价内容
            .evaluate-content {
                background-color: #fff;
                padding: vw(5) vw(15);

                // 评论区
                .evaluate-area {

                    // 每一条评论
                    .evaluate-item {
                        &:not(:last-of-type) {
                            border-bottom: 1px solid #e9ecf0;
                        }

                        // 用户
                        .evaluate-user {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: vw(10) 0px;

                            // 左侧
                            .evaluate-user-left {
                                display: flex;
                                align-items: center;

                                >p {
                                    font-size: vw(14);
                                    color: #555;
                                    margin-left: vw(30);
                                }
                            }

                            // 右侧
                            .evaluate-user-right {

                                >i {
                                    font-size: vw(14);
                                    color: #555;
                                }
                            }
                        }

                        // 评论信息
                        .evaluate-info {
                            padding: vw(10) 0px vw(20);

                            >p {
                                line-height: 1.5;
                                color: #555;
                                font-size: vw(14);
                            }
                        }
                    }
                }



                // 查看更多评价
                .lookMore {
                    padding: vw(15) 0px vw(30);
                    display: flex;
                    justify-content: center;

                    >button {
                        border: 1px solid #232628;
                        outline: none;
                        width: vw(90);
                        height: vw(28);
                        color: #232628;
                        font-size: vw(12);
                        background-color: #fff;
                        margin: 0 auto;
                    }
                }
            }
        }

        // 产品详情
        .goodDetails {
            background-color: #fff;

            // 标题
            .goodDetails-title {
                padding: vw(15);

                >h3 {
                    font-size: vw(16);
                    color: #555;
                }
            }

            // 图片
            .goodDetails-images {
                padding-bottom: vw(100);

                img {
                    width: 100%;
                    object-fit: cover;
                }
            }
        }
    }
}
</style>