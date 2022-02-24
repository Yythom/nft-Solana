/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import np from 'number-precision'
/**
 * 初始化数据
 */
const initialState = {
    select_nft: [],
    select_wallet_nft: [],
    info: {
        // select_wallet_nft_price:0,
        select_nft_price: 0,
    }
}
/**
 * reducers
 */
const reducers = {
    add: (s, t) => {
        s.select_nft = [...s.select_nft, t.payload]
        var price = s.select_nft.reduce((p, n) => {
            return np.plus(p, n.price)
        }, 0)
        s.info.select_nft_price = price;
    },
    del: (s, t) => {
        const index = s.select_nft.findIndex(e => e.text === t.payload.text)
        const newarr = JSON.parse(JSON.stringify(s.select_nft))
        newarr.splice(index, 1);
        s.select_nft = newarr
    },
    add_wallet_nft: (s, t) => {
        s.select_wallet_nft = [...s.select_wallet_nft, t.payload]
    },
    del_wallet_nft: (s, t) => {
        const index = s.select_wallet_nft.findIndex(e => e.text === t.payload.text)
        const newarr = JSON.parse(JSON.stringify(s.select_wallet_nft))
        newarr.splice(index, 1);
        s.select_wallet_nft = newarr
    },
}

const ntf_data_slice = createSlice({
    name: 'ntf_data_slice',
    initialState,
    reducers,
})
export const actions = {
    ...ntf_data_slice.actions,
};
export default ntf_data_slice.reducer;