<template>
    <!-- 修改密码页 -->
    <div id="changePassword">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="修改密码" left-arrow @click-left="$router.back()" :border="false" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangePassword',
};
</script>

<style lang="scss" scoped>
#changePassword {
    @include funpage(#E9ECF0);

    // 标题栏
    .title {
        border-bottom: 1px solid #e4e4e4;

        // 标题栏高度
        ::v-deep .van-nav-bar__content {
            height: vw(50);
        }
    }
}
</style>