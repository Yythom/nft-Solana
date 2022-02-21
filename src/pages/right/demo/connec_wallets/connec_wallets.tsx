import { IconSearch } from "@douyinfe/semi-icons";
import { Button, Modal } from "@douyinfe/semi-ui";
import { Input } from "@douyinfe/semi-ui/lib/es/input";
import { memo, useState } from "react";
import wallets from "../../../../utils/wallets/phantom";
import NETWORK from '../../../../utils/wallets/utils/netWorks'
import './index.scss';
const ConnectWallets = memo(() => {
    const [showWallets, setShowWallets] = useState(false);
    const [search, setSearch] = useState('');

    return <div className="ConnectWallets">
        <Button onClick={() => setShowWallets(true)}>Connect wattle</Button>
        <Modal
            title='Connect wattle'
            visible={showWallets}
            onCancel={() => setShowWallets(false)}
            onOk={() => setShowWallets(false)}
        >
            <div className="ConnectWallets_modal  flex" onClick={async () => {
                await NETWORK.Solana.wattle()
                setShowWallets(false)
            }}>
                <div className="item hover">
                    <img src={wallets.Phantom.icon} alt="" />
                    <div>Phantom</div>
                </div>
            </div>
        </Modal>
    </div>
})
export default ConnectWallets;