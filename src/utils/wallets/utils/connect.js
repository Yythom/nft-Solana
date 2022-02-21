import { showNotic } from "../../Toast";
import { setStorageSync } from "../../uitls";


const connectMetaMask = async () => {
    try {
        if (window.ethereum) {
            const ret = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // console.log(ret, 'ret');
            setStorageSync('eth_addr', ret[0])
            return ret[0]
        } else {
            window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=chrome-ntp-icon')
        }
    } catch (error) {
        showNotic('error', { content: `${error?.message}` })
        return false
    }

}

export {
    connectMetaMask,
}