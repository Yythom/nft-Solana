/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconSearch } from "@douyinfe/semi-icons";
import { Button, Input, Modal, Select, TagInput } from "@douyinfe/semi-ui";
import { memo, useMemo, useState } from "react";
import PopContent from "../../../global-component/pop_content";
import ConnectWallets from "./connec_wallets/connec_wallets";
import ImagesComponent from "./img_show/img_show";
import './index.scss'
import MyWallets from "../../../components/my_wallets/my_wallets";
import AddNtfModal from "../../../components/add_nft_modal/modal";
import { transactions } from '@metaplex/js'
const DemoComponent = memo(() => {
    return <div>
        {/* <FromCard
            exchangeInfo={{
                sale_coin: fromCoin,
                buy_coin: toCoin
            }}
            balance={balance?.from}
            onClick={(coin: any) => {
                // console.log(coin, 'coin');
                setFromCoinHandle('', coin);
            }}
        /> */}
        <MyWallets />

        <PopContent text='923882098' content='12313123' />

        <ConnectWallets />

        <AddNtfModal onClick={(coin: any) => {
            console.log(coin, 'rec');

        }} />

        <button onClick={() => {
            console.log(transactions);

        }}>
            test
        </button>

        <div style={{ width: '200px' }}>
            <ImagesComponent imgList={Array.from(Array(4))} />
        </div>
    </div>
});

export default DemoComponent;