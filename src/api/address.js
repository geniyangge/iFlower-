/**
 * 地址模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';


/**
 * 添加收货地址
 *  - post请求
 */
export async function addAddressAPI(data, headers) {
    return await myAxios.post('/address', {
        data,
        headers,
    });
}

/**
 * 设置默认地址
 *  - post请求
 */
export async function setDefaultAddressAPI(data, headers) {
    if (!data.id) return;
    let id = data.id;
    delete data.id;
    return await myAxios({
        method: 'post',
        url: '/setDefault/' + id,
        data,
        headers,
    });
}

/**
 * 获取自己的地址列表
 *  - get请求
 */
export async function getUserAddressAPI(params, headers) {
    return await myAxios.get('/address', { headers });
}

/**
 * 获取默认地址
 *  - get请求
 */
export async function getDefaultAddressAPI(params, headers) {
    return await myAxios.get('/defalutAddress', { headers });
}

/**
 * 删除用户收货地址
 *  - delete请求
 */
export async function deleteUserAddresssAPI(data, headers) {
    if (!data.id) return;
    let id = data.id;
    delete data.id;
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
export async function updateUserAddressAPI(data, headers) {
    if (!data.id) return;
    let id = data.id;
    delete data.id;
    return await myAxios({
        method: 'put',
        url: '/address/' + id,
        headers,
    });
}