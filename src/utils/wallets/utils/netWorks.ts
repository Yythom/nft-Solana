
import { showNotic } from "../../js_utils/Toast";
import { getStorageSync } from "../../js_utils/uitls";
import wallets from "../phantom";
import { connectMetaMask } from "./connect";
import { disconnectToWallet } from "./linkto";
declare global {
    interface Window {
        ethereum: any;
    }
}

const NETWORK: any = {

    Ethereum: {
        icon: 'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png',
        wattle: async () => {
            if (!window?.ethereum._state.isUnlocked) {
                console.log('looked MetaMask');
                showNotic('info', {
                    content: 'Please login to MetaMask extention wallet first.'
                })
                // return window?.ethereum._state.isUnlocked
            }
            const addr = await connectMetaMask()
            return addr

        },
        wallet_name: 'MetaMask',
        showConnect: () => {
            return window?.ethereum?.isConnected() && getStorageSync('eth_addr') && window?.ethereum._state.isUnlocked
        },
        disConnect: async () => {
            localStorage.removeItem('eth_addr')
            return true
        },
        value: 2
    },
    Solana: {
        icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
        wattle: async () => {
            const wallet = wallets.Phantom.getAdapter();
            await wallet.connect()
            return wallet?.publicKey?.toBase58() || false
        },
        wallet_name: 'Phontom',
        showConnect: () => {
            return window?.phantom?.solana?.isConnected
        },
        disConnect: async () => {
            return await disconnectToWallet()
        },
        value: 1,
    },

}

export default NETWORK;