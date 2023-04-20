/**
 * 商品规格模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';

/**
 * 根据商品ID获取商品规格
 *  - get请求
 */
export async function getGoodSku(id) {
    if (!id) return;
    return await myAxios({
        method: 'get',
        url: 'getSku',
        params: {
            id,
        }
    });
}