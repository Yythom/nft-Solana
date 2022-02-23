/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/**
 * 初始化数据
 */
const initialState = {
    select_nft: [],
    select_wallet_nft: [],
}
/**
 * reducers
 */
const reducers = {
    add: (s, t) => {
        s.select_nft = [...s.select_nft, t.payload]
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

const ntfDataSlice = createSlice({
    name: 'ntfDataSlice',
    initialState,
    reducers,
})
export const actions = {
    ...ntfDataSlice.actions,
};
export default ntfDataSlice.reducer;