/**
 * 微信支付模块API
 * 
*/

// 引入自定义的axios
import myAxios from '@/utils/myAxios';
// 引入vuex
import store from '@/store/index.js';


/**
 * 创建微信支付
 *  - post请求
 */
export async function createPaymentAPI(out_trade_no) {
    if (!out_trade_no) return console.log('api/payment.js --> createPaymentAPI', '请传入订单编号');
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'post',
        url: '/wechatpay',
        data: {
            out_trade_no: String(out_trade_no),
        },
        headers,
    });
}

/**
 * 查询微信支付状态
 * - get请求
 */
export async function queryPaymentAPI(out_trade_no) {
    if (!out_trade_no) return console.log('api/payment.js --> queryPaymentAPI', '请传入订单编号');
    // 请求头携带登录令牌
    const headers = {
        // 登录令牌
        "x-token": store.state.userInfo ? store.state.userInfo?.token : null,
    };
    return await myAxios({
        method: 'get',
        url: 'wechatpay',
        params: {
            out_trade_no: String(out_trade_no),
        },
        headers,
    });
}