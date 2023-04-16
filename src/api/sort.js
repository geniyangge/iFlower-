/**
 * 商品分类模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';
// 引入vuex
import store from '@/store';

// 项目id
const project_id = '337';

/**
 * 获取所有商品分类信息
 *  - get请求
 */
export async function getAllSort(params) {
    params = { ...{ project_id }, ...params };
    return await myAxios({
        method: 'get',
        url: '/classify',
        params,
    });
}

/**
 * 获取每个分类下的商品信息
 *  - get请求
 */
export async function getSortGoods() {
    let params = { project_id };
    return await myAxios({
        method: 'get',
        url: '/classify/classifyGoods',
        params,
    });
}


// 保存所有商品分类信息
export async function saveAllSort() {

}

// 保存每个分类下的商品信息
export async function saveSortGoods() {
    let [data, err] = await getSortGoods();
    if (err) return;

    // 处理后的分类商品列表
    let sortGoodsList = [];

    data.result.forEach(s => {
        if (!s.children) {
            // 抓取 没有子分类 的顶级分类

            // 某个分类及其分类下的商品信息
            let temp = {};
            temp.title = s.name;

            // 分类下的商品信息
            let goods = [];
            s.s_goods.forEach(g => {
                // 单个商品信息
                let good = {};
                good.name = g.name;
                good.price = g.price;
                good.sold_num = g.sold_num;
                good.img = g.s_goods_photos[0].path;
                // 存入商品列表
                goods.push(good);
            });

            // 将商品列表存至对应分类下
            temp.goods = goods;
            // 将当前分类及其商品信息存入  处理后的分类商品列表
            sortGoodsList.push(temp);
        }
    });
    // console.log(data.result);
    // console.log(sortGoodsList);

    // 保存数据至vuex和localStorage
    store.commit('SaveSortGoodsList', sortGoodsList);
}