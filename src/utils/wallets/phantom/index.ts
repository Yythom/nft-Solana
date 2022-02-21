import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

const wallets = {
    Phantom: {
        website: 'https://phantom.app',
        icon: 'https://img2.baidu.com/it/u=2790921840,465834702&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        chromeUrl: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
        getAdapter() {
            return new PhantomWalletAdapter()
        }
    },
}
export default wallets;