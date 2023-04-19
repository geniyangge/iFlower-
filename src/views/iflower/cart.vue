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
            <!-- 有商品的 购物车商品栏 -->
            <div class="hasGoods" v-if="hasGoods">
                <!-- 商品列表 -->
                <div class="goodsList">
                    <!-- 复选框 组 -->
                    <van-checkbox-group v-model="selectedGoodsList" @change="checkedChange" ref="cartList">
                        <template v-for="good in cartGoodsList">
                            <!-- 每类商品卡片 -->
                            <div class="goodCard">
                                <!-- 单选框 -->
                                <div class="radio">
                                    <van-checkbox :name="good.id" shape="square" icon-size="3.7333vw" />
                                </div>
                                <!-- 商品图片 -->
                                <div class="goodImg">
                                    <img :src="good.img" :alt="good.name">
                                </div>
                                <!-- 商品信息 -->
                                <div class="goodInfo">
                                    <!-- 删除图标 -->
                                    <div class="deleteIcon">
                                        <van-icon name="delete-o" />
                                    </div>
                                    <!-- 商品名称 -->
                                    <h3>{{ good.name }}</h3>
                                    <!-- 商品数量 -->
                                    <p class="text num">数量：&nbsp;x&nbsp;<span>{{ good.num }}</span></p>
                                    <!-- 市场价 -->
                                    <p class="text price">市场价：&nbsp;<span>￥{{ good.price }}</span></p>
                                    <!-- 店铺价 -->
                                    <p class="text sale-price">店铺价：&nbsp;<span>￥{{ good.sale_price }}</span></p>
                                </div>
                            </div>
                        </template>
                    </van-checkbox-group>

                </div>
            </div>

            <!-- 空状态 购物车商品栏 -->
            <div class="noGoods" v-else>
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

            <!-- 猜你喜欢 -->
            <div class="guessYouLike">
                <!-- 标题 -->
                <h2>猜你喜欢</h2>
                <!-- 商品列表 -->
                <van-skeleton :row="8" :loading="skeleton_loading">
                    <GoodsList :goodsList="guessYouLikeGoods" />
                </van-skeleton>
            </div>

            <!-- 底部 去结算 -->
            <template v-if="hasGoods">
                <van-submit-bar :price="0" button-text="提交订单" @submit="">
                    <van-checkbox :value="allSelect" @change="selectAll">全选</van-checkbox>
                </van-submit-bar>
            </template>
        </main>
    </div>
</template>

<script>
// 引入vuex
import { mapState, mapMutations } from 'vuex';
// 引入API
import { saveHotGoods } from '@/api/goods';
import { getUserCartInfo } from '@/api/cart';
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
            skeleton_loading: true,
            // 购物车是否有商品
            hasGoods: false,
            // 购物车商品列表
            cartGoodsList: [],
            // 选中的商品 复选框
            selectedGoodsList: [],
        };
    },
    computed: {
        ...mapState(['hotGoodsList']),
        // 全选
        allSelect() {
            return this.selectedGoodsList.length === this.cartGoodsList.length;
        },
    },
    methods: {
        ...mapMutations(['showTabbar']),
        // 任意复选框状态改变时触发
        checkedChange(selectedList) {
            console.log(selectedList);
        },
        // 全选
        selectAll(bool) {
            // this.$refs.cartList.toggleAll(bool);
        },
    },
    async created() {
        // 获取购物车信息
        let [cartInfo, err] = await getUserCartInfo();
        if (err) return this.skeleton_loading = false;
        // console.log(cartInfo.result);
        // 判断购物车是否有商品
        this.hasGoods = cartInfo.result || false;

        // 保存购物车商品信息
        this.cartGoodsList = cartInfo.result.map(g => {
            let temp = {
                id: g.id,   // 购物车商品ID
                name: g.s_good.name,   // 购物车商品名称
                num: g.num,   // 购物车商品数量
                price: g.s_good.price,   // 购物车商品价格
                sale_price: g.s_good.sale_price,   // 购物车商品优惠价格
                img: g.s_good.s_goods_photos[0].path,   // 购物车商品图片
            };
            return temp;
        });
        // console.log(this.cartGoodsList);

        // 获取商品信息
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
        this.skeleton_loading = false;
    },
    beforeRouteEnter(to, from, next) {
        // 控制底部Tabbar隐藏
        next(vm => {
            vm.showTabbar(false);
        });
    },
    beforeRouteLeave(to, from, next) {
        // 控制底部Tabbar显示
        this.showTabbar(true);
        next();
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

        // 有商品的购物车
        .hasGoods {
            background-color: #fff;

            // 商品列表
            .goodsList {

                // 每类商品卡片
                .goodCard {
                    height: vw(134);
                    border-bottom: 1px solid #ccc;
                    padding: vw(15) vw(16) vw(20) vw(10);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    // 单选框
                    .radio {
                        flex-shrink: 0;
                        margin-right: vw(10);

                        // 复选框样式
                        ::v-deep .van-checkbox__icon .van-icon {
                            border-radius: 2px;
                            border-color: #767676;
                        }
                    }

                    // 商品图片
                    .goodImg {
                        flex-shrink: 0;
                        width: vw(134);
                        height: vw(134);
                        overflow: hidden;
                        margin-right: vw(10);

                        >img {
                            width: 100%;
                        }
                    }

                    // 商品信息
                    .goodInfo {
                        flex: 1;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: space-between;

                        // 删除图标
                        .deleteIcon {
                            align-self: flex-end;
                            margin-top: vw(10);
                            margin-bottom: vw(5);
                        }

                        // 商品名称
                        >h3 {
                            font-size: vw(16);
                            color: #333;
                            margin-bottom: vw(10);
                        }

                        // 商品数量
                        .text {
                            font-size: vw(14);
                            color: #555;

                            &.price>span {
                                color: #999;
                                text-decoration: line-through;
                            }

                            &.sale-price>span {
                                color: #ff2222;
                            }
                        }

                    }
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