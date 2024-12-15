/**
 * 轮播图模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';
// 引入vuex
import store from '@/store';

/**
 * 根据轮播图组ID获取轮播图
 *  - get请求
 */
export async function getSwiperList(id = '1') {
    return await myAxios({
        method: 'get',
        url: '/carouselgroup/' + id,
    });
}

// 保存轮播图数据
export async function saveSwiperList() {
    let [data, err] = await getSwiperList();
    if (err) return;
    // console.log(data.result);
    // 筛出轮播图片地址
    let swiperList = [];
    data.result.forEach(v => {
        swiperList.push(v.s_photos[0].path);
    });
    // console.log(swiperList);
    // 保存起来
    store.commit('SaveSwiperList', swiperList);
}