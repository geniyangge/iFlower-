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

        <!-- loading -->
        <div class="loading" v-if="loading">
            <van-loading type="spinner" color="#1989fa" />
        </div>

        <!-- 主体 -->
        <main v-else>
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
                                    <van-checkbox :name="good.id" shape="square" icon-size="3.7333vw"
                                        :disabled="good.stock_num === 0" :bind-group="good.stock_num" />
                                </div>
                                <!-- 商品图片 -->
                                <div class="goodImg">
                                    <van-image :src="good.img" :alt="good.name" />
                                </div>
                                <!-- 商品信息 -->
                                <div class="goodInfo">
                                    <!-- 删除图标 -->
                                    <div class="deleteIcon">
                                        <van-icon name="delete-o" @click="deleteItem(good.id)" />
                                    </div>
                                    <!-- 商品名称 -->
                                    <h3>{{ good.name }}<span v-if="good.stock_num === 0"
                                            style="color: red;font-size: 12px;">（已售罄）</span>
                                    </h3>
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
                    <button @click="$router.push('/')">去逛逛</button>
                </div>
            </div>

            <!-- 猜你喜欢 -->
            <div class="guessYouLike">
                <!-- 标题 -->
                <h2>猜你喜欢</h2>
                <!-- 商品列表 -->
                <GoodsList :goodsList="guessYouLikeGoods" />
            </div>
        </main>

        <!-- 底部 去结算 -->
        <template v-if="hasGoods">
            <van-submit-bar :price="totalPrice" :button-text="'去结算(' + total + ')'" @submit="onSubmit">
                <van-checkbox v-model="allSelect">全选</van-checkbox>
            </van-submit-bar>
        </template>
    </div>
</template>

<script>
// 引入vuex
import { mapState, mapMutations, mapActions } from 'vuex';
// 引入API
import { saveHotGoods } from '@/api/goods';
import { getUserCartInfo, deleteCartGood } from '@/api/cart';
// 引入商品列表 组件
import GoodsList from '@/components/goodsList.vue';

export default {
    name: 'Cart',
    components: {
        GoodsList,
    },
    data() {
        return {
            // loading
            loading: true,
            // 猜你喜欢 商品列表
            guessYouLikeGoods: JSON.parse(localStorage.getItem('guessYouLikeGoods') || null),
            // 购物车商品列表
            // cartGoodsList: [],
            // 选中的商品 复选框
            selectedGoodsList: [],
            // 选中商品总价
            totalPrice: 0,
            // 选中商品种类数量
            total: 0,
        };
    },
    computed: {
        ...mapState(['userInfo', 'hotGoodsList', 'cartGoodsList']),
        // 购物车是否有商品
        hasGoods() {
            let hasGoods = Boolean(this.cartGoodsList.length);
            // 根据购物车是否存在商品，来控制Tabbar的隐藏和显示
            this.showTabbar(!hasGoods);
            return hasGoods;
        },
        // 全选
        allSelect: {
            set(bool) {
                this.$refs.cartList.toggleAll(bool);
            },
            get() {
                // 缺货商品数量
                let stockoutNum = this.cartGoodsList.reduce((a, b) => {
                    if (b.stock_num === 0) return a + 1;
                    return a;
                }, 0);
                return this.cartGoodsList.length - stockoutNum === this.selectedGoodsList.length;
            },
        },
    },
    methods: {
        ...mapActions(['getCartGoodsList']),
        ...mapMutations(['showTabbar']),
        // 任意复选框状态改变时触发
        checkedChange(selectedList) {
            // console.log('iflower/cart.vue', selectedList);
            // 计算选中商品总价及数量
            // 商品总价 单位：分
            this.totalPrice = this.cartGoodsList.reduce((a, b) => {
                if (selectedList.includes(b.id)) {
                    return a + b.num * b.sale_price;
                } else {
                    return a;
                }
            }, 0);
            // 因为vant组件里单位是(分)，所以要乘以100
            this.totalPrice *= 100;
            // 商品数量
            this.total = this.selectedGoodsList.length;
            // console.log(selectedList);
        },
        // 删除购物车中的商品
        async deleteItem(id) {
            this.$dialog.confirm({
                message: '确定删除该商品？',
            })
                .then(async () => {
                    let [data, err] = await deleteCartGood(id);
                    if (err) return;
                    this.$toast.success('删除成功');
                    // 请求新的购物车商品数据
                    await this.getCartGoodsList();
                    // 刷新页面
                    // this.$router.go(0);
                })
                .catch(() => {
                });
        },
        // 去结算
        onSubmit() {
            if (!this.selectedGoodsList.length) return this.$toast.fail('请选择商品');
            // console.log(this.selectedGoodsList);
            // console.log(this.cartGoodsList);
            // 获取需要结算的商品列表
            /**
             * 1.根据API要求的格式，取出选中商品的 数量、商品id、购物车id作为一个对象，归到一个数组中
             * settlementGoods === [
             *      {
             *          num: 1,     // 数量
             *          id: 12,     // 商品id
             *          shoppingCartIds: 123,  // 购物车id
             *      }
             * ]
             * 
             * 2.然后携带选购的商品数组，跳转到订单结算页面
             */
            let goodsInfo = this.cartGoodsList
                .filter(g => {
                    return this.selectedGoodsList.includes(g.id);
                })
                .map(g => {
                    return {
                        num: g.num,     // 数量
                        id: String(g.goods_id),     // 商品id
                        shoppingCartIds: String(g.id),  // 购物车id
                    };
                });
            // 携带需要结算的商品列表，跳转至商品结算页
            this.$router.push({ path: '/clearing', query: { goodsInfo: JSON.stringify(goodsInfo) } });
            // console.log(goodsInfo);
        },
    },
    async created() {
        // 获取购物车商品列表
        if (this.userInfo && sessionStorage.getItem('cartGoodsList') === null) {
            // 如果数据不存在，请求一次
            await this.getCartGoodsList();
        }

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

        this.loading = false;
    },
    beforeRouteEnter(to, from, next) {
        // 控制底部Tabbar隐藏
        next(vm => {
            if (vm.hasGoods) {
                vm.showTabbar(false);
            } else {
                vm.showTabbar(true);
            }
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

    // 加载中
    .loading {
        width: 100%;
        height: 40vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>