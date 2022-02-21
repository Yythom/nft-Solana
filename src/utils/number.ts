import BigNumber from 'bignumber.js';
import np from 'number-precision';
function BigNumberToFixed(value: any) {
    return new BigNumber(value).toFixed()
}

const numToDivide = (num: string, decimals: number) => {
    const result = BigNumberToFixed(np.divide(num || 0, BigNumberToFixed(Math.pow(10, decimals))))
    return result
}

const numToTimes = (num: string, decimals: number) => {
    const result = BigNumberToFixed(np.times(num || 0, BigNumberToFixed(Math.pow(10, decimals))))
    return result
}

const getDecimals = (decimals: any) => {
    return BigNumberToFixed(Math.pow(10, decimals))
}

const numToMPa = (num: any) => {
    const result = Number(numToDivide(num, 6)) < 1 ? `${Number(numToDivide(num, 3)).toFixed(2)} K` : `${Number(numToDivide(num, 6)).toFixed(2)} M`
    return result;
}
const numToFixed = (num: any, length = 6) => {
    const number = BigNumberToFixed(num)
    if (number.indexOf('.') === -1) {
        return number
    } else {
        const floatlength = (number.split('.')[1] || '').length
        const result = floatlength > 0
            ? (
                floatlength > length
                    ? BigNumberToFixed(Number(number).toFixed(length))
                    : number
            )
            : ''
        return result;
    }
}


// const isConnect = async () => {
//     const is = await window.tronWeb.isConnected();
//     const is_connect: any = {}
//     if (is) Object.keys(is).forEach(e => {
//         if (!is[e]) is_connect[e] = is[e]
//     })
//     if (Object.keys(is_connect).length > 0) return { is_connect: false, err: is_connect }
//     else return { is_connect: true }
// }

export {
    numToDivide,
    numToTimes,
    getDecimals,
    BigNumberToFixed,
    numToMPa,
    // isConnect,
    numToFixed,
}