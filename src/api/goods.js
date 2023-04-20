/**
 * 商品模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';
// 引入vuex
import store from '@/store';

// 项目id
const project_id = '337';

/**
 * 获取商品列表
 *  - get请求
 */
export async function getGoodsList(params) {
    params = { ...{ project_id }, ...params };
    return await myAxios({
        method: 'get',
        url: 'goods',
        params,
    });
}

/**
 * 根据分类ID获取商品
 *  - get请求
 */
export async function getGoodsBySortID(id) {
    if (!id) return;
    return await myAxios({
        method: 'get',
        url: 'goods/getById/' + id,
    });
}

/**
 * 获取热门商品
 *  - get请求
 */
export async function getHotGoods() {
    let params = { project_id };
    return await myAxios({
        method: 'get',
        url: 'goods/hotGoods',
        params,
    });
}

/**
 * 获取单个商品的详细信息
 *  - get请求
 */
export async function getGoodDesc(id) {
    if (!id) return;
    return await myAxios({
        method: 'get',
        url: '/goods/' + id,
    });
}


// 保存热门商品信息
export async function saveHotGoods() {
    let [data, err] = await getHotGoods();
    if (err) return;
    // 保存热门商品信息到vuex和localStorage中
    store.commit('SaveHotGoodsList', data.result.rows);
}