import { hideLoading, showLoading, showNotic } from "../Toast";
import Axios from 'axios';
import { filter } from "../format";
/**
 * 获取交易详情
 * @param {*} symbol 
 */
const getTransaction = async (signature: String) => {
    const result = await Axios.get(`https://api.solscan.io/transaction?tx=${signature}`)
    return filter(result)
}

// 获取支付结果
const payResultController = async (txid: string) => {
    let timerid: NodeJS.Timeout;
    let cout: number = 600;
    return new Promise((resolve, reject) => {
        timerid = setInterval(() => {
            cout--;
            if (cout <= 0) {
                resolve(false);
                clearInterval(timerid)
            }
            getTransaction(txid).then((res: any) => {
                console.log(res, 'result');
                if (!res.code) { // confirmed tx
                    if (res?.status === 'Success') {
                        resolve(res);
                        clearInterval(timerid)
                    } else if (res?.status === 'Fail') {
                        resolve(res);
                        clearInterval(timerid)
                    }
                }
                // else { // 查询报错信息
                //     resolve(res);
                //     clearInterval(timerid)
                // }
                // if (res?.ret) {
                //     resolve({ ret: res?.ret, res: res });
                //     clearInterval(timerid)
                // }
            })
        }, 5000);
    });
}

const getResult = async (txid: string, title: string, content: string) => {
    if (!txid) return hideLoading()
    showLoading()
    const ret: any = await payResultController(txid)
    let pay_result = false;
    if (ret?.status === 'Success') { // 支付结果ret ret.res原对象
        pay_result = true
        console.log(ret, '支付结果');
    } else {
        console.log('支付失败');
    }
    const opts = {
        title: pay_result ? `${title} Success` : `${title} fail`,
        content: `${content}`,
        duration: 3,
    };
    hideLoading();
    setTimeout(() => {
        showNotic(pay_result ? 'success' : 'error', opts);
    }, 200);
    return pay_result
}

export {
    payResultController,
    getResult,
}