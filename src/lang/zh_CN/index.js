import zh_dashboard from "./dashboard";
import zh_save from "./save";
import zh_send from "./send";
import menu_zh_cn from "./tab/zh-cn";

const zh_CN = {
    remove: '移除',
    time: '时间',
    money: 'CN¥',
    swap: '兑换',
    auto: '授权',
    confirm: '确认',
    confirmed: '已确认',
    fail: '失败',
    per: '兑换',
    not_balance: '余额不足',
    start: '开始',
    markets: '市场',
    my: '我的',
    tokens: '通证',
    base: '基础',
    input: '输入',
    output: '输出',
    slider: '这是由于不利的价格变化，您愿意承受的最大百分比损失',
    available_pools: '可用池',
    liquidity: '流动性',
    user_worth: '账户概况',
    wallet: '钱包',
    history: '交易历史',
    select_coin: '选择一个代币',
    filter_coin: '按代币过滤',
    operation: '操作',

    pool_title: '流动性池',
    pool_desc: '添加流动性来赚取交易费，激励，投票权等。',
    pool_sub: '探索流动池投资机会',
    pool_btn: '投资',
    hot_title: '24小时高交易额池',

    exchange_title: '兑换',
    exchange_desc: '使用来自20多个来源的最佳报价，兑换2000多个代币。',

    address_wallets: '已连接钱包',
    address_watch_wallets: '已跟踪钱包',
    add: '添加',
    address_search: '添加ENS域名或有效的ETH地址',
    address_empty: '你还没有添加任何地址',

    sale: '卖出',
    buy: '买入',
    balance: '余额',
    price: '价格',
    value: '数目',

    trade_setting: '交易设定值',
    trade_slider: '滑点',
    trade_speed: '交易速度',
    trade_allowance: '津贴',
    trade_gas_fee: '预估矿工费',
    trande_exchange_route: '转移路线',

    // 矿工费
    trade_gas: '选矿工费设置',
    trade_gas_standard: '标准',
    trade_gas_fast: '快速',
    trade_gas_instan: '即刻',

    ...menu_zh_cn,
    ...zh_dashboard,
    ...zh_save,
    ...zh_send,
}

export default zh_CN;