/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, memo, useEffect, useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import np, { divide } from 'number-precision';
import Intl from 'react-intl-universal';
import './index.scss'
import { Input, Button, Modal, InputNumber } from "@douyinfe/semi-ui";
import { IconSearch } from "@douyinfe/semi-icons";

import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import CoinItem from "../coin-item/CoinItem";
import PullBox from "../pullBox/pull";
import { getCoinList } from "../../services/coin";
import { debou } from "../../utils/js_utils/uitls";
interface FromCardProps {
    onClick: Function,
    exchangeInfo: any,
    balance?: number,
}

declare global {
    interface Window {
        base58: any;
    }
}

const FromCard = memo(({ onClick, exchangeInfo, balance }: FromCardProps) => {
    const [ratio, setratio] = useState(false);
    const [modal, setModal] = useState(false);
    const [search, setsearch] = useState('');
    const [coinList, setCoinList] = useState<any>([]);

    const setSearch = (e: any) => {
        debou(() => setsearch(e))
    }
    const { coin, num } = useMemo(() => {
        return exchangeInfo?.sale_coin
    }, [exchangeInfo])

    const req = useMemo(() => {
        return {
            params: { pageSize: 10, search },
            http: getCoinList
        }
    }, [search])

    return (
        <div className="sale-card card">
            <div className='fb item'>
                <div><Text>{Intl.get('sale')}</Text></div>
                <div><Text>{Intl.get('balance')} {balance || '--'}</Text></div>
            </div>
            <div className='coin fb'>
                <Button className='s-coin' onClick={() => {
                    onClick && setModal(true);
                }}>
                    {
                        coin?.symbol ? <div className='flex'>
                            <img src={coin?.logoURI} alt="err" />
                            <div style={{ marginRight: '14px' }}>{coin?.symbol}</div>
                            <div>-</div>
                        </div> : <div className='flex'>{Intl.get('select_coin')}</div>
                    }
                </Button>
                <div>
                    <InputNumber
                        hideButtons
                        placeholder={num || 0}
                        min={0.000001}
                        max={Number(balance)}
                        onBlur={(e: any) => {
                            onClick({ coin, num: e.currentTarget.value, })
                            // setcoin()
                        }}
                        style={{ background: 'none', border: 'none' }} />
                </div>
            </div>

            {
                onClick && <Modal
                    title={Intl.get('select_coin')}
                    visible={modal}
                    footer={null}
                    onCancel={() => setModal(false)}
                >
                    <div style={{ paddingBottom: '20px' }}>
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
                                                select_symbol={exchangeInfo?.buy_coin?.coin?.symbol}
                                                onClick={() => {
                                                    setModal(false)
                                                    // setcoin({ ...coin, coin: e, })
                                                    onClick({ coin: e, num, })
                                                }}
                                                e={e}
                                            />
                                        })
                                    }
                                </div>
                            </PullBox>
                        }
                    </div>

                </Modal>
            }

        </div >
    );
})

export default FromCard;



