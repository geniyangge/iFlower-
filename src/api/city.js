/**
 * 城市模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';


/**
 * 获取所有城市
 *  - get请求
 */
export async function getCityListAPI() {
    return await myAxios.get('/city');
}