/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

document.documentElement.style.fontSize = 10 + 'px';
var user_id = ''

function refersh() {
    localStorage.clear();
    setTimeout(() => {
        if (window.location.pathname === '/' || window.location.pathname === '') {
            return
        }
        window.location.href = window.location.origin
    }, 100);
}
const timer = setInterval(() => {
    // if (window?.tronWeb?.isConnected === false || window?.tronWeb?.defaultAddress.base58 === false) {
    //     localStorage.clear();
    //     setTimeout(() => {
    //         if (window.location.pathname === '/' || window.location.pathname === '') {
    //             return
    //         }
    //         window.location.href = window.location.origin
    //     }, 100);
    // }
}, 2500)

