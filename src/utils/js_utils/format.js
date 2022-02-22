/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import BigNumber from "bignumber.js";
import dayjs from "dayjs";

// 倒计时转化Fn 时间戳
function formatSeconds(value) {
    if (value === 0) return null;
    let theTime = parseInt(value);// 秒
    let theTime1 = 0;// 分
    let theTime2 = 0;// 小时
    let theTime3 = 0;// 天
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
        if (theTime2 > 24) {
            theTime3 = parseInt(theTime2 / 24);
        }
    }

    let result = `${parseInt(theTime)}`;
    if (result < 10) {
        result = `0${result}`;
    }
    if (theTime1 > 0) {
        result = `${parseInt(theTime1)}:${result}`;

        if (theTime1 < 10) {
            result = `0${result}`;
        }
    } else {
        result = `${result}`;
    }
    if (theTime2 > 0) { // 暂时用不到
        if (theTime2 > 24) {
            result = `${theTime3}天${parseInt(theTime2 % 24)}:${result}`;
        } else {
            result = `${parseInt(theTime2)}:${result}`;
        }
    }

    if (value < 60) { // 60秒以内操作
        result = `00:${result}`;
    } else if (value === 60) {
        result = '01:00';
    }
    return result;
}


function formatUrl() {
    if (window.location.search) {
        let iterator = new URLSearchParams(window.location.search).entries();
        let _obj = {}
        function Next(params) {
            let a = params.next()
            if (a.value) {
                _obj[a.value[0]] = a.value[1]
                Next(iterator)
            }
        }
        Next(iterator);
        return { ..._obj, str: window.location.search }
    }
    return {
        msg: 'no find search-url',
        str: window.location.search.replace('?', '')
    }
}

// 范围随机数
function randomFrom(lowerValue, upperValue) {
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}
/**
   * 手机号验证
   * @param tel
   */
function isPhoneNumber(tel) {
    var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
    if (reg.test(tel)) {
        return true
    } else {
        return false
    }

}

const filter = (result) => {
    if (result?.data) {
        return result.data
    } else {
        return false
    }
}
function getSubStr(_string) {
    if (!_string) return ''
    let str = _string
    for (let i = 0; i < str.length; i++) {
        let str1 = str.substr(0, 5)
        let str2 = str.substr(str.length - 4, 8)
        str = str1 + '...' + str2
    }
    return str
}

function getBigNumber(hex) {
    return new BigNumber(window?.tronWeb.toBigNumber(hex?._hex || { hex: '0x00' }).toNumber()).toFixed()
}

export {
    formatSeconds,
    formatUrl,
    randomFrom,
    isPhoneNumber,
    filter,
    getSubStr,
    getBigNumber,
}