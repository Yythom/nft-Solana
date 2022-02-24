/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconTick } from "@douyinfe/semi-icons";
import { memo, useMemo, useState } from "react";
import './index.scss'
import { NFT_list } from "./mock";
import useSlice from "../../../../../hooks/useStore";
import { actions } from "../../../../../store/ntf_data_slice";
import { IconChevronRight } from "@douyinfe/semi-icons";
import { useHistory } from "react-router-dom";
const NtfItemListCard = memo(() => {
    const { slice, dispatch } = useSlice('ntf_data_slice');
    const history = useHistory()
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const UNLISTEN = history.listen(route => {
                                        console.log(route);
                                        if (route.pathname === "/asset") {
                                            document.getElementById('root')!.style.position = 'sticky'
                                            document.getElementById('root')!.style.zIndex = '99999'
                                        } else {
                                            UNLISTEN()
                                            document.getElementById('root')!.style.position = ''
                                            document.getElementById('root')!.style.zIndex = ''
                                        }
                                    })
                                    // TODO:
                                    history.push(`/asset?addr=0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb&code=8470`);
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