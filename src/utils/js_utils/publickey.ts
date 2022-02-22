import { linkToWallet } from "../wallets/utils/linkto"
import {
    PublicKey,
} from '@solana/web3.js'
const getPublicKey = async (_publicKey: any) => {
    let linkres = _publicKey || await linkToWallet()
    const publicKey = typeof _publicKey === 'string' ? new PublicKey(_publicKey) : (_publicKey || new PublicKey(linkres.publicKey))
    return publicKey
}

export {
    getPublicKey,
}