/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconTick, IconReply } from "@douyinfe/semi-icons";
import { Card, TabPane, Tabs } from "@douyinfe/semi-ui";
import { memo, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import usePaging from "../../../hooks/usePaging";
import useSlice from "../../../hooks/useStore";
import { actions } from "../../../store/ntf_data_slice";
import { formatUrl } from "../../../utils/js_utils/format";
import './index.scss'
import { getAssetData } from "./tmp/req";

const Asset = memo(() => {
    const query: any = formatUrl();
    const { slice, dispatch } = useSlice('ntf_data_slice');
    const history = useHistory();
    const [result]: any = usePaging({
        addr: query.addr,
        code: query.code,
    }, getAssetData)

    const add_to_swap = () => {
        dispatch(actions.add({
            text: result.asset.name,
            price: '68',
            usd: '88',
            bg: result.asset.smallImageUrl
        }))
        history.goBack()
    }

    console.log(result);

    return <div className="asset" >
        <div className="flex" style={{ flexWrap: 'wrap', alignItems: 'flex-start', position: 'relative' }}>
            <div className="btn" style={{ position: 'absolute', right: '26px', top: '0' }}
                onClick={(e) => {
                    history.goBack();
                }}
            ><IconReply /></div>
            <div>
                <div className="img">
                    <img src={result?.asset?.smallImageUrl} alt="" />
                </div>
                {/* 照片下面的一些信息 */}
                <div className="asset-traits">
                    <div className="fd item" >
                        <div className="bold">Accessory</div>
                        <div style={{ color: '#bbb', margin: '10px 0 8px 0' }}>Frumpy Hair</div>
                        <div style={{ color: '#ccc' }}>442 (4.42%)</div>
                    </div>
                    <div className="fd item" >
                        <div className="bold">Accessory</div>
                        <div style={{ color: '#bbb', margin: '10px 0 8px 0' }}>Frumpy Hair</div>
                        <div style={{ color: '#ccc' }}>442 (4.42%)</div>
                    </div>
                </div>

            </div>

            {/* 左边 */}
            <div className="info">
                <div>
                    <strong>{result?.asset?.name}</strong>
                </div>
                <div className="flex" style={{ margin: '16px 0 24px' }}>
                    <span className="bold" style={{ color: '#ccc', fontSize: '16px', marginRight: '8px' }}>CryptoPunks</span>
                    <div className="selected_icon fc" style={{ position: 'static' }}>
                        <IconTick style={{ color: '#fff ' }} />
                    </div>
                </div>
                <div>
                    <Card>
                        <div className="flex">
                            <img style={{ width: '42px', height: '42px', marginRight: '10px' }} src={require('./tmp/tt.png').default} alt="" />
                            <div>
                                <div>Listed on <a href={`https://www.larvalabs.com/cryptopunks/details/${result?.asset?.id}`}>cryptopunks</a> for</div>
                                <div style={{ marginTop: '10px', fontSize: '24px' }}>
                                    <span style={{ marginRight: '8px', color: '#000', fontWeight: 800 }}>12ETH</span>
                                    <span> $179,008.0</span>
                                </div>
                            </div>
                        </div>
                        <div className="btn" style={{ marginTop: '20px' }}
                            onClick={add_to_swap}
                        >Add to Swap</div>
                    </Card>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Tabs type="button">
                        <TabPane tab='Info' itemKey="1" >
                            <div className="card">
                                <div className="flex" style={{ marginBottom: '20px' }}>
                                    <img src={result?.collection.imageUrl} alt="" style={{ width: '32px', height: '32px', marginRight: '12px' }} />
                                    <div className="fd">
                                        <span style={{ margin: '0 0 4px 0 ', color: '#bbb' }}>Collection</span>
                                        <span className="bold" style={{ fontSize: '14px' }}> {result?.collection.name}</span>
                                    </div>
                                </div>
                                {result?.collection.description}
                            </div>
                        </TabPane>
                        <TabPane tab='History' itemKey="2" >

                        </TabPane>
                    </Tabs>
                </div>
            </div>


        </div>


    </div >
});

export default Asset;