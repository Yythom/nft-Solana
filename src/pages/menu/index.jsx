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
import LangComponent from "../../lang/local";
// import icon from "../../constants/icon";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import Logo from "../../global-component/logo";
import icon from "../../constants/icon";
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
                itemKey: 'empty', //地址本
                url: 'empty',
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
                            {
                                (!collapse && user?.userInfo?.address ? <div className='base flex'>
                                    <div className='flex'>
                                        <Avatar size='extra-small' style={{ marginRight: '6px' }}>
                                            <img src={icon[user?.mode]?.wattle || ''} alt="" />
                                            <Text></Text>
                                        </Avatar>
                                        {getSubStr(user?.userInfo?.base58)}
                                    </div>
                                    <LangComponent >
                                        <Popconfirm
                                            title="Exit?"
                                            onConfirm={() => {
                                                showLoading();
                                                dispatch(actions.clear())
                                                setmenu(null)
                                                setTimeout(() => {
                                                    hideLoading()

                                                    window.location.href = window.location.origin
                                                }, 400);
                                            }}
                                        // onCancel={onCancel}
                                        >
                                            <div style={{ marginLeft: '10px' }} className='flex'>
                                                <svg t="1635841094043" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1193" width="20" height="20"><path d="M835.584 63.488q26.624 0 49.664 10.24t40.448 27.648 27.648 40.448 10.24 49.664l0 641.024q0 26.624-10.24 49.664t-27.648 40.448-40.448 27.648-49.664 10.24l-448.512 0q-26.624 0-49.664-10.24t-40.448-27.648-27.648-40.448-10.24-49.664l0-192.512 128 0 0 192.512 448.512 0 0-641.024-448.512 0 0 192.512-128 0 0-192.512q0-26.624 10.24-49.664t27.648-40.448 40.448-27.648 49.664-10.24l448.512 0zM513.024 614.4q0-19.456-9.728-28.672t-24.064-9.216l-378.88 0q-14.336 0-25.088-7.68t-10.752-26.112l0-52.224q0-29.696 9.216-37.376t35.84-7.68l31.744 0q24.576 0 58.368 0.512t73.728 1.024 77.312 1.024 69.12 0.512l51.2 0q22.528 0 32.256-16.384t9.728-35.84l0-49.152q0-20.48 8.704-25.6t26.112 9.216 47.104 32.768 61.952 37.888 62.976 38.4 49.152 34.304q14.336 11.264 14.336 30.72t-11.264 28.672q-16.384 14.336-44.544 32.256t-59.392 36.864-60.928 37.376-48.128 33.792q-23.552 19.456-34.816 19.968t-11.264-30.208l0-49.152z" p-id="1194" fill="#bfbfbf"></path></svg>
                                            </div>
                                        </Popconfirm>
                                    </LangComponent>

                                </div> : <div className='fc'
                                    onClick={() => {
                                        history.replace('/')
                                    }}>
                                    {Intl.get('auto')} Phantom  <svg t="1637551529091" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1067" width="20" height="20"><path d="M155.733333 806.4H149.333333c-8.533333-2.133333-14.933333-12.8-14.933333-21.333333 0-4.266667 27.733333-362.666667 420.266667-396.8V177.066667c0-8.533333 4.266667-17.066667 12.8-19.2 8.533333-4.266667 17.066667-2.133333 23.466666 4.266666L896 465.066667c8.533333 8.533333 8.533333 21.333333 0 29.866666L590.933333 800c-6.4 6.4-14.933333 8.533333-23.466666 4.266667-8.533333-4.266667-12.8-10.666667-12.8-19.2v-206.933334c-70.4 8.533333-290.133333 51.2-381.866667 215.466667-2.133333 8.533333-10.666667 12.8-17.066667 12.8zM576 533.333333c6.4 0 10.666667 2.133333 14.933333 6.4 4.266667 4.266667 6.4 10.666667 6.4 14.933334v179.2l251.733334-251.733334L597.333333 228.266667V405.333333c0 10.666667-8.533333 21.333333-19.2 21.333334-249.6 14.933333-345.6 164.266667-379.733333 266.666666C337.066667 550.4 563.2 533.333333 576 533.333333z m0-128z" p-id="1068" fill="#8a8a8a"></path></svg>
                                </div>)
                            }
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



