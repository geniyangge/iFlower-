<template>
    <div id="home">
        <!-- 顶部title -->
        <header>
            <van-nav-bar :border="false" @click-left="onClickLeft">
                <template #left>
                    <i class="iconfont icon-sousuo"></i>
                </template>
                <template #title>
                    <img class="logo" src="@/assets/images/logo.webp" alt="logo" />
                </template>
            </van-nav-bar>
        </header>

        <!-- 内容部分 -->
        <main>
            <!-- 上部分 -->
            <div class="theHead">
                <!-- 轮播图 -->
                <van-skeleton :row="6" :loading="loading">
                    <div class="swiper">
                        <van-swipe :autoplay="3000">
                            <van-swipe-item v-for="(image, index) in swiperList" :key="index">
                                <van-image :src="image" />
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                </van-skeleton>


                <!-- 评价 -->
                <div class="evaluate">
                    <van-grid direction="horizontal" :column-num="4" :border="false" icon-size="3.2vw">
                        <van-grid-item icon="checked" text="品牌鲜花网" />
                        <van-grid-item icon="checked" text="实拍秀" />
                        <van-grid-item icon="checked" text="1小时送达" />
                        <van-grid-item icon="checked" text="50w+好评" />
                    </van-grid>
                </div>

                <!-- 分类 -->
                <div class="sort">
                    <van-grid :column-num="5" :border="false" clickable>
                        <template v-for="item in sortList">
                            <van-grid-item :text="item.title"
                                :to="{ name: 'SearchResult', query: { title: item.title, classifyID: item.classifyID } }">
                                <template #icon>
                                    <img :src="item.img" :alt="item.title">
                                </template>
                            </van-grid-item>
                        </template>
                    </van-grid>
                </div>
            </div>

            <!-- 中部分 -->
            <div class="theMiddle">
                <!-- 一秒选花 -->
                <h2>一秒选花</h2>
                <!-- 内容 -->
                <div class="selectFlowrer">
                    <!-- 上 三列 -->
                    <div class="toPeopleBox">
                        <template v-for="item in toPeopleList">
                            <div class="toPeople"
                                @click="$router.push({ name: 'SearchResult', query: { title: item.title, classifyID: item.classifyID } })">
                                <!-- 图片 -->
                                <img :src="item.img" :alt="item.title">
                                <!-- 文本块 绝对定位在底部 -->
                                <div class="toPeopleText" :style="`background-color: ${item.titleBgc};`">
                                    <h3>{{ item.title }}</h3>
                                </div>
                            </div>
                        </template>
                    </div>
                    <!-- 下 四列 -->
                    <div class="toSceneBox">
                        <template v-for="item in toSceneList">
                            <!-- 文本块 -->
                            <div class="toScene"
                                @click="$router.push({ name: 'SearchResult', query: { title: item.title, classifyID: item.classifyID } })">
                                <div class="toSceneText">
                                    <h3>{{ item.title }}</h3>
                                </div>
                                <!-- 图片 -->
                                <div class="toSceneImg">
                                    <img :src="item.img" :alt="item.title">
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <!-- 下部分 -->
            <div class="theMain">
                <template v-for="sort in sortGoodsList">
                    <!-- 板块 -->
                    <div class="part">
                        <!-- 板块标题 -->
                        <div class="pratTitle">
                            <h2>{{ sort.title }}</h2>
                            <!-- 下划线 -->
                            <span></span>
                        </div>
                        <!-- 板块内容盒子 -->
                        <div class="partContent">
                            <template v-for="good in sort.goods">
                                <!-- 商品列表 -->
                                <div class="product" @click="$router.push({ name: 'Details', query: { id: good.id } })">
                                    <!-- 商品图片 -->
                                    <div class="productImg">
                                        <img :src="good.img" :alt="good.name">
                                    </div>
                                    <!-- 商品描述 -->
                                    <div class="productDesc">
                                        <h2>{{ good.name }}</h2>
                                        <div class="productText">
                                            <p class="price">￥{{ good.price }}</p>
                                            <p class="sales">销量{{ good.sold_num }}笔</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <!-- 查看更多 -->
                        <div class="lookMore">
                            <div class="more" @click="toGoodDesc(sort)">
                                <h2>查看更多</h2>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </main>

        <!-- 底部信息 -->
        <footer>
            <div class="ICP">
                <p>Copyright&copy;2023 geniyangge</p>
                <a href="https://beian.miit.gov.cn/">粤ICP备2023023815号</a>
            </div>
        </footer>
    </div>
</template>

<script>
// 引入API
import { saveSwiperList } from '@/api/swiper';
import { saveSortGoods } from '@/api/sort';
// 引入vuex
import { mapState } from 'vuex';

export default {
    name: "Home",
    data() {
        return {
            // 骨架屏用
            loading: true,
            // 分类栏图标和文字
            sortList: [
                {
                    title: '花束',
                    classifyID: '3236',
                    img: require('@/assets/images/home/huashu.webp'),
                },
                {
                    title: '礼盒',
                    classifyID: '3240',
                    img: require('@/assets/images/home/lihe.webp'),
                },
                {
                    title: '蛋糕',
                    classifyID: '3237',
                    img: require('@/assets/images/home/dangao.webp'),
                },
                {
                    title: '花篮',
                    classifyID: '3238',
                    img: require('@/assets/images/home/hualan.webp'),
                },
                {
                    title: '绿植',
                    classifyID: '3239',
                    img: require('@/assets/images/home/lvzhi.webp'),
                },
            ],
            // 一秒选花
            // 送花对象
            toPeopleList: [
                {
                    title: '送恋人',
                    classifyID: '3236',
                    img: require('@/assets/images/home/1.webp'),
                    titleBgc: '#ffafb2',
                },
                {
                    title: '送长辈',
                    classifyID: '3240',
                    img: require('@/assets/images/home/2.webp'),
                    titleBgc: '#7eb254',
                },
                {
                    title: '送亲友',
                    classifyID: '3241',
                    img: require('@/assets/images/home/3.webp'),
                    titleBgc: '#f1bf93',
                },
            ],
            // 送花场景
            toSceneList: [
                {
                    title: '生日祝福',
                    classifyID: '3237',
                    img: require('@/assets/images/home/4.webp'),
                },
                {
                    title: '求婚表白',
                    classifyID: '3236',
                    img: require('@/assets/images/home/5.webp'),
                },
                {
                    title: '商务开业',
                    classifyID: '3238',
                    img: require('@/assets/images/home/6.webp'),
                },
                {
                    title: '装饰绿植',
                    classifyID: '3239',
                    img: require('@/assets/images/home/7.webp'),
                },
            ],
            // 需要渲染的分类商品列表
            goodsList: [],
        };
    },
    computed: {
        ...mapState(['swiperList', 'sortGoodsList']),
    },
    methods: {
        // 点击标题栏的搜索图标
        onClickLeft() {
            // 跳转到搜索页
            this.$router.push('/search');
        },
        // 点击查看更多，跳转到搜索结果页
        toGoodDesc(sort) {
            this.$router.push({ path: '/searchResult', query: { title: sort.title, classifyID: sort.id } });
        },
    },
    async created() {
        if (this.swiperList === null) {
            // 如果数据不存在就请求一次
            // 请求轮播图图片数据
            await saveSwiperList();
        }
        if (this.sortGoodsList === null) {
            // 如果数据不存在就请求一次
            // 请求分类与商品列表数据
            await saveSortGoods();
        }
        // 要渲染的商品数量
        this.goodsList = this.sortGoodsList.map(s => {
            // 渲染的商品数量，（0，2）表示渲染两个
            s.goods = s.goods.slice(0, 8);
            return s;
        });
        this.loading = false;
    },
};
</script>

<style lang="scss" scoped>
#home {
    @include funpage(#f6f6f6);

    // 标题栏
    header {

        // 顶部标题栏高度
        ::v-deep .van-nav-bar__content {
            height: vw(50);
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

    // 内容部分
    main {

        // 上部分
        .theHead {
            background-color: #fff;

            // 轮播图
            .swiper {
                height: vw(190);

                img {
                    width: 100vw;
                    height: vw(190);
                    object-fit: cover;
                }
            }

            // 评价
            .evaluate {

                // 宫格 整体内边距
                .van-grid {
                    padding: 0px vw(10);
                    // 图标颜色
                    color: #555555;
                }

                // 宫格 内边距
                ::v-deep .van-grid-item__content {
                    padding: vw(6) vw(5);
                }

                // 宫格 文本外边距
                ::v-deep .van-grid-item__text {
                    margin-left: vw(4);
                    color: #555555;
                }
            }

            // 分类
            .sort {
                padding: vw(10) 0px;

                // 内边距
                ::v-deep .van-grid-item__content {
                    padding: 0;
                }

                // 文本
                ::v-deep .van-grid-item__text {
                    color: #333;
                    font-size: vw(14);
                }

                img {
                    height: vw(40);
                    width: vw(40);
                    object-fit: cover;
                }
            }
        }

        // 中部分
        .theMiddle {
            background-color: #fff;
            margin-top: vw(10);
            padding: vw(10);

            // 一秒选花
            >h2 {
                position: relative;
                font-size: vw(15);
                font-weight: 700;
                line-height: vw(15);
                color: $theme-color;
                border-left: 1.5px solid $theme-color;
                padding-left: vw(12);
            }

            // 内容
            .selectFlowrer {

                // 上面三列
                .toPeopleBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: vw(10);

                    // 每一列
                    .toPeople {
                        position: relative;
                        width: 29.5vw;
                        height: vw(126);
                        border-radius: 8px;
                        overflow: hidden;

                        >img {
                            width: 100%;
                        }

                        // 文本块
                        .toPeopleText {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: vw(30);
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            >h3 {
                                font-size: vw(14);
                                color: #fff;
                                font-weight: 700;
                            }
                        }
                    }
                }

                // 下面四列
                .toSceneBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: vw(10) 0px;

                    // 每一列
                    .toScene {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;
                        width: vw(85);
                        background-color: #f3ebe3;
                        border-radius: 4px;

                        // 文本块
                        .toSceneText {
                            padding: vw(10) 0px vw(5) 0px;

                            >h3 {
                                height: vw(18);
                                line-height: vw(18);
                                font-size: vw(14);
                                font-weight: 700;
                                color: $theme-color;
                            }
                        }

                        // 图片
                        .toSceneImg {
                            width: vw(68);
                            height: vw(68);
                            overflow: hidden;
                            margin-bottom: vw(5);

                            >img {
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }

        // 下部分
        .theMain {
            background-color: #fff;
            margin-top: vw(10);
            padding: vw(15) 0;

            // 板块
            .part {
                margin-top: vw(14);

                // 板块标题
                .pratTitle {
                    position: relative;
                    height: vw(30);

                    >h2 {
                        font-size: vw(15);
                        font-weight: 700;
                        color: #555;
                        text-align: center;
                    }

                    // 下划线
                    >span {
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: vw(80);
                        height: vw(4);
                        border-radius: 4px;
                        background-color: $theme-color;
                    }
                }

                // 板块内容盒子
                .partContent {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    padding: 0px vw(15);

                    // 商品列表
                    .product {
                        flex-shrink: 0;
                        width: vw(165);
                        margin-top: vw(15);

                        // 商品图片
                        .productImg {
                            width: vw(165);
                            height: vw(165);
                            overflow: hidden;

                            >img {
                                width: 100%;
                            }
                        }

                        // 商品描述
                        .productDesc {
                            >h2 {
                                color: #666;
                                font-size: vw(14);
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin: vw(5) 0px;
                            }

                            .productText {
                                display: flex;
                                justify-content: space-between;
                                align-items: flex-end;
                                height: vw(18);

                                >p.price {
                                    color: #ff4433;
                                    font-size: vw(14);
                                    font-weight: 700;
                                }

                                >p.sales {
                                    color: #999;
                                    font-size: vw(12);
                                    font-weight: 400;
                                }
                            }
                        }
                    }
                }

                // 查看更多
                .lookMore {
                    margin-top: vw(20);

                    .more {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: vw(70);
                        height: vw(24);
                        border: 1px solid #999;
                        margin: 0 auto;

                        h2 {
                            font-size: vw(12);
                            color: #999;
                        }
                    }
                }
            }
        }
    }

    // 底部信息
    footer {
        background-color: #fff;
        margin-top: vw(10);
        padding: vw(25) 0px vw(15) 0px;

        .ICP {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            >p {
                font-size: vw(12);
                font-weight: 400;
                line-height: vw(20);
                color: #999;
            }

            >a {
                font-size: vw(12);
                font-weight: 400;
                line-height: vw(20);
                color: #999;
            }
        }
    }
}
</style>