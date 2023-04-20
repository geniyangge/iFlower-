<template>
    <!-- 商品搜索结果页 -->
    <div id="searchResult">
        <!-- 标题栏 -->
        <header>
            <!-- 标题栏 -->
            <van-nav-bar :title="title" @click-left="$router.back()" :border="false">
                <template #left>
                    <van-icon name="arrow-left" size="5.8667vw" color="#555" />
                </template>
            </van-nav-bar>
        </header>

        <!-- 主体 -->
        <main>
            <!-- 筛选栏 -->
            <div class="filter">
                <ul>
                    <li :class="{ active: chosedNav === 0 }" @click="getByGeneral">
                        <p>综合</p>
                    </li>
                    <li :class="{ active: chosedNav === 1 }" @click="getBySales">
                        <p>销量</p>
                    </li>
                    <li :class="{ active: chosedNav === 2 }" @click="getBySort">
                        <p>价格</p>
                        <!-- 按价格排序 -->
                        <div class="priceSort">
                            <i class="up iconfont icon-xiangshang1"></i>
                            <i class="down iconfont icon-xiangxia1"></i>
                        </div>
                    </li>
                    <li :class="{ active: chosedNav === 3 }" @click="toFilter">
                        <!-- 筛选按钮 -->
                        <div class="filterBtn">
                            <p>筛选</p>
                            <i class="iconfont icon-shaixuan"></i>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="loading" v-if="loading">
                <van-loading type="spinner" color="#1989fa" />
            </div>
            <div v-if="!loading">
                <!-- 商品列表 -->
                <div class="production" v-if="goods && goods.length">
                    <GoodsList :goodsList="goods" round />
                </div>
                <!-- 没有商品 -->
                <div class="nothing" v-else>
                    <van-empty image="search" description="没有找到商品噢" />
                </div>
            </div>
        </main>
    </div>
</template>

<script>
// 引入商品列表组件
import GoodsList from '@/components/goodsList.vue';
// 引入API
import { getGoodsList } from '@/api/goods';

export default {
    components: {
        GoodsList,
    },
    data() {
        return {
            // 是否加载中
            loading: false,
            /**
             * 判断点击了筛选栏哪一项
             * 0：综合
             * 1：销量
             * 2：价格
             * 3：筛选
             */
            chosedNav: 0,
            // 标题
            title: this.$route.query.title,
            // 要渲染的商品列表
            goods: [],
            // 模糊搜索关键词
            key: this.$route.query.key || '',
            // 分类ID
            classifyID: this.$route.query.classifyID || '',
        };
    },
    methods: {
        // 综合
        getByGeneral() {
            this.chosedNav = 0;
        },
        // 销量
        getBySales() {
            this.chosedNav = 1;
        },
        // 价格
        getBySort() {
            this.chosedNav = 2;
        },
        // 筛选
        toFilter() {
        },
        // 获取筛选后的商品列表
        async getGoods() {
            this.loading = true;
            // 配置项
            let option = {
                page: '1',
                limit: '10',
                classify_id: this.classifyID,
                name: this.key,
            };
            // 请求商品列表
            let [data, err] = await getGoodsList(option);
            if (err) return this.loading = false;

            // 取出需要的数据
            this.goods = data.result.rows.map(g => {
                // 筛选出数据
                let temp = {};
                temp.id = g.id;
                temp.name = g.name;
                temp.img = g.s_goods_photos[0].path;
                temp.price = g.price;
                temp.sold_num = g.sold_num;

                // 返回数据
                return temp;
            });
            this.loading = false;
        },
    },
    async created() {
        // 获取商品列表
        this.getGoods();
    },
};
</script>

<style lang="scss" scoped>
#searchResult {
    @include funpage(#e9ecf0);
    display: flex;
    flex-direction: column;

    // 标题
    header {
        flex-shrink: 0;

        // navbar样式
        ::v-deep .van-nav-bar__content {
            height: vw(55);
        }
    }

    // 主体
    main {
        flex: 1;

        // 筛选栏
        .filter {
            height: vw(40);
            background-color: #fff;

            >ul {
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 100%;

                >li {
                    display: flex;
                    align-items: center;

                    // 激活态
                    &.active {
                        >p {
                            color: $theme-color;
                        }
                    }

                    >p {
                        font-size: vw(14);
                        color: #333;
                    }

                    // 按价格排序
                    .priceSort {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-left: vw(2);

                        >i {
                            font-size: vw(12);

                            // 升序
                            &.up {
                                margin-bottom: vw(-5);
                                color: #999;
                            }

                            // 降序
                            &.down {
                                color: #999;
                            }

                            // 升序，降序图标 颜色加深
                            &.sort {
                                color: $theme-color;
                            }
                        }
                    }

                    // 筛选按钮
                    .filterBtn {
                        width: vw(60);
                        background-color: #f7f9fa;
                        padding: vw(5) vw(3.75);
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        >p {
                            font-size: vw(12);
                            color: #555;
                            margin-right: vw(2);
                        }

                        >i {
                            font-size: vw(16);
                            color: #555;
                        }
                    }
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

        // 商品列表
        .production {
            margin-top: vw(10);
        }

        // 空状态
        .nothing {
            margin-top: vw(10);
            background-color: #fff;
            box-shadow: 0px 0px vw(20) vw(10) #fff;
        }
    }
}
</style>