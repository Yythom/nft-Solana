import { useMemo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import Intl from 'react-intl-universal'
import { TOKENS } from "../utils/trade/util/tokens";
const useSelectCoin = (isVeriyToCoinBalance?: boolean) => {
    const { assetsList, } = useSelector((state: any) => state.user, shallowEqual);
    const [isNotBalance, setIsNotBalance] = useState('')
    const [fromCoin, setFromCoin] = useState<any>({
        num: 0,
        network: '',
        coin: {
            // address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            // decimals: 9,
            // logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
            // name: "USDC",
            // symbol: "USDC",
        }
    })
    const [toCoin, setToCoin] = useState({
        num: 0,
        network: '',
        coin: {
            // address: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
            // decimals: 6,
            // logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png",
            // name: "Orca",
            // symbol: "ORCA",
        }
    })


    const getBalance = (data: any, _assetsList: any) => {
        if (data?.coin?.address === TOKENS.WSOL.mintAddress) {
            const res = _assetsList.filter((e: { tokenAddress: any; }) => e?.tokenAddress === TOKENS.WSOL.mintAddress)
            if (res[0]) return res[0].tokenAmount.uiAmount
        } else if (data?.coin?.symbol) {
            const res = _assetsList.filter((e: { tokenAddress: any; }) => e?.tokenAddress === data.coin?.address)
            if (res[0]) return res[0].tokenAmount.uiAmount
        }
        return 0
    }

    // 获取from to 币余额
    const balance: any = useMemo(() => {
        if (assetsList) {
            const _balance = {
                from: getBalance(fromCoin, assetsList),
                to: getBalance(toCoin, assetsList),
            }
            return _balance
        }
        return {}
    }, [assetsList, fromCoin, toCoin]);

    // 验证余额是否超出
    const veriy = (data: any, key: string) => {
        if (!data?.coin?.symbol) return data
        if (data.num > (balance[key] || fromCoin?.coin?.balance)) {
            setIsNotBalance(Intl.get('not_balance'))
        } else setIsNotBalance('')
        return data
    }

    // 获取最新coin数据
    const getNewCoin = (coin: any, key: string, value: any) => {
        const _coin: any = JSON.parse(JSON.stringify(coin));
        _coin[key] = value;
        const ret = key ? _coin : value;
        return ret
    }

    const setFromCoinHandle = (key: string, value: any) => {
        const newCoin = getNewCoin(fromCoin, key, value)
        setFromCoin(veriy(newCoin, 'from'))
    }

    const setToCoinHandle = (key: string, value: any) => {
        const newCoin = getNewCoin(toCoin, key, value)
        setToCoin(isVeriyToCoinBalance ? veriy(newCoin, 'to') : newCoin)
    }

    return {
        fromCoin,
        toCoin,
        balance,
        isNotBalance,
        setFromCoinHandle,
        setToCoinHandle,
    }
}

export default useSelectCoin;