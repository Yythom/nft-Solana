/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Radio } from "@douyinfe/semi-ui";
import { memo, useEffect, useState } from "react";
import { getSubStr } from "../format";
import { clearKeyTime, startInterval } from "../interval";
import logger from "../logger";
import NETWORK from "./utils/netWorks";


const ConnectWallets = memo(({
    network,
    callback
}: {
    network: string,
    callback?: Function
}) => {
    const [connect, setconnect] = useState(false)
    const [address, setaddress] = useState(false)
    useEffect(() => {
        if (network) {
            setTimeout(() => {
                startInterval(`wallets_connect_${network}`, () => {
                    const isConnect = !!NETWORK[network]?.showConnect();
                    isConnect !== connect && setconnect(isConnect)
                    if (isConnect) {
                        NETWORK[network].wattle().then((res: any) => {
                            if (!res) {
                                clearKeyTime(`wallets_connect_${network}`);
                                setaddress(false)
                                setconnect(false)
                            }
                            setaddress(res)
                        })
                    }
                }, 3000, true)
            }, 1000);
        }
    }, [network])
    const loginWallet = async () => {
        if (connect) {
            await NETWORK[network]?.disConnect()
            setconnect(false)
        } else {
            const res = await NETWORK[network]?.wattle()
            if (res) {
                logger('address', res)
                setaddress(res)
                setconnect(true)
            }
        }
    }
    return <div>
        {network && <Button style={{ fontSize: '13px', marginLeft: '20px' }}
            onClick={loginWallet}
        >
            {connect ? `${getSubStr(address)}` : `Connect ${NETWORK[network]?.wallet_name}`}
            <Radio style={{ marginLeft: '10px' }} checked={connect} />
        </Button>}
    </div>
})

export default ConnectWallets