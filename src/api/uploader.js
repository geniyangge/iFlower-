/**
 * 文件上传模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';
// 引入vuex
import store from '@/store';

/**
 * 文件上传
 *  - post请求
 */
export async function uploaderAPI(file) {
    if (!file) return console.log('api/uploader.js: file 不能为空');
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.getters.token,
        "Content-Type": "multipart/form-data",
    };
    return await myAxios({
        method: 'post',
        url: '/update',
        data: {
            file,
        },
        headers,
    });
}