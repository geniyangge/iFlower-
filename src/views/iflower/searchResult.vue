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
                    <li :class="{ active: chosedNav === 2 }" @click="getBySort(true)">
                        <p>价格</p>
                        <!-- 按价格排序 -->
                        <div class="priceSort">
                            <i class="up iconfont icon-xiangshang1" :class="{ sortUp: isSortUp }"></i>
                            <i class="down iconfont icon-xiangxia1" :class="{ sortDown: isSortDown }"></i>
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

            <!-- loading -->
            <div class="loading" v-if="loading">
                <van-loading type="spinner" color="#1989fa" />
            </div>
            <div v-if="!loading">
                <!-- 商品列表 -->
                <div class="production" v-if="renderGoods && renderGoods.length">
                    <!-- 触底加载列表 -->
                    <van-list :immediate-check="false" v-model="listLoading" :finished="listFinished" finished-text="没有更多了"
                        @load="onLoad">
                        <GoodsList :goodsList="renderGoods" round />
                    </van-list>
                </div>
                <!-- 没有商品 -->
                <div class="nothing" v-else>
                    <van-empty image="search" description="没有找到商品噢" />
                </div>
            </div>

            <!-- 筛选弹窗 -->
            <van-popup closeable close-icon-position="top-left" v-model="showPopup" position="right"
                :style="{ width: '80%', height: '100%' }">
                <!-- 分类 -->
                <div class="classfy">
                    <!-- 分类标题 -->
                    <div class="classfyTitle">
                        <h2>全部筛选</h2>
                    </div>
                    <!-- 分类内容 -->
                    <div class="classfyContent">
                        <template v-for="fstSort in allSortList">
                            <!-- 分类项目 -->
                            <div class="classfyItm">
                                <!-- 一级分类 -->
                                <div class="fstClassfy">
                                    <h3>{{ fstSort.title }}</h3>
                                </div>
                                <!-- 二级分类 -->
                                <div class="scdClassfy">
                                    <template v-for="scdSort in fstSort.children">
                                        <!-- title=友情鲜花&classifyID=3337 -->
                                        <div class="classfyBox" @click="searchBySort(scdSort)">
                                            <p>{{ scdSort.title }}</p>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </van-popup>
        </main>
    </div>
</template>

<script>
// 引入商品列表组件
import GoodsList from '@/components/goodsList.vue';
// 引入API
import { getGoodsList } from '@/api/goods';
import { saveAllSort } from '@/api/sort';
// 引入vuex
import { mapState } from 'vuex';

export default {
    components: {
        GoodsList,
    },
    data() {
        return {
            // 是否加载中
            loading: true,
            // 触底加载中
            listLoading: false,
            // 显示筛选框弹窗？
            showPopup: false,
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
            // 商品总数
            count: null,
            // 请求回来的商品列表
            goods: [],
            // 要渲染的商品列表
            renderGoods: [],
            // 请求商品列表配置项
            reqOption: {
                page: '1',  // 页码
                limit: '6', // 每页条数
                classify_id: this.$route.query.classifyID || '',   // 分类ID
                name: this.$route.query.key || '', // 模糊搜索关键词
            },
            // 价格升序？
            isSortUp: false,
            // 价格降序？
            isSortDown: false,
        };
    },
    computed: {
        ...mapState(['allSortList']),
        // 触底加载是否结束
        listFinished() {
            return this.goods.length === this.count;
        },
    },
    methods: {
        // 综合
        getByGeneral() {
            this.chosedNav = 0;
            // 拷贝原数据
            this.renderGoods = this._.cloneDeep(this.goods);
        },
        // 销量
        getBySales() {
            this.chosedNav = 1;

            // 根据销量进行排序
            this.renderGoods.sort((a, b) => {
                return b.sold_num - a.sold_num;
            });
        },
        // 价格
        getBySort(isChange) {
            this.chosedNav = 2;

            if (isChange) {
                // 切换升/降序模式，只在点击按钮时进行切换
                this.isSortDown = !this.isSortDown;
                this.isSortUp = !this.isSortDown;
            }

            // 价格升序
            if (this.isSortUp) {
                this.renderGoods.sort((a, b) => {
                    return a.price - b.price;
                });
            }
            // 价格降序
            if (this.isSortDown) {
                this.renderGoods.sort((a, b) => {
                    return b.price - a.price;
                });
            }
        },
        // 筛选
        toFilter() {
            this.showPopup = true;
        },
        // 排序
        sortGoods() {
            switch (this.chosedNav) {
                case 0: this.getByGeneral(); break;
                case 1: this.getBySales(); break;
                case 2: this.getBySort(); break;
                default: break;
            }
        },
        // 请求筛选后的商品列表
        async getGoods() {
            // 请求商品列表
            let [data, err] = await getGoodsList(this.reqOption);
            if (err) return this.loading = false;
            // 保存商品列表总数
            this.count = data.result.count;
            // 取出需要的数据
            let tempList = data.result.rows.map(g => {
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
            // 更新商品列表
            this.goods.push(...tempList);
            // 拷贝原数据 到渲染列表上
            this.renderGoods = this._.cloneDeep(this.goods);
            // 排序
            this.sortGoods();
        },
        // 触底触发请求
        async onLoad() {
            this.reqOption.page++;
            // 请求商品列表
            await this.getGoods();
        },
        // 点击分类信息，跳转到对应的分类商品列表
        searchBySort(scdSort) {
            this.$router.replace({ path: '/searchResult', query: { title: scdSort.title, classifyID: scdSort.id } });
            this.$router.go(0);
        },
    },
    async created() {
        // 获取商品列表
        await this.getGoods();

        // 获取所有分类信息
        if (localStorage.getItem('allSortList') === null) {
            // 如果数据不存在，就请求一次
            await saveAllSort();
        }

        this.loading = false;
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
                            &.sortUp,
                            &.sortDown {
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

        // 筛选弹窗
        .classfy {

            // 分类标题
            .classfyTitle {
                margin: vw(50) 0px vw(20);

                h2 {
                    text-align: center;
                    color: $theme-color;
                    font-size: vw(16);
                    font-weight: 700;
                }
            }

            // 分类内容
            .classfyContent {

                // 分类项目
                .classfyItm {
                    padding: 0px vw(14) vw(14);

                    // 一级分类
                    .fstClassfy {
                        margin-bottom: vw(10);

                        >h3 {
                            color: #555;
                            font-size: vw(14);
                            font-weight: 700;
                        }
                    }

                    // 二级分类
                    .scdClassfy {
                        padding-left: vw(4);
                        overflow: hidden;

                        // 内容盒子
                        .classfyBox {
                            float: left;
                            width: 31%;
                            background-color: #edf2f3;
                            border-radius: vw(8);
                            padding: vw(10) vw(12);
                            margin-bottom: vw(8);
                            box-sizing: border-box;

                            &:not(:nth-of-type(3n)) {
                                margin-right: 3%;
                            }

                            >p {
                                text-align: center;
                                color: #333;
                                font-size: vw(10);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>