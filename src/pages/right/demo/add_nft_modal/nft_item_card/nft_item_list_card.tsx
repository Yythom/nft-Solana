/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconTick } from "@douyinfe/semi-icons";
import { memo, useMemo, useState } from "react";
import './index.scss'
import { NFT_list } from "./mock";
import useSlice from "../../../../../hooks/useStore";
import { actions } from "../../../../../store/ntf_data_slice";
import { IconChevronRight } from "@douyinfe/semi-icons";
const NtfItemListCard = memo(() => {
    const { slice, dispatch } = useSlice('ntfDataSlice');
    return <div>
        <div className="ntf_item_wrap flex">
            {
                NFT_list.map((e => {
                    const isAdd = slice?.select_nft.find((el: any) => el.bg === e.bg);
                    return <div
                        key={e.text}
                        className={`ntf_item ${!!isAdd && 'selected'}`}
                        onClick={() => {
                            isAdd ? dispatch(actions.del(e)) : dispatch(actions.add(e));
                        }}>
                        {
                            isAdd && <div className="selected_icon fc">
                                <IconTick style={{ color: '#fff ' }} />
                            </div>
                        }
                        <img src={e.bg} alt="" />
                        <div className="info fd">
                            <strong className="fb" style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    // https://api.genie.xyz/data/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/1414

                                    window.open(window.location.origin + `/asset?addr=0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb&code=1414`);
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

export default NtfItemListCard;