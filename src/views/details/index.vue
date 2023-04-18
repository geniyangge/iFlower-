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

        <!-- 主体 -->
        <main>
            <!-- 商品轮播图 -->
            <div class="swiper">
                <!-- <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(image, index) in images" :key="index">
                        <img v-lazy="image" />
                    </van-swipe-item>
                </van-swipe> -->
            </div>
            <!-- 商品介绍 -->
            <div class="desc">
                <!-- 商品名称 -->
                <h2>此情不渝</h2>
                <!-- 商品价格 -->
                <div class="price">
                    <h3>￥299<span>￥399</span></h3>
                    <p>已售26576笔</p>
                </div>
            </div>
            <!-- 描述 -->
            <div class="description">
                <!-- 每个描述 -->
                <template>
                    <div class="goodDesc">
                        <div class="title">
                            <h3>规格</h3>
                        </div>
                        <div class="text">
                            <p>19枝精品红玫瑰，尤加利叶搭配</p>
                        </div>
                    </div>
                </template>
            </div>
            <!-- 数量 -->
            <div class="number">
                <van-field name="stepper" label="数量">
                    <template #input>
                        <van-stepper input-width="13.3333vw" button-size="8.5333vw" v-model="goodNumber" />
                    </template>
                </van-field>
            </div>
            <!-- 订单评价 -->
            <div class="evaluate">
                <div class="evaluate-title">
                    <h3>订单评价</h3>
                    <p>最近已有<span>321</span>条评论&nbsp;
                        <van-icon name="arrow" size="3.2vw" />
                    </p>
                </div>
            </div>
        </main>

        <!-- 底部 商品导航 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" @click="" />
            <van-goods-action-icon icon="cart-o" text="购物车" @click="" />
            <van-goods-action-icon icon="shop-o" text="店铺" @click="" />
            <van-goods-action-button type="warning" text="加入购物车" @click="" />
            <van-goods-action-button type="danger" text="立即购买" @click="" />
        </van-goods-action>
    </div>
</template>

<script>
export default {
    name: 'Details',
    data() {
        return {
            goodNumber: 0,
        };
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

    // 主体
    main {
        flex: 1;

        // 轮播图
        .swiper {
            width: vw(375);
            height: vw(375);
            background-color: skyblue;
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
        }
    }
}
</style>