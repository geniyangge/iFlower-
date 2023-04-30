<template>
    <!-- 封装一个虚拟列表 -->
    <!-- 可视区域的容器 -->
    <div class="infinite-list-container" ref="virtualList" @scroll="scrollEvent($event)">
        <!-- 容器内的占位，高度为总列表高度，用于形成滚动条 -->
        <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
        <!-- 列表项的渲染区域 -->
        <div class="infinite-list" :style="{ transform: getTransform }">
            <GoodsList :goodsList="renderList" :useVanImage="false" round />
        </div>
    </div>
</template>

<script>
// 引入商品列表组件
import GoodsList from '@/components/goodsList.vue';

export default {
    components: {
        GoodsList,
    },
    data() {
        return {
            //可视区域高度
            screenHeight: 0,
            //偏移量
            startOffset: 0,
            //起始索引
            start: 0,
            //结束索引
            end: null,
        };
    },
    props: {
        // 列表数据
        listData: {
            type: Array,
            default: () => [],
        },
        // 每项高度
        itemHeight: {
            type: Number,
            default: 200,
        },
        // 每行显示几个
        colNum: {
            type: Number,
            default: 1,
        },
    },
    computed: {
        // 虚拟列表高度
        listHeight() {
            return this.listData.length / this.colNum * this.itemHeight;
        },
        //可显示的列表项数
        visibleCount() {
            return Math.ceil(this.screenHeight / this.itemHeight) * this.colNum;
        },
        // 真实渲染的数据
        renderList() {
            return this.listData.slice(this.start, Math.min(this.end, this.listData.length));
        },
        //偏移量对应的style
        getTransform() {
            return `translate3d(0,${this.startOffset}px,0)`;
        },
    },
    methods: {
        scrollEvent() {
            //当前滚动位置
            let scrollTop = this.$refs.virtualList.scrollTop;
            //此时的开始索引
            this.start = Math.floor(scrollTop / this.itemHeight) * this.colNum;
            //此时的结束索引
            this.end = this.start + this.visibleCount;
            //此时的偏移量
            this.startOffset = scrollTop - (scrollTop % this.itemHeight);
        }
    },
    mounted() {
        this.screenHeight = this.$el.clientHeight;
        this.start = 0;
        this.end = this.start + this.visibleCount;
    },
};
</script>

<style lang="scss" scoped>
.infinite-list-container {
    position: relative;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    // background-color: skyblue;
}

.infinite-list-phantom {
    position: absolute;
    // inset: 0 0 auto 0;
    left: 0;
    top: 0;
    width: 100%;
    z-index: -1;
    // background-color: rgba(pink, 0.5);
}

.infinite-list {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    // text-align: center;
}
</style>