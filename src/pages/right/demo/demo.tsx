import { IconSearch } from "@douyinfe/semi-icons";
import { Button, Input, Modal, Select, TagInput } from "@douyinfe/semi-ui";
import { memo, useMemo, useState } from "react";
import FromCard from "../../../global-component/form_card/from_card";
import PopContent from "../../../global-component/pop_content";
import useSelectCoin from "../../../hooks/useSelectCoin";
import ImagesComponent from "./img_show/img_show";
import './index.scss'
import MyWallets from "./my_wallets/my_wallets";
import YouReceive from "./you-receive/my_wallets";
import ReceiveCard from "./you-receive/receive_card/receive_card";
const DemoComponent = memo(() => {
    const {
        fromCoin,
        toCoin,
        isNotBalance,
        balance,
        setFromCoinHandle,
        setToCoinHandle,
    } = useSelectCoin(false);

    return <div>
        <FromCard
            exchangeInfo={{
                sale_coin: fromCoin,
                buy_coin: toCoin
            }}
            balance={balance?.from}
            onClick={(coin: any) => {
                // console.log(coin, 'coin');
                setFromCoinHandle('', coin);
            }}
        />
        <MyWallets />

        <PopContent text='923882098' content='12313123' />


        <ReceiveCard onClick={(coin: any) => {
            console.log(coin, 'rec');

        }} />
        <div style={{ width: '200px' }}>
            <ImagesComponent imgList={Array.from(Array(4))} />
        </div>
    </div>
});

export default DemoComponent;