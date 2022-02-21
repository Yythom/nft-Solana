/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { useState, memo, useLayoutEffect, useMemo, useEffect } from "react";
import { formatUrl, getSubStr } from "../../utils/format";
import Intl from 'react-intl-universal'
import { useHistory } from 'react-router-dom';
import './index.scss'
import navLinkTo from "../../utils/navlink";
import { Avatar, Button, Card, Modal, Nav, Popconfirm } from "@douyinfe/semi-ui";
import { getStorageSync } from "../../utils/uitls";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/userinfo";
import { startInterval, stopInterval } from "../../utils/interval";
import { hideLoading, showLoading, showToast } from "../../utils/Toast";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import Logo from "../../global-component/logo";
import ConnectWallets from "../../utils/wallets/isConnect";
// '总览'


const Menu = () => {
    const history = useHistory()
    const [collapse, setcollapse] = useState(false);
    const user = useSelector(state => state.user, shallowEqual);

    const [menu, setmenu] = useState(null);
    useLayoutEffect(() => {
        const itemkey = tabs.filter(e => window.location.pathname.indexOf(e.url) !== -1)[0];
        if (!itemkey) setmenu(tabs[0])
        setmenu(itemkey)
    }, [])
    const tabs = useMemo(() => {
        if (!user?.mode) return
        return [


            {
                itemKey: 'Demo', //地址本
                url: 'demo',
            },
        ]
    }, [user?.mode, menu])

    const dispatch = useDispatch();
    useLayoutEffect(() => {
        if (!getStorageSync('userinfo')) {
            history.replace('/')
        }

        // setmenu(itemkey)
    }, []);

    useEffect(() => {
        if (user?.userInfo?.base58) {
            // 获取账号余额信息
            if (user?.userInfo?.base58) {
                startInterval('_getBalance', () => { dispatch(actions.getBalance()) }, 20000)
            }
        }
    }, [user?.userInfo?.base58])
    if (!user?.mode) return null

    return (
        <div className="menu fdc">
            <Nav
                className='menu'
                selectedKeys={[menu?.itemKey]}
                style={{ maxWidth: 240, height: '100%' }}
                items={tabs.map(e => {
                    return {
                        ...e, text: e.itemKey
                    }
                })}
                onClick={(el) => {
                    if (!user?.userInfo?.address) return showToast.message(`${Intl.get('auto')}`)
                    setmenu(el)
                    stopInterval() // 重置全局轮训
                    setTimeout(() => {
                        // 获取账号余额信息
                        if (user?.userInfo?.base58) {
                            startInterval('_getBalance', () => { dispatch(actions.getBalance()) }, 10000)
                        }
                    }, 1000);
                    navLinkTo(history, tabs.filter(e => e.itemKey === el.itemKey)[0].url)
                }}
                onCollapseChange={(e) => {
                    setcollapse(e)
                }}
                header={{
                    logo: <div>
                        {/* <div className='flex'>
                            <img className='logo' src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />
                            {!collapse && <div style={{ fontSize: '20px', fontWeight: 'bold' }}>name</div>}
                        </div> */}
                        <Logo />
                        <Card className='user fc' >
                            <ConnectWallets network="Solana" />
                        </Card>
                    </div >,
                }}
            // footer={{
            //     collapseButton: true,
            // }}
            />
        </div >

    );
}

export default Menu;



