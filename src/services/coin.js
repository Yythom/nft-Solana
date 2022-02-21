import Axios from 'axios';
import { baseURL } from '../http/config';
// import request from '../http/index'
export const filter = (result) => {
    if (result?.data) {
        return result.data
    } else {
        return false
    }
}
// 获取exchange tokens列表
const getCoinList = async (data, method) => {
    const { page, pageSize, search, symbol, chain } = data
    console.log(data, 'data');

    const result = await Axios.get(`${baseURL}/api/token_list?chain=${chain || 'solana'}&page=${page || 1}&pagesize=${pageSize || 10}${search ? '&search=' + search.toLocaleUpperCase() : ''}${symbol ? '&symbol=' + symbol.toLocaleUpperCase() : ''}`)
    const obj = {
        list: filter(result)?.data || [],
        page: filter(result)?.page,
        total: filter(result)?.total,
    }

    return obj
}


export {
    getCoinList,
}

