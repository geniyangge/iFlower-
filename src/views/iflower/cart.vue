<template>
    <div id="cart">
        <!-- 顶部标题栏 -->
        <header>
            <!-- 标题栏 -->
            <van-nav-bar title="购物车" @click-left="$router.back()" :border="false">
                <template #left>
                    <van-icon name="arrow-left" size="5.8667vw" color="#555" />
                </template>
            </van-nav-bar>
        </header>

        <!-- 主体 -->
        <main>
            <!-- 空状态 购物车商品栏 -->
            <div class="noGoods">
                <!-- 这里空空如也 -->
                <div class="nothing">
                    <!-- 无 图 -->
                    <div class="nothingImg">
                        <img src="@/assets/images/cart/cartback.webp" alt="空空的购物车">
                    </div>
                    <h2>购物车暂时没有商品</h2>
                    <button>去逛逛</button>
                </div>
            </div>

            <!-- 有商品的 购物车商品栏 -->

            <!-- 猜你喜欢 -->
            <div class="guessYouLike">
                <!-- 标题 -->
                <h2>猜你喜欢</h2>
                <!-- 商品列表 -->
                <van-skeleton :row="8" :loading="loading">
                    <GoodsList :goodsList="guessYouLikeGoods" />
                </van-skeleton>
            </div>
        </main>
    </div>
</template>

<script>
// 引入vuex
import { mapState } from 'vuex';
// 引入API
import { saveHotGoods } from '@/api/goods';
// 引入商品列表 组件
import GoodsList from '@/components/goodsList.vue';

export default {
    name: 'Cart',
    components: {
        GoodsList,
    },
    data() {
        return {
            // 猜你喜欢 商品列表
            guessYouLikeGoods: JSON.parse(localStorage.getItem('guessYouLikeGoods') || null),
            // 骨架屏使用，是否加载中
            loading: true,
        };
    },
    computed: {
        ...mapState(['hotGoodsList']),
    },
    async created() {
        if (this.hotGoodsList === null || this.guessYouLikeGoods === null) {
            // 数据不存在，请求一次
            await saveHotGoods();
            // 过滤数据，并改为规定的键名
            this.guessYouLikeGoods = [];
            this.hotGoodsList.forEach(g => {
                let temp = {};
                temp.id = g.id;
                temp.name = g.name;
                temp.img = g.s_goods_photos[0].path;
                temp.price = g.price;
                temp.sold_num = g.sold_num;
                this.guessYouLikeGoods.push(temp);
            });
            // 保存到localStorage
            localStorage.setItem('guessYouLikeGoods', JSON.stringify(this.guessYouLikeGoods));
        }
        this.loading = false;
    },
};
</script>

<style lang="scss" scoped>
#cart {
    @include funpage(#e9ecf0);
    display: flex;
    flex-direction: column;

    // 标题栏
    header {
        flex-shrink: 0;
        border-bottom: vw(1) solid #e4e4e4;
    }

    // 主体
    main {
        flex: 1;


        // 空的购物车
        .noGoods {
            padding: vw(50) 0px;
            background-color: #fff;

            .nothing {
                display: flex;
                flex-direction: column;
                align-items: center;

                // 图片
                .nothingImg {
                    width: vw(128);
                    height: vw(84);
                    overflow: hidden;

                    >img {
                        width: 100%;
                    }
                }

                // 文字
                >h2 {
                    color: #555;
                    font-size: vw(14);
                    max-width: vw(750);
                    margin: vw(15) 0px vw(10);
                }


                // 按钮样式
                >button {
                    border: none;
                    outline: none;
                    width: vw(122);
                    height: vw(28);
                    border-radius: vw(14);
                    color: #fff;
                    font-size: vw(14);
                    font-weight: 700;
                    background-color: $theme-color;
                }
            }
        }

        // 猜你喜欢
        .guessYouLike {
            background-color: #fff;
            margin-top: vw(7.5);
            padding-bottom: vw(50);

            // 标题
            >h2 {
                font-size: vw(17.5);
                color: #555;
                padding: vw(15);
            }
        }
    }
}
</style>