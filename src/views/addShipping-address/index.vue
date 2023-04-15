<template>
    <!-- 收货地址 -->
    <div id="addAddress">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="新增收货地址" left-arrow @click-left="$router.back()" :border="false" />
        </div>

        <main>
            <van-address-edit :area-list="areaList" show-postal show-set-default
                :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" />
        </main>
    </div>
</template>

<script>
// 引入vant省市区数据
import { areaList } from '@vant/area-data';
// 引入vant组件
import { Toast } from 'vant';
// 引入vuex
import { mapState } from 'vuex';
// 引入API
import { addAddressAPI, getUserAddressList, setDefaultAddressAPI } from '@/api/address';

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
        };
    },
    computed: {
        ...mapState(['cityList']),
    },
    methods: {
        // 地区转码函数
        EncodeArea(options) {
            let { province, city, county } = options;
            // 剪切前两个字
            province = province.slice(0, 2);
            city = city.slice(0, 2);
            let provinceObj, cityObj, targetCounty;
            let result = '';
            // 依次遍历，先找省，再找市，最后确定区
            provinceObj = this.cityList.find(p => {
                return p.cityname.includes(province);
            });
            result += provinceObj.id + ',';

            cityObj = provinceObj.children.find(c => {
                return c.cityname.includes(city);
            });
            result += cityObj.id + ',';

            targetCounty = cityObj.children.find(t => {
                return t.cityname.includes(county);
            });
            result += targetCounty.id;
            // 返回结果，字符串，如"2,50,500"
            return result;
        },
        // 保存收货信息
        async onSave(content) {
            // console.log(content);
            this.addressInfoForm.name = content.name;
            this.addressInfoForm.phone = content.tel;
            this.addressInfoForm.area = this.EncodeArea(content);
            this.addressInfoForm.area_name = content.province + content.city + content.county;
            this.addressInfoForm.desc = content.addressDetail;
            this.addressInfoForm.post_code = content.postalCode;
            // 请求添加数据
            let [data, err] = await addAddressAPI(this.addressInfoForm);
            if (err) return;
            // console.log(data.result.id);
            // 提示
            Toast.success(data.msg);
            // 如果设置为默认收货地址
            if (content.isDefault) {
                // 设置成默认收货地址
                await setDefaultAddressAPI(data.result.id);
            }
            // 重新请求收货列表
            await getUserAddressList();
            // 跳转到收货地址列表页
            this.$router.replace('/address');
        },
    },
};
</script>

<style lang="scss" scoped>
#addAddress {
    @include funpage();

    // 保存按钮
    ::v-deep .van-button--danger {
        height: vw(38);
        background-color: $theme-color;
        border: $theme-color;
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