import en_dashboard from "./dashboard";
import en_save from "./save";
import en_send from "./send";
import en_us_menu from "./tab/en_us";

const zh_CN = {
    remove: 'Remove',
    time: 'Time',
    money: '$',
    swap: 'Swap',
    auto: 'authorization ',
    confirm: 'Confirm',
    confirmed: 'Confirmed',
    fail: 'Fail',
    per: 'Per',
    not_balance: 'Not Sufficient Funds',
    start: 'Start ',
    markets: 'Markets',
    my: 'My',
    tokens: 'Tokens',
    base: 'Base',
    input: 'Input',
    output: 'Output',
    slider: 'This is the maximum percentage loss you are willing to take due to adverse price changes',
    available_pools: 'Available Pools',
    liquidity: 'Liquidity',
    user_worth: 'Net Worth',
    wallet: 'Wallet',
    history: 'History',
    select_coin: 'Select a token',
    filter_coin: 'Filter by token',
    operation: 'Operation',

    pool_title: 'Liquidity Pools',
    pool_desc: 'Add liquidity to earn fees, incentives, voting rights, etc.',
    pool_sub: 'Explore Opportunities',
    pool_btn: 'Invest',
    hot_title: 'Trending by volume (24h)',

    exchange_title: 'Exchange',
    exchange_desc: 'Swap into more than 2000 tokens, using the best quotes from over 20 sources.',

    address_wallets: 'Connected Wallets',
    address_watch_wallets: 'Watched Wallets',
    add: 'Add',
    address_search: 'Add ENS domain, valid ETH or BTC address',
    address_empty: `You don't watch any address yet.`,

    sale: 'From',
    buy: 'Exchange',
    balance: 'balance',
    price: 'Price',
    value: 'Value',

    trade_setting: 'Transaction Settings',
    trade_slider: 'Slippage Tolerance',
    trade_speed: 'Slippage Speed',
    trade_allowance: 'Allowance',
    trade_gas_fee: 'Estimated Gas Fee',
    trande_exchange_route: 'Swap Route',

    // 矿工费
    trade_gas: 'Select Gas Setting',
    trade_gas_standard: 'Standard',
    trade_gas_fast: 'Fast',
    trade_gas_instan: 'instan',

    ...en_us_menu,
    ...en_dashboard,
    ...en_save,
    ...en_send,
}

export default zh_CN;