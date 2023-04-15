/**
 * 地址模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';
// 引入vuex
import store from '@/store';

/**
 * 添加收货地址
 *  - post请求
 */
export async function addAddressAPI(data) {
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'post',
        url: '/address',
        data,
        headers,
    });
}

/**
 * 设置默认地址
 *  - post请求
 */
export async function setDefaultAddressAPI(id) {
    if (!id) return;
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'post',
        url: '/setDefault/' + id,
        headers,
    });
}

/**
 * 获取自己的地址列表
 *  - get请求
 */
export async function getUserAddressAPI(params) {
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios.get('/address', { headers });
}

/**
 * 获取默认地址
 *  - get请求
 */
export async function getDefaultAddressAPI(params) {
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios.get('/defalutAddress', { headers });
}

/**
 * 删除用户收货地址
 *  - delete请求
 */
export async function deleteUserAddresssAPI(id) {
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: "delete",
        url: '/address/' + id,
        headers,
    });
}

/**
 * 更新地址信息
 *  - put请求
 */
export async function updateUserAddressAPI(id, data) {
    if (!id) return;
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'put',
        url: '/address/' + id,
        data,
        headers,
    });
}


//  获取用户收货地址列表 和 默认收货地址
export async function getUserAddressList() {
    let [data1, err1] = await getDefaultAddressAPI();
    let [data2, err2] = await getUserAddressAPI();
    if (err1 || err2) return;
    let defaultAddress = data1.result || null;
    let userAddressList = data2.result.filter(address => address.default_set !== '1');
    // 保存到vuex 和 localStorage
    store.commit('saveUserAddressInfo', { defaultAddress, userAddressList });
}