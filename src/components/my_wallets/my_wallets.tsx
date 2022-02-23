/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconSearch } from "@douyinfe/semi-icons";
import { Button, Modal } from "@douyinfe/semi-ui";
import { Input } from "@douyinfe/semi-ui/lib/es/input";
import { memo, useState } from "react";
import './index.scss'
import WalletNtfItemListCard from "./nft_item_list_card";
const MyWallets = memo(({ openComponent }: {
    openComponent?: JSX.Element
}) => {

    const [showWallets, setShowWallets] = useState(false);
    const [search, setSearch] = useState('');

    return <div className="my-wallets">
        <div onClick={() => setShowWallets(true)}>
            {
                openComponent ?? <Button >open wattle</Button>
            }
        </div>
        <Modal
            title='My Wallet'
            style={{
                width: '80vw'
            }}
            visible={showWallets}
            onCancel={() => setShowWallets(false)}
            onOk={() => setShowWallets(false)}
        >
            <div>
                <div className='fc'>
                    <Input
                        autofocus
                        placeholder={'Search by name or token ID'} style={{ width: 'calc(100% - 0px)', marginBottom: '20px' }}
                        onChange={(e) => {
                            setSearch(e);
                        }} suffix={<IconSearch />} showClear
                    />
                </div>
                {

                    <div style={{ paddingBottom: '20px', }}>
                        <WalletNtfItemListCard />
                    </div>
                }
            </div>
        </Modal>
    </div>
})

export default MyWallets;