/**
 * 购物车模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';
// 引入vuex
import store from '@/store';

// 项目ID
const project_id = "337";

/**
 * 添加商品到购物车
 *  - post请求
 *  data === {
 *      goods_id: 361, // 商品ID
 *      num: 1,        // 数量
 *  }
 */
export async function addGoodsToCart(data) {
    data = { ...{ project_id }, ...data };
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'post',
        url: '/shoppingCart',
        headers,
        data,
    });
}

/**
 * 获取自己的购物车信息
 *  - get请求
 */
export async function getUserCartInfo() {
    let params = { project_id };
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'get',
        url: '/shoppingCart',
        headers,
        params,
    });
}

/**
 * 更新购物车内某条商品
 *  - put请求
 */
export async function updateCartGood(data) {
    if (!data.id) return console.log('api/cart.js', '请携带商品id');
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    let id = data.id;
    delete data.id;
    return await myAxios({
        method: 'put',
        url: '/shoppingCart/' + id,
        headers,
        data,
    });
}

/**
 * 删除购物车的一条商品
 *  - delete请求
 */
export async function deleteCartGood(id) {
    if (!id) return console.log('api/cart.js', '请携带商品id');
    let data = { project_id };
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'delete',
        url: '/shoppingCart/' + id,
        headers,
        data,
    });
}


// 保存用户购物车商品信息 至vuex
export async function saveCartGoodsList() {
    // 获取购物车信息
    let [cartInfo, err] = await getUserCartInfo();
    if (err) return;
    // console.log(cartInfo.result);

    // 保存购物车商品信息
    let cartGoodsList = cartInfo.result.map(g => {
        let temp = {
            id: g.id,   // 购物车商品ID
            goods_id: g.goods_id,   // 商品ID
            name: g.s_good.name,   // 购物车商品名称
            num: g.num,   // 购物车商品数量
            price: g.s_good.price,   // 购物车商品价格
            sale_price: g.s_good.sale_price,   // 购物车商品优惠价格
            img: g.s_good.s_goods_photos[0].path,   // 购物车商品图片
        };
        return temp;
    });

    // 保存用户购物车商品信息 至vuex 和 localStorage
    store.commit('SaveCartGoodsList', cartGoodsList);
    // console.log(this.cartGoodsList);
}