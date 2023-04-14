<template>
    <!-- 新增收货地址 -->
    <div id="addAddress">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="新增收货地址" left-arrow @click-left="$router.back()" :border="false" />
        </div>

        <main>
            <van-address-edit :area-list="areaList" show-postal show-delete show-set-default
                :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
                @change-detail="onChangeDetail" />
        </main>
    </div>
</template>

<script>
// 引入vant省市区数据
import { areaList } from '@vant/area-data';
// 引入vant组件
import { Toast } from 'vant';
export default {
    name: 'AddAddress',
    data() {
        return {
            // 地址信息表单数据
            addressInfoForm: {
                name: '', // 收货人
                phone: '', // 手机号码
                area: '', // 地区ID集合
                area_name: '', // 地区地址的中文
                desc: '', // 详细地址
                post_code: '', // 邮编
            },
            // 地区列表
            areaList,
            // 是否作为默认地址
            isDefaultAddress: false,
        };
    },
    methods: {
        // 保存收货信息
        onSave(content) {
            console.log(content);
            Toast.success('保存成功');
        },
        // 删除收货信息
        onDelete() {
            Toast.success('删除成功');
        },
        // 修改详细地址信息
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [
                    {
                        name: '黄龙万科中心',
                        address: '杭州市西湖区',
                    },
                ];
            } else {
                this.searchResult = [];
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#addAddress {
    @include funpage();

    // 保存按钮
    ::v-deep .van-button--danger {
        background-color: #ee0a24;
        border: #ee0a24;
        color: #fff;
    }

    // 删除按钮
    ::v-deep .van-button--default {
        background-color: #fff;
        border: #fff;
        color: #333;
    }
}
</style>