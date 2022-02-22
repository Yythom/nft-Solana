import { hideLoading, showLoading, showNotic } from "../js_utils/Toast";
import Axios from "axios"
import { filter } from "../js_utils/format";
const getEthResult = async (txhash: string) => {
    const result = await Axios.get(`https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txhash}&apikey=8AY47QX8ZP86AI5868EUS4MUW628ZJI6W9`)
    return filter(result)
}
// 获取支付结果
const getPayResult = async (txid: string) => {
    let timerid: NodeJS.Timeout;
    let cout: number = 600;
    return new Promise((resolve, reject) => {
        timerid = setInterval(() => {
            cout--;
            if (cout <= 0) {
                resolve(false);
                clearInterval(timerid)
            }
            getEthResult(txid).then((res: any) => {
                console.log(res, 'result');
                if (res.result?.status === '1') {
                    resolve(true);
                    clearInterval(timerid)
                } else if (res.result?.status === '0') {
                    resolve(false);
                    clearInterval(timerid)
                }
            })
        }, 5000);
    });
}

const getEthPayResult = async (txid: string, title: string, content: string) => {
    showLoading()
    const ret: any = await getPayResult(txid)
    let pay_result = false;
    if (ret) { // 支付结果ret ret.res原对象
        pay_result = true
        console.log(ret, '支付结果');
    } else {
        console.log('支付失败');
    }
    let opts = {
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
    getEthPayResult,
}