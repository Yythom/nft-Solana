import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

const wallets = {
    Phantom: {
        website: 'https://phantom.app',
        chromeUrl: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
        getAdapter() {
            return new PhantomWalletAdapter()
        }
    },
}
export default wallets;