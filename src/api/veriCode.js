/**
 * 验证码模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';

/**
 * 获取图片验证码
 *  - get请求
 */
export async function getVerifyCodeAPI() {
    return await myAxios.get('/verify');
}