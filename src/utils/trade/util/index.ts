import { Connection, clusterApiUrl } from '@solana/web3.js'
import { commitment } from './web3'
const createWeb3Instance = (endpoint?: string) => {
    // devnet:
    // testnet:
    const web3 = new Connection(clusterApiUrl('mainnet-beta'), commitment)
    return web3
}
export {
    createWeb3Instance
}