/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconTick } from "@douyinfe/semi-icons";
import { memo, useMemo, useState } from "react";
import './index.scss'
import { IconChevronRight } from "@douyinfe/semi-icons";
import { useHistory } from "react-router-dom";
import useSlice from "../../hooks/useStore";
import { actions } from "../../store/ntf_data_slice";
import { NFT_list } from "../add_nft_modal/nft_item_card/mock";
const WalletNtfItemListCard = memo(() => {
    const { slice, dispatch } = useSlice('ntf_data_slice');
    const history = useHistory()
    return <div>
        <div className="ntf_item_wrap flex">
            {
                NFT_list.map(((e: any) => {
                    const isAdd = slice?.select_nft.find((el: any) => el.bg === e.bg);
                    return <div
                        key={e.text}
                        className={`ntf_item ${!!isAdd && 'selected'}`}
                        onClick={() => {
                            isAdd ? dispatch(actions.del_wallet_nft(e)) : dispatch(actions.add_wallet_nft(e));
                        }}>
                        {
                            isAdd && <div className="selected_icon fc">
                                <IconTick style={{ color: '#fff ' }} />
                            </div>
                        }
                        <img src={e.bg} alt="" />
                        <div className="info fd">
                            <strong className="fb" style={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                }}
                            >{e.text} <IconChevronRight /></strong>
                            <div>{e.price}</div>
                        </div>
                    </div>
                }))
            }
        </div>
    </div >
});

export default WalletNtfItemListCard;