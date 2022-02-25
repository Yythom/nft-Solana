/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconSearch } from "@douyinfe/semi-icons";
import { Card, Select } from "@douyinfe/semi-ui";
import { memo, } from "react";
import MyWallets from "../../../components/my_wallets/my_wallets";
import useSlice from "../../../hooks/useStore";
import AddNtfModal from "../../../components/add_nft_modal/modal";
import './index.scss'

const Swap = memo(() => {
    const { slice: userStore, dispatch }: any = useSlice('user');
    const { slice, }: any = useSlice('ntf_data_slice');

    return <div className="swap">
        <div className="fdc">
            <div className="bold" style={{ fontSize: '32px', marginTop: '20px' }}>The NFT Market Aggregator</div>
            <div style={{ color: '#777e90', marginTop: '12px    ' }}>TRADE ACROSS ALL NFT MARKETPLACES INSTANTLY</div>
        </div>
        <div className="fc" style={{ marginTop: '40px' }}>
            <Card>
                <div className="fb">
                    <div>You Pay</div>
                    {/* <div className="btn" >Add NFTs</div> */}
                </div>
                <div>balance: {userStore?.balance}</div>
                <div style={{ cursor: 'pointer' }}>
                    <MyWallets openComponent={
                        <Select disabled placeholder='Choose NFTs'>

                        </Select>
                    } />
                </div>
            </Card>
            <Card>To</Card>
            <Card>
                <div className="fb">
                    <div>You Receive</div>
                    {/* <div className="btn" >Add NFTs</div> */}
                </div>
                <div>Total: {slice.info?.select_nft_price}</div>
                <div style={{ cursor: 'pointer' }}>
                    <AddNtfModal
                        openComponent={
                            <Select disabled placeholder='Choose NFTs'>

                            </Select>
                        }
                        onClick={(coin: any) => {
                            console.log(coin, 'rec');

                        }}
                    />
                </div>
            </Card>

        </div>

        <div className="fc">
            <div className="btn" style={{ fontSize: '16px', marginTop: '30px', fontWeight: 'bold', width: '40vw' }}>
                Select Tokens
            </div>
        </div>

    </div>
});

export default Swap;