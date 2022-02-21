/* eslint-disable no-unused-vars */
// const logo = require('../image/logo/Tbank.png').default
import logo from '../image/logo/logo.jpg'
import dashboard from '../image/image_slices/Dashboard.png'
import send from '../image/image_slices/send.png'
import act_send from '../image/image_slices/send-act.png'
import act_dashboard from '../image/image_slices/Dashboard-act.png'
import swap from '../image/image_slices/Swap.png'
import act_swap from '../image/image_slices/Swap-act.png'
import pool from '../image/image_slices/pool.png'
import act_pool from '../image/image_slices/pool-act.png'
import save from '../image/image_slices/save.png'
import act_save from '../image/image_slices/save-act.png'
// import bank from '../image/left-icon/dark/Bank.svg'
import wattle from '../image/left-icon/dark/personal.svg'


import dashboard_light from '../image/left-icon/light/dashboard.svg'
import exchange_light from '../image/left-icon/light/exchange-fill.svg'
import pool_light from '../image/left-icon/light/pool.svg'
import send_light from '../image/left-icon/dark/send.svg'
import bank_light from '../image/left-icon/light/Bank.svg'
import wattle_light from '../image/left-icon/light/personal.svg'

import bridge from '../image/left-icon/dark/Bridge.png'
import act_bridge from '../image/left-icon/dark/Bridge-act.png'

const icon = {
    "logo": logo,
    "dark": {
        "dashboard": dashboard,
        act_dashboard: act_dashboard,
        "exchange": swap,
        act_exchange: act_swap,
        "pool": pool,
        act_pool,
        "save": save,
        act_save,
        "wattle": wattle,
        act_wattle: wattle,
        "send": send,
        act_send,
        bridge,
        act_bridge,
    },
    "light": {
        "dashboard": dashboard_light,
        "exchange": exchange_light,
        "pool": pool_light,
        "bank": bank_light,
        "wattle": wattle_light,
        "send": send_light
    }
}


export default icon