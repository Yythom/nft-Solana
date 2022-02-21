import { IconSearch } from "@douyinfe/semi-icons";
import { Button, Modal } from "@douyinfe/semi-ui";
import { Input } from "@douyinfe/semi-ui/lib/es/input";
import { memo, useState } from "react";
import './index.scss'
const MyWallets = memo(() => {

    const [showWallets, setShowWallets] = useState(false);
    const [search, setSearch] = useState('');

    return <div className="my-wallets">
        <Button onClick={() => setShowWallets(true)}>my wattle</Button>
        <Modal
            title='My Wallet'
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
            </div>
        </Modal>
    </div>
})

export default MyWallets;