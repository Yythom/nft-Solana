/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import paging, { initing } from './paging';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Pull, BackToTop, ConfigProvider, ActivityIndicator, Icon } from 'zarm';
import './index.scss'
import zh_CN from 'zarm/lib/config-provider/locale/zh_CN';
import en_US from 'zarm/lib/config-provider/locale/en_US';
import { shallowEqual, useSelector } from 'react-redux';
/**
<PullBox
    isTopBtn
    isWindowBox={false}
    maxHeight={300}
    request={{
        params: {
            page: 1,
        },
        http: getTestList
    }}
    onScrollBottom={(_list) => {
        console.log(_list, 'list');
        // setTimeout(() => {
        if (_list.page > 1) setPageData([...pageData, ..._list.list])
        else setPageData(_list.list)
        // }, 200);


    }}
>
  
    {
        pageData?.map((e, i) => {
            return <Cell key={'list_pull_' + i}>{e} ---- {i}</Cell>
        })
    }
</PullBox>
 */


const REFRESH_STATE = {
    normal: 0, // 普通
    pull: 1, // 下拉刷新（未满足刷新条件）
    drop: 2, // 释放立即刷新（满足刷新条件）
    loading: 3, // 加载中
    success: 4, // 加载成功
    failure: 5, // 加载失败
};

const LOAD_STATE = {
    normal: 0, // 普通
    abort: 1, // 中止
    loading: 2, // 加载中
    success: 3, // 加载成功
    failure: 4, // 加载失败
    complete: 5, // 加载完成（无新数据）
};



const PullBox = ({
    isWindowBox = false,
    isTopBtn = false,
    noMore = false,
    request = { params: {}, http: Function.prototype },
    onScrollBottom = Function.prototype, // 滚动到底部回调
    maxHeight,
    noPaging = false,
    children
}) => {


    const pullRef = useRef();
    const [bodyScroll, setBodyScroll] = useState(false);
    const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
    const [loading, setLoading] = useState(LOAD_STATE.normal);
    const [page, setPage] = useState(1)

    useEffect(() => {
        setBodyScroll(isWindowBox);
    }, [])

    useEffect(() => {
        if (request?.params) {
            const params = JSON.parse(JSON.stringify(request?.params))
            refreshData()
            console.log('params改变 init');
        }
    }, [request]);

    // 模拟请求数据
    const refreshData = (params) => {
        setRefreshing(REFRESH_STATE.loading);
        initing(
            !params ? request : { ...request, params }, // 
            (newList) => {
                let refreshState = REFRESH_STATE.failure
                console.log(newList, 'init--list------');
                if (newList) {
                    if (newList?.list[0]) {
                        onScrollBottom(newList)
                        refreshState = REFRESH_STATE.success
                    }
                }
                setRefreshing(refreshState);
            })
    };

    // 模拟加载更多数据
    const loadData = async () => {
        // if (noPaging) setRefreshing(REFRESH_STATE.complete);
        if (noMore && noPaging) return
        setLoading(LOAD_STATE.loading);
        paging(request, page, (newList) => {
            let loadingState = LOAD_STATE.complete
            console.log(newList, 'paging------');
            if (newList) {
                if (newList.list[0]) {
                    onScrollBottom(newList);
                    setPage(page + 1)
                    loadingState = LOAD_STATE.success
                }
            } else {
                loadingState = LOAD_STATE.failure
            }
            setLoading(loadingState);
        })
    };

    const style = bodyScroll ? {} : { overflowY: 'auto', maxHeight };

    const scrollContainer = () => {
        return bodyScroll ? window : pullRef.current && pullRef.current.scrollContainer;
    };
    const user = useSelector(state => state.user, shallowEqual);

    const lang = useMemo(() => {
        const local = {
            zh_CN,
            en_US,
        }
        return local[user?.lang || 'zh_CN']
    }, [user?.lang])
    return (
        <div style={{ position: 'relative' }}>
            <ConfigProvider locale={lang}>
                <Pull
                    ref={pullRef}
                    style={style}
                    refresh={{
                        state: refreshing,
                        handler: refreshData,
                        // render: (refreshState, percent) => {
                        //     const cls = 'custom-control';
                        //     switch (refreshState) {
                        //         case REFRESH_STATE.pull:
                        //             return (
                        //                 <div className={cls}>
                        //                     <ActivityIndicator loading={false} percent={percent} />
                        //                     <span>下拉刷新</span>
                        //                 </div>
                        //             );

                        //         case REFRESH_STATE.drop:
                        //             return (
                        //                 <div className={cls}>
                        //                     <ActivityIndicator loading={false} percent={100} />
                        //                     <span>释放立即刷新</span>
                        //                 </div>
                        //             );
                        //         case REFRESH_STATE.loading:
                        //             return (
                        //                 <div className={cls}>
                        //                     <ActivityIndicator type="spinner" />
                        //                     <span>loading</span>
                        //                 </div>
                        //             );

                        //         case REFRESH_STATE.success:
                        //             return (
                        //                 <div className={cls}>
                        //                     <Icon type="right-round" theme="success" />
                        //                     <span>success</span>
                        //                 </div>
                        //             );

                        //         case REFRESH_STATE.failure:
                        //             return (
                        //                 <div className={cls}>
                        //                     <Icon type="wrong-round" theme="danger" />
                        //                     <span>loading fail</span>
                        //                 </div>
                        //             );

                        //         default:
                        //     }
                        // },
                    }}
                    load={{
                        state: loading,
                        distance: 200,
                        handler: loadData,
                        // render: (loadState) => {
                        //   const cls = 'custom-control';
                        //   switch (loadState) {
                        //     case LOAD_STATE.loading:
                        //       return <div className={cls}><ActivityIndicator type="spinner" /></div>;

                        //     case LOAD_STATE.failure:
                        //       return <div className={cls}>加载失败</div>;

                        //     case LOAD_STATE.complete:
                        //       return <div className={cls}>我是有底线的</div>;
                        //   }
                        // },
                    }}
                >
                    {children}
                </Pull>
            </ConfigProvider>

            <BackToTop scrollContainer={scrollContainer} onClick={() => console.log('click back to top')}>
                <div
                    style={{
                        width: 60,
                        height: 60,
                        lineHeight: '60px',
                        textAlign: 'center',
                        // backgroundColor: '#fff',
                        color: '#999',
                        fontSize: '14px',
                        borderRadius: 30,
                        boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                    }}
                >
                    Up
                </div>
            </BackToTop>
        </div>
    );
};
export default PullBox