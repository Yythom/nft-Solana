/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    PublicKey,
} from '@solana/web3.js'
import wallets from '../phantom';
declare global {
    interface Window {
        publicKey: any,
        phantom: {
            solana: {
                connect: Function
                disconnect: Function,
                isPhantom: boolean,
                openBridge: Function,
                postMessage: Function,

                signAllTransactions: Function,
                signAndSendTransaction: Function,
                signMessage: Function,
                signTransaction: Function,
                isConnected: boolean,
            }
        }

    }
}


const linkToWallet = async () => {
    try {
        const wallet = wallets.Phantom.getAdapter();
        await wallet.connect()
        const publicKey: any = wallet.publicKey
        return {
            base58: publicKey?.toBase58(),
            publicKey: publicKey,
        }
    } catch (error) {
        console.log('linkToWallet', `${error}`);
        return false
    }
}


const disconnectToWallet = async () => {
    try {
        const result = await window.phantom?.solana.disconnect();
        return result
    } catch (error) {
        return false
    }
}


export {
    linkToWallet,
    disconnectToWallet,
}