<template>
    <!-- 搜索页 -->
    <div id="search">
        <!-- 顶部搜索栏 -->
        <header>
            <div class="search">
                <!-- 箭头 -->
                <div class="arrow" @click="$router.back()">
                    <van-icon name="arrow-left" size="5.8667vw" />
                </div>

                <!-- 搜索框 -->
                <div class="searchBox">
                    <van-search v-model="searchValue" shape="round" placeholder="爱情鲜花" />
                </div>

                <!-- 搜索按钮 -->
                <div class="searchBtn" @click="search">
                    <van-button round type="info">搜索</van-button>
                </div>
            </div>
        </header>

        <!-- 内容 -->
        <main>
            <h2>热门商品</h2>
            <!-- 关键词 -->
            <div class="keys">
                <template v-for="hot in hotGoodsList">
                    <div class="key">
                        <p>{{ hot.name }}</p>
                    </div>
                </template>
            </div>
        </main>
    </div>
</template>

<script>
// 引入API
import { saveHotGoods } from '@/api/goods';
// 引入vuex 
import { mapState } from 'vuex';

export default {
    name: 'Search',
    data() {
        return {
            searchValue: '',
        };
    },
    computed: {
        ...mapState(['hotGoodsList']),
    },
    methods: {
        // 搜索
        search() {
            if (!this.searchValue.trim()) {
                // 如果未输入内容，则默认搜索爱情鲜花
                this.searchValue = '爱情鲜花';
            }
            // 携带搜索信息，跳转到搜索结果页
            this.$router.push({ name: 'SearchResult', query: { key: this.searchValue, title: this.searchValue } });
        }
    },
    async created() {
        if (this.hotGoodsList === null) {
            // 如果热门商品列表不存在，就请求一次
            await saveHotGoods();
        }
    },
};
</script>

<style lang="scss" scoped>
#search {
    @include funpage(#f1f3f6);
    display: flex;
    flex-direction: column;

    // 顶部搜索栏
    header {
        flex-shrink: 0;
        background-color: #fff;
        margin-bottom: vw(2);
        padding: vw(5) vw(8);

        // 搜索栏
        .search {
            height: vw(35);
            display: flex;
            justify-content: space-between;
            align-items: center;

            // 箭头
            .arrow {
                flex-shrink: 0;
                padding-right: vw(10);
            }

            // 搜索框
            .searchBox {
                flex: 1;

                // 搜索框样式
                .van-search {
                    padding: 0;

                    .van-cell {
                        height: vw(35);
                    }
                }
            }

            // 搜索按钮
            .searchBtn {
                flex-shrink: 0;
                padding-left: vw(4);

                .van-button {
                    height: vw(28);
                    width: vw(60);
                    border: none;
                    background-color: #ff734c;
                }
            }
        }
    }

    // 内容
    main {
        flex: 1;
        background-color: #fff;
        padding: vw(15);

        >h2 {
            font-size: vw(14);
            line-height: vw(20);
            color: #555;
            padding: vw(5) 0px;
        }

        // 关键词
        .keys {
            overflow: hidden;

            .key {
                float: left;
                background-color: #e9ecf0;
                padding: vw(7.5);
                margin: 0px vw(10) vw(10) 0px;

                >p {
                    font-size: vw(13);
                    color: #555;
                }
            }
        }
    }
}
</style>