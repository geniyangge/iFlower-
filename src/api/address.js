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

/**
 * 根据地址ID获取详细信息
 *  - get请求
 */
export async function getAddressByIdAPI(id) {
    if (!id) return;
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'get',
        url: '/address/' + id,
        headers,
    });
}


//  获取用户收货地址列表 和 默认收货地址
export async function getUserAddressList() {
    let userAddressList = [];    // 所有收货地址（除默认地址的一个数组）
    let defaultAddress = {};     // 默认地址(一定是个对象)

    // 请求用户收货地址列表
    let [all_data, all_err] = await getUserAddressAPI();
    if (all_err) return;
    if (all_data.result.length === 0) {
        // 地址列表为空的时候，不请求默认地址
        // 保存到vuex 和 localStorage
        store.commit('saveUserAddressInfo', { defaultAddress, userAddressList });
        return;
    }

    // 地址列表不为空的时候，请求默认地址
    let [default_data, default_err] = await getDefaultAddressAPI();
    if (default_err) return;
    defaultAddress = default_data.result || {};
    userAddressList = all_data.result.filter(address => address.default_set !== '1' && address.id !== defaultAddress.id);
    // 保存到vuex 和 localStorage
    store.commit('saveUserAddressInfo', { defaultAddress, userAddressList });
}