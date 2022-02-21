/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo, useLayoutEffect, } from "react";
import {
    useHistory,
} from "react-router-dom";
import { Avatar, Button, Empty, Modal, Popover, } from "@douyinfe/semi-ui";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/userinfo";
import Intl from 'react-intl-universal'
import { hideLoading, showLoading, showNotic } from "../../utils/Toast";
import { stopInterval } from "../../utils/interval";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import './index.scss'
import footArray, { footIcon } from "./footArray";
import { getStorageSync } from "../../utils/uitls";

const ProEmpty = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user, shallowEqual);
    const history = useHistory()
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (user?.userInfo?.address && getStorageSync('userinfo')) {
            history.replace('/dashboard')
        }
    }, [user?.userInfo])

    const login = async () => {
        // if (window?.tronWeb?.defaultAddress.base58 === false) {
        //     showNotic('error', { title: 'Please login to TronLink extention wallet first.' })
        //     return
        // }
        if (!window?.phantom) {
            window.open('https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?utm_source=chrome-ntp-icon')
            return
        }
        setModal(true)
    }
    useLayoutEffect(() => {
        console.log(
            // AccountManager,
            // Account,
            // MAINNET_TOKENS,
            // storeSecretKey,
            // loadSecretKey,
            // SPLAccount,
            // swap,
            // connection._connection,
            // PublicKey,
            // 'so'
        );
        stopInterval()
    }, []);
    return (
        <div className='index'>
            <div className='fc' style={{ height: '100%' }}>
                <Empty
                    image={null}
                    darkModeImage={null}
                    title={null}
                >
                    <div className='fdc'>
                        <Text><h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>Play <Text style={{ fontSize: 'inherit', color: 'var(--semi-color-primary-light-default)' }}>Solana</Text> universe in one place</h1></Text>
                        <div style={{ marginTop: '8px' }}>
                            <Text>
                                1 Page.finance is the homepage of <Text style={{ color: 'var(--semi-color-primary-light-default)' }}>Solana</Text> ecosystem. You can track , trade and find the most
                                interesting projects to play.
                            </Text>
                        </div>
                        <div className='fc'>
                            <Button
                                onClick={() => {
                                    login()
                                }}
                                style={{ padding: '24px 30px', fontSize: '24px', marginTop: '32px' }}
                                theme="solid"
                                type="primary">
                                Connect Wallet
                            </Button>
                        </div>
                    </div>
                </Empty>
            </div>

            <footer style={{ paddingBottom: '30px' }}>
                <div className='flex' style={{ alignItems: 'flex-start', justifyContent: 'space-around' }}>
                    {
                        Object.keys(footArray).map(e => {
                            const items = footArray[e] || []
                            return (
                                <div className='foot-item' key={e}>
                                    <div className='title' onClick={() => {
                                        console.log(footArray[e]);
                                    }}>
                                        <Text>{e}</Text>
                                    </div>
                                    <ul>
                                        {
                                            items.map(item => {
                                                return (
                                                    <li key={item.text}><Text>{item.text}</Text></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                    <div className='link-icon flex'>
                        {
                            footIcon.map(e => {
                                return (
                                    <div key={e.icon} style={{ marginRight: '14px' }}>
                                        <Popover
                                            zIndex={1070}
                                            content={
                                                <article style={{ padding: 12 }} onClick={(e) => e.stopPropagation()}>
                                                    {e.text}
                                                </article>
                                            }
                                        >
                                            <Avatar size='extra-small' onClick={() => {
                                                window.open(e.url)
                                            }}>
                                                <img src={e.icon} alt="" />
                                            </Avatar>
                                        </Popover>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </footer>

            <Modal
                title={`${Intl.get('auto')} Phontom`}
                visible={modal}
                hasCancel={false}
                okText={Intl.get('confirm')}
                onCancel={() => {
                    setModal(false)
                }}
                onOk={async () => {
                    if (window.phantom) {
                        showLoading();
                        dispatch(actions.getAuto(() => {
                            setTimeout(() => {
                                history.replace('/dashboard')
                                hideLoading();
                            }, 100);
                        }));
                    } else {
                        console.log('web none');
                    }
                }}
            >
            </Modal >
        </div>
    )
}

export default ProEmpty