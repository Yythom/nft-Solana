/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo, } from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Menu from "./pages/menu";
import { Layout, Nav, Switch, } from "@douyinfe/semi-ui";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actions } from "./store/userinfo";
import intl from 'react-intl-universal'
import zh_CN from './lang/zh_CN'
import en_US from './lang/en_US'
import ProEmpty from "./pages/index/Empty";
import Logo from "./global-component/logo";

const { Header, Sider, Content } = Layout;
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user, shallowEqual);
  useMemo(() => {
    intl.init({
      warningHandler: (msg, detail) => {
        // console.log('intl错误', msg, detail);
      },
      currentLocale: user?.lang,
      locales: {
        zh_CN,
        en_US,
      }
    })
  }, [user?.lang])

  // console.log("APP 组件更新了");
  return (
    <div className="App">
      <Router>
        <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
          <Sider >
            {/* <Menu /> */}
            <Route path='/:pages/' exact component={Menu} />
          </Sider>
          <Layout>
            <Header >
              <Nav
                mode="horizontal"
                header={
                  <>
                    <Route path='/' exact component={Logo} />
                  </>
                }
                footer={
                  <>
                    <div className='head-item setting' style={{ transform: 'scale(0.6)' }}>
                      <Switch
                        size='large'
                        defaultChecked
                        onChange={() => {
                          const body = document.body;
                          dispatch(actions.setMode(body.hasAttribute('theme-mode') ? 'light' : 'dark'))
                          if (body.hasAttribute('theme-mode')) {
                            body.removeAttribute('theme-mode');
                          } else {
                            body.setAttribute('theme-mode', 'dark');
                          }

                        }}
                        checkedText={<svg t="1636960153122" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2602" width="14" height="14"><path d="M512.909414 282.827709q47.28952 0 89.122558 18.188277t72.753108 49.108348 49.108348 72.753108 18.188277 89.122558q0 48.198934-18.188277 90.031972t-49.108348 72.753108-72.753108 49.108348-89.122558 18.188277q-48.198934 0-90.031972-18.188277t-72.753108-49.108348-49.108348-72.753108-18.188277-90.031972q0-47.28952 18.188277-89.122558t49.108348-72.753108 72.753108-49.108348 90.031972-18.188277zM967.616341 454.706927q23.64476 0 40.468917 16.824156t16.824156 40.468917-16.824156 40.468917-40.468917 16.824156l-107.310835 0q-7.275311 43.651865-24.099467 82.301954t-42.287744 72.298401l80.937833 70.024867q16.369449 16.369449 16.369449 40.01421t-16.369449 40.01421q-16.369449 17.278863-40.01421 17.278863t-40.01421-17.278863l-70.934281-80.028419q-68.206039 51.83659-154.600355 65.477798l0 108.220249q0 23.64476-16.369449 40.01421t-40.01421 16.369449-40.468917-16.369449-16.824156-40.01421l0-108.220249q-86.394316-13.641208-154.600355-65.477798l-70.024867 80.028419q-17.278863 17.278863-40.468917 17.278863t-40.468917-17.278863q-16.369449-16.369449-16.369449-40.01421t16.369449-40.01421l80.937833-70.024867q-50.927176-68.206039-66.387211-154.600355l-107.310835 0q-23.64476 0-40.468917-16.824156t-16.824156-40.468917 16.824156-40.468917 40.468917-16.824156l107.310835 0q15.460036-86.394316 66.387211-154.600355l-80.937833-70.024867q-16.369449-16.369449-16.369449-40.01421t16.369449-40.01421q17.278863-17.278863 40.468917-17.278863t40.468917 17.278863l70.024867 80.937833q33.648313-25.463588 72.298401-42.287744t82.301954-24.099467l0-108.220249q0-23.64476 16.824156-40.01421t40.468917-16.369449 40.01421 16.369449 16.369449 40.01421l0 108.220249q43.651865 7.275311 82.301954 24.099467t72.298401 42.287744l70.934281-80.937833q16.369449-17.278863 40.01421-17.278863t40.01421 17.278863q16.369449 16.369449 16.369449 40.01421t-16.369449 40.01421l-80.937833 70.024867q25.463588 33.648313 42.287744 72.298401t24.099467 82.301954l107.310835 0zM512.909414 795.737123q58.202487 0 110.039076-22.280639t90.486679-60.930728 60.930728-90.031972 22.280639-110.493783q0-58.202487-22.280639-110.039076t-60.930728-90.486679-90.486679-60.930728-110.039076-22.280639q-59.111901 0-110.94849 22.280639t-90.031972 60.930728-60.476021 90.486679-22.280639 110.039076q0 59.111901 22.280639 110.493783t60.476021 90.031972 90.031972 60.930728 110.94849 22.280639z" p-id="2603" fill="#eee"></path></svg>}
                        uncheckedText={<svg t="1636960249235" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4132" width="14" height="14"><path d="M68.534857 768.036571A512.256 512.256 0 0 1 659.126857 21.467429a36.571429 36.571429 0 0 1 1.462857 69.595428 329.398857 329.398857 0 0 0-213.504 238.116572L331.556571 329.142857l-4.242285 0.256a36.571429 36.571429 0 0 0 0 72.630857l4.242285 0.256H438.857143a329.325714 329.325714 0 0 0 480.365714 292.461715 36.571429 36.571429 0 0 1 49.444572 49.005714 512.109714 512.109714 0 0 1-848.822858 97.426286L221.842286 841.142857l4.278857-0.256a36.571429 36.571429 0 0 0 0-72.630857L221.842286 768zM660.699429 512h182.857142a36.571429 36.571429 0 0 1 4.278858 72.886857l-4.278858 0.256h-182.857142a36.571429 36.571429 0 0 1-4.242286-72.886857z m292.571428 0h36.571429a36.571429 36.571429 0 0 1 4.278857 72.886857l-4.278857 0.256h-36.571429a36.571429 36.571429 0 0 1-4.242286-72.886857l4.242286-0.256zM493.714286 329.142857a36.571429 36.571429 0 0 1 4.278857 72.886857L493.714286 402.285714H438.857143a328.886857 328.886857 0 0 1 8.228571-73.106285z m240.128 0a36.571429 36.571429 0 0 1 4.278857 72.886857l-4.278857 0.256h-109.714286a36.571429 36.571429 0 0 1-4.242286-72.886857L624.128 329.142857zM68.534857 768.036571a515.657143 515.657143 0 0 0 51.309714 73.142858L38.985143 841.142857a36.571429 36.571429 0 0 1-4.242286-72.886857L38.985143 768z" fill="#dbdbdb" p-id="4133"></path></svg>}
                      >Theme</Switch>
                    </div>
                    {/* <div className='head-item setting'>
                      <Dropdown
                        trigger='click'
                        position='bottomRight'
                        render={<SliderPop />}
                      >
                        <Text>设置</Text>
                      </Dropdown>
                    </div> */}
                  </>
                }
              ></Nav>
            </Header>
            <Content
              style={{
                padding: '12px 12px 12px 12px',
                height: 'calc(100vh - 70px)',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              <Route path='/' exact component={ProEmpty} />
            </Content>
          </Layout>
        </Layout>
      </Router >
    </div >
  );
}



export default App;



