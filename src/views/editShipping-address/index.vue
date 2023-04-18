<template>
    <!-- 收货地址 -->
    <div id="editAddress">
        <!-- 标题栏 -->
        <div class="title">
            <van-nav-bar title="编辑收货地址" left-arrow @click-left="$router.back()" :border="false" />
        </div>

        <main>
            <van-address-edit :address-info="initAddressInfo" :area-list="areaList" show-postal show-delete show-set-default
                :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
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
import { updateUserAddressAPI, getUserAddressList, setDefaultAddressAPI, deleteUserAddresssAPI } from '@/api/address';

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
            // 当前数据id
            id: '',
            // 地区列表
            areaList,
            // 展示的初始收货地址信息
            initAddressInfo: {},
        };
    },
    computed: {
        ...mapState(['cityList']),
    },
    created() {
        // console.log(this.areaList);
        // 获取收货信息初值
        this.addressInfoForm = this.$route.params.item;
        this.id = this.$route.params.item.id;
        // 配置需要展示的初值
        // console.log(this.addressInfoForm);
        this.initAddressInfo.name = this.addressInfoForm.name;
        this.initAddressInfo.tel = this.addressInfoForm.phone;
        this.initAddressInfo.addressDetail = this.addressInfoForm.desc;
        this.initAddressInfo.postalCode = this.addressInfoForm.post_code;
        this.initAddressInfo.isDefault = this.$route.params.isDefault;
        this.initAddressInfo.areaCode = this.DecodeArea(this.addressInfoForm.area_code);
    },
    methods: {
        // 地区转码函数<--vantCode
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
        // 地区转码-->vantCode
        DecodeArea(str) {
            let idList = str.split(',');
            // console.log(idList);
            let provinceObj, cityObj, target;
            /* 先根据源地址码，获取地址的字符串形式 */
            let citynameList = [];
            // 省
            provinceObj = this.cityList.find(p => p.id == idList[0]);
            citynameList.push(provinceObj.cityname.slice(0, 2));
            // 市
            cityObj = provinceObj.children.find(c => c.id == idList[1]);
            citynameList.push(cityObj.cityname.slice(0, 2));
            // 县
            target = cityObj.children.find(t => t.id == idList[2]);
            citynameList.push(target.cityname);

            /* 再根据地址字符串，反查this.areaList中对应的地址码 */
            let cityKey = [];
            // 省
            for (let k in this.areaList.province_list) {
                if (this.areaList.province_list[k].includes(citynameList[0])) {
                    cityKey.push(k.slice(0, 2));
                    break;
                }
            }
            // 市
            for (let k in this.areaList.city_list) {
                if (k.slice(0, 2) === cityKey[0] && this.areaList.city_list[k].includes(citynameList[1])) {
                    cityKey.push(k.slice(2, 4));
                    break;
                }
            }
            // 县
            for (let k in this.areaList.county_list) {
                if (k.slice(0, 2) === cityKey[0] && k.slice(2, 4) === cityKey[1] && this.areaList.county_list[k].includes(citynameList[2])) {
                    cityKey.push(k.slice(4, 6));
                    break;
                }
            }
            // 最后获得的cityKey.join("")，就是转译的地址码
            // console.log(cityKey);
            return cityKey.join("");
        },
        // 保存修改的收货信息
        async onSave(content) {
            // console.log(content);
            this.addressInfoForm.name = content.name;
            this.addressInfoForm.phone = content.tel;
            this.addressInfoForm.area_code = this.EncodeArea(content);
            this.addressInfoForm.area_name = content.province + content.city + content.county;
            this.addressInfoForm.desc = content.addressDetail;
            this.addressInfoForm.post_code = content.postalCode;
            // 请求添加数据
            let [data, err] = await updateUserAddressAPI(this.id, this.addressInfoForm);
            if (err) return;
            // console.log(data);
            // 提示
            Toast.success(data.msg);
            // 如果设置为默认收货地址
            if (content.isDefault) {
                // 设置成默认收货地址
                await setDefaultAddressAPI(this.id);
            }
            // 重新请求收货列表
            await getUserAddressList();
            // 跳转到收货地址列表页
            this.$router.replace('/address');
        },
        // 删除用户收货地址信息
        async deleteUserAddresss(id) {
            let [data, err] = await deleteUserAddresssAPI(id);
            if (err) return;
            Toast.success(data.msg);
            // console.log(data);
        },
        // 删除收货信息
        async onDelete() {
            // 删除
            await this.deleteUserAddresss(this.id);
            // 重新获取地址列表
            await getUserAddressList();
            // 跳转到地址列表页
            this.$router.replace('/address');
        }
    },
};
</script>

<style lang="scss" scoped>
#editAddress {
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