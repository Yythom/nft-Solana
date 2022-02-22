/* eslint-disable no-unreachable */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { hideLoading, showLoading, showToast } from '../utils/js_utils/Toast';
import { getStorageSync, setStorageSync } from '../utils/js_utils/uitls';
import { PublicKey } from '@solana/web3.js'

import np from 'number-precision'
import { getAssetsList, getWattleBalance } from '../services/user';
import { linkToWallet } from '../utils/wallets/utils/linkto';
/**
 * 初始化数据
 */
const initialState = {
    userInfo: getStorageSync('userinfo') || {},
    contract: {},
    assetsList: [],
    // lang: 'zh_CN',
    lang: 'en_US',
    slider: 1,
    gas: '',
    balance: 0,
    mode: 'light',
}
/**
 * reducers
 */
const reducers = {
    setLang: (state, act) => {
        state.lang = act.payload
    },
    setSlider: (state, act) => {
        state.slider = act.payload
        setStorageSync('slider', act.payload)
    },
    setGas: (state, act) => {
        state.slider = act.payload
    },
    clear: (state) => {
        localStorage.clear();
        Object.keys(initialState).forEach(e => {
            state[e] = initialState[e];
        })
        state.userInfo = {}
    },
    setbalance: (state, act) => {
        state.balance = act.payload
    },
    setMode: (s, act) => {
        s.mode = act.payload
    }
}



// 登入
const getAuto = createAsyncThunk(
    'user/getAutoAsync',
    async (cb, thunkAPI) => { // data 微信获取到的信息
        if (window?.phantom?.solana) {
            showLoading();
            try {
                const allow = await linkToWallet()
                console.log(allow, 'allow');
                if (allow) {
                    const info = {
                        address: allow.base58,
                        base58: allow.base58,
                        balance: await getWattleBalance(new PublicKey(allow.publicKey)) || 0
                    }
                    setStorageSync('userinfo', info)
                    cb()
                    return info
                }
            } catch (error) {
                return {}
            }

        }
        hideLoading();
        return {}
    }
)

// 获取余额信息
const getBalance = createAsyncThunk(
    'user/getBalance',
    async (key, thunkAPI) => { // data 微信获取到的信息
        // console.log('getAssetsList');
        try {
            const result = await getAssetsList();
            // console.log('getAssetsList', result);
            const _walletList = result || []
            var all = 0
            _walletList.forEach((element) => {
                if (element.priceUsdt) {
                    const usd = np.times(element.priceUsdt, element.tokenAmount.uiAmount)
                    all += Number(usd)
                }
            });
            return {
                _walletList: _walletList || [],
                all,
            }
        } catch (error) {
            return {}
        }

    }
)

/**
 * @param {*} builder 
 * 监听异步完成处理state
 */
const extraReducers = {  // 两种写法
    [getAuto.fulfilled](state, action) {
        // console.log(action.payload, 'state接受到的payload');
        state.userInfo = action.payload
        hideLoading()
    },
    [getBalance.fulfilled](state, action) {
        // console.log(action.payload, 'state接受到的payload');
        state.assetsList = action.payload._walletList
        state.balance = action.payload.all
    },
}

const infoSlice = createSlice({
    name: 'INFO',
    initialState,
    reducers,
    extraReducers,
})

export const actions = {
    ...infoSlice.actions,
    getAuto,
    getBalance,
};
export default infoSlice.reducer;