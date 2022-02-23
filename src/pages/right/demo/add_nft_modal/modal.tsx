/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, memo, useEffect, useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import np, { divide } from 'number-precision';
import Intl from 'react-intl-universal';
import './index.scss'
import { Input, Button, Modal, InputNumber } from "@douyinfe/semi-ui";
import { IconSearch, IconUndo } from "@douyinfe/semi-icons";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import { getCoinList } from "../../../../services/coin";
import { debou } from "../../../../utils/js_utils/uitls";
import PullBox from "../../../../global-component/pullBox/pull";
import CoinItem from "../../../../global-component/coin-item/CoinItem";
import NftList from "./ntf_list";
interface FromCardProps {
    onClick: Function,
    balance?: number,
    openComponent?: JSX.Element,
}

const AddNtfModal = memo(({ onClick, balance, openComponent }: FromCardProps) => {
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
            <div onClick={() => setModal(true)}>
                {openComponent ?? <Button >
                    Add NFTs
                </Button>}
            </div>

            {
                onClick && <Modal
                    title='You Receive'
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
                                <NftList setntfmodal={setntfmodal} />
                            </div>
                    }
                </Modal>
            }

        </div >
    );
})

export default AddNtfModal;



