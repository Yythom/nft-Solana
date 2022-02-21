import Axios from 'axios';
import { filter } from "../utils/format";
import { getPublicKey } from '../utils/publickey';
import { showNotic } from '../utils/Toast';
import { getStorageSync } from '../utils/uitls';
// import {
//     connection
// } from 'solong.js/src/token';
import { LAMPORTS_PER_SOL, } from '@solana/web3.js';
import { Connection, clusterApiUrl } from '@solana/web3.js'
import { baseURL } from '../http/config';

const createWeb3Instance = (endpoint?: string) => {
    // devnet:
    // testnet:
    const web3 = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed')
    return web3
}

const getSolUsd = async (symbol = 'SOL') => {
    const result = await Axios.get(`https://api.solscan.io/market?symbol=${symbol}`)
    return filter(result)?.data
}

const getWattleBalance = async (_publicKey: any) => {
    try {
        const wb = createWeb3Instance();
        // showLoading();
        const publicKey = await getPublicKey(getStorageSync('userinfo')?.base58)
        const lamports = await wb.getBalance(publicKey)
        return {
            balance: lamports / LAMPORTS_PER_SOL
        }
    } catch (error) {
        showNotic('error', { content: `${error}` })
        return {
            balance: 0
        }
    }
}

const getAssetsList = async () => {
    const publicKey = await getPublicKey(getStorageSync('userinfo')?.base58)
    const { balance } = await getWattleBalance(publicKey);
    const result = await Axios.get(`${baseURL}/api/assets?address=${publicKey}`)
    const { priceUsdt } = await getSolUsd();
    return filter(result)?.data ? [
        {
            // lamports: await getWattleBalance(),
            priceUsdt: priceUsdt,
            tokenIcon: 'solIcon',
            tokenName: "SOL",
            tokenSymbol: "SOL",
            tokenAddress: "So11111111111111111111111111111111111111112",
            tokenAccount: "So11111111111111111111111111111111111111112",
            tokenAmount: {
                decimals: 9,
                uiAmount: balance,
            }
        },
        ...filter(result)?.data
    ] : []
}

export {
    getAssetsList,
    getWattleBalance,
    createWeb3Instance,
    getSolUsd,


}