<template>
    <div id="sort">
        <!-- 顶部搜索栏 -->
        <header>
            <!-- 搜索框 -->
            <div class="searchBox" @click="$router.push('/search')">
                <van-search shape="round" placeholder="搜索鲜花、蛋糕、礼品" />
            </div>
        </header>

        <!-- 主体 -->
        <main>
            <!-- 左 侧边栏 -->
            <aside>
                <!-- 导航条 -->
                <ul>
                    <template v-for="fstSort in allSortList">
                        <!-- 这里使用动态绑定和点击事件 -->
                        <!-- 通过分类ID和选中的ID对比，确定哪个类被激活 -->
                        <li :class="{ active: selectedSortID === fstSort.id }" @click="selectedSortID = fstSort.id">{{
                            fstSort.title }}</li>
                    </template>
                </ul>
            </aside>
            <!-- 右 内容 -->
            <div class="master">
                <!-- 图片 写死的 -->
                <div class="bannerImg">
                    <img src="@/assets/images/sort/banner.webp" alt="客户订花，体验至上">
                </div>
                <!-- 板块 -->
                <div class="part">
                    <h1>{{ selectedSort.title }}</h1>
                    <div class="partContent">
                        <van-grid :column-num="2" :border="false">
                            <!-- 这里对选中类的子集，进行v-for渲染 -->
                            <template v-for="scdSort in selectedSort.children">
                                <van-grid-item :text="scdSort.title" />
                            </template>
                        </van-grid>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
// 引入API 
import { saveAllSort } from '@/api/sort';
// 引入vuex
import { mapState } from 'vuex';

export default {
    name: 'Sort',
    data() {
        return {
            // 当前选中的分类 ID
            selectedSortID: 0,
        };
    },
    computed: {
        ...mapState(['allSortList']),

        // 选中顶级分类的子集分类
        selectedSort() {
            // 取出选中的顶级分类
            return this.allSortList.find(s => this.selectedSortID === s.id);
        },
    },
    async created() {
        if (this.allSortList === null) {
            // 如果没有数据，就请求一次
            await saveAllSort();
        }
        // 设置初始选中分类
        this.selectedSortID = this.allSortList[0].id;
    },
};
</script>

<style lang="scss" scoped>
#sort {
    @include funpage(#f1f3f6);
    display: flex;
    flex-direction: column;

    // 顶部搜索栏
    header {
        flex-shrink: 0;
        background-color: #fff;
        padding: vw(5) vw(10);
        margin-bottom: vw(2);

        .searchBox {

            // 搜索框样式
            .van-search {
                padding: 0;

                .van-cell {
                    height: vw(35);
                }
            }
        }
    }



    // 主体
    main {
        flex: 1;
        width: 100%;
        background-color: #fff;
        display: flex;

        // 侧边栏
        aside {
            flex-shrink: 0;
            width: vw(80);
            border-right: 1px solid #e9ecf0;

            // 导航条
            ul>li {
                text-align: center;
                color: #333;
                font-size: vw(14);
                border-left: 2px solid transparent;
                margin: vw(15) 0px;
                padding: vw(10);

                &.active {
                    color: $theme-color;
                    border-left-color: $theme-color;
                }
            }
        }

        // 内容
        .master {
            flex: 1;
            padding: vw(10) vw(10) 0px;

            // 图片
            .bannerImg {
                width: vw(274);
                height: vw(138);
                overflow: hidden;
                margin-bottom: vw(15);

                img {
                    width: 100%;
                }
            }

            // 板块
            .part {
                box-shadow: 0px 2px 6px 0px #e9ecf0;

                >h1 {
                    color: #555;
                    font-size: vw(16);
                    font-weight: 700;
                    padding: vw(8) 0px vw(5);
                }

                .partContent {
                    padding: vw(2.8);

                    // 宫格内容内边距
                    ::v-deep .van-grid-item__content {
                        padding-top: vw(10);
                        padding-bottom: vw(10);

                        // 宫格内文本
                        .van-grid-item__text {
                            font-size: vw(14);
                            color: #666;
                        }
                    }
                }


            }
        }
    }
}
</style>