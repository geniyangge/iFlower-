<template>
    <!-- 封装商品列表 组件 -->
    <div class="goodsList">
        <template v-for="good in goodsList">
            <!-- 商品 -->
            <div class="good" :class="{ round }" @click="$router.push({ name: 'Details', query: { id: good.id } })">
                <!-- 商品图片 -->
                <div class="goodImg">
                    <van-image v-if="useVanImage" :src="good.img" :alt="good.name" />
                    <img v-else :src="good.img" :alt="good.name">
                </div>
                <!-- 商品文字 -->
                <div class="goodText">
                    <h3>{{ good.name }}</h3>
                    <!-- 价格 -->
                    <div class="price">
                        <h3>￥{{ good.price }}</h3>
                        <p>销量{{ good.sold_num }}笔</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        // 商品列表数组
        /* 
            数据类型
            [
                {
                    id: 123,  // 商品ID
                    name: 商品,  // 商品名称
                    img: '../../1.jpg',  // 商品图片地址
                    price: 239,  // 商品价格
                    sold_num: 10,  // 商品销量
                }
            ]
        */
        goodsList: {
            type: Array,
            default: () => [],
        },
        // 商品卡片底部是否倒圆角
        round: {
            type: Boolean,
            default: false,
        },
        // 是否使用van-image组件展示图片
        useVanImage: {
            type: Boolean,
            default: true,
        }
    },
};
</script>

<style lang="scss" scoped>
// 商品列表
.goodsList {
    padding: 0px vw(15) 0px vw(10);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    // 商品
    >.good {
        flex-shrink: 0;
        box-shadow: 0px vw(5) vw(10) 0px #dee2e5;
        margin-bottom: vw(10);
        background-color: #fff;

        &.round {
            border-bottom-left-radius: vw(5);
            border-bottom-right-radius: vw(5);
        }

        // 商品图片
        >.goodImg {
            width: vw(165);
            height: vw(165);
            overflow: hidden;

            >img {
                width: 100%;
            }
        }

        // 商品文字
        .goodText {
            margin-top: vw(20);

            >h3 {
                color: #333;
                font-size: vw(14);
                line-height: vw(18);
                padding: 0px vw(10);
            }

            // 价格
            >.price {
                height: vw(28.5);
                padding: 0px vw(5) vw(5);
                display: flex;
                justify-content: space-between;
                align-items: center;

                >h3 {
                    color: #ff734c;
                    font-size: vw(14);
                    font-weight: 700;
                }

                >p {
                    color: #999;
                    font-size: vw(12);
                    font-weight: 400;
                }
            }
        }

    }
}
</style>