/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, memo, useEffect, useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import np, { divide } from 'number-precision';
import Intl from 'react-intl-universal';
import './index.scss'
import { Input, Button, Modal, InputNumber } from "@douyinfe/semi-ui";
import { IconSearch } from "@douyinfe/semi-icons";

import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import { getCoinList } from "../../../../../services/coin";
import { debou } from "../../../../../utils/uitls";
import PullBox from "../../../../../global-component/pullBox/pull";
import CoinItem from "../../../../../global-component/coin-item/CoinItem";
import NftList from "./ntf_list";
interface FromCardProps {
    onClick: Function,
    balance?: number,
}
interface Coin {
    coin: {
        address: string,
        chainId?: number,
        decimals?: number,
        logoURI?: string,
        name?: string,
        symbol?: string,
    },
    num: string
}

declare global {
    interface Window {
        base58: any;
    }
}



const ReceiveCard = memo(({ onClick, balance }: FromCardProps) => {
    const [modal, setModal] = useState(false);
    const [search, setsearch] = useState('');
    const [coinList, setCoinList] = useState<any>([]);

    const setSearch = (e: any) => {
        debou(() => setsearch(e))
    }

    const req = useMemo(() => {
        return {
            params: { pageSize: 10, search },
            http: getCoinList
        }
    }, [search])
    const [ntfModal, setntfmodal] = useState(false);

    return (
        <div className="receive_card">
            <Button onClick={() => setModal(true)}>
                Add NFTs
            </Button>
            {
                onClick && <Modal
                    title={Intl.get('select_coin')}
                    visible={modal}
                    footer={null}
                    style={{
                        width: ntfModal ? '80vw' : '',
                        transition: ntfModal ? '600ms' : '',
                    }}
                    onCancel={() => {
                        setntfmodal(false);
                        setModal(false)
                    }}
                >
                    {
                        !ntfModal ? <div style={{ paddingBottom: '20px' }}>
                            <div className='fc'>
                                <Input
                                    autofocus
                                    placeholder={Intl.get('filter_coin')} style={{ width: 'calc(100% - 0px)', marginBottom: '20px' }}
                                    onChange={(e) => {
                                        setSearch(e);
                                    }} suffix={<IconSearch />} showClear
                                />
                            </div>
                            {
                                modal && <PullBox
                                    noPaging
                                    isTopBtn
                                    isWindowBox={false}
                                    // noMore
                                    maxHeight={500}
                                    request={req}
                                    onScrollBottom={(result: any) => {
                                        console.log(result, 'list');
                                        if (result.page > 1) setCoinList([...coinList, ...result.list])
                                        else setCoinList(result.list)
                                    }}
                                >
                                    <div className='coin-search fd'>
                                        {
                                            coinList.map((e: any, i: number) => {
                                                return <CoinItem
                                                    key={i}
                                                    select_symbol={''}
                                                    onClick={() => {
                                                        setntfmodal(true);
                                                    }}
                                                    e={e}
                                                />
                                            })
                                        }
                                    </div>
                                </PullBox>
                            }
                        </div> :
                            <div style={{ paddingBottom: '20px', }}>
                                <div onClick={() => setntfmodal(false)}>back </div>
                                <NftList />
                            </div>
                    }
                </Modal>
            }

        </div >
    );
})

export default ReceiveCard;



