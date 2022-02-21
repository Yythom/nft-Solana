/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Popover, Tag } from "@douyinfe/semi-ui";
import { Input } from "@douyinfe/semi-ui/lib/es/input";
import { InputNumber } from "@douyinfe/semi-ui/lib/es/inputNumber";
import { memo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/userinfo";
import Intl from 'react-intl-universal'
import './index.scss'
import Text from "@douyinfe/semi-ui/lib/es/typography/text";

function SliderPop({ setShow }: {
    setShow?: Function
}) {
    const dis = useDispatch();
    const { slider } = useSelector((s: any) => s?.user, shallowEqual);
    console.log(slider, 'slider');
    const change = (v: any, isInput?: boolean) => {
        (setShow && !isInput) && setTimeout(() => {
            setShow(false)
        }, 300);
        dis(actions.setSlider(v))
    }
    return (
        <div className='slider'>
            <div style={{ marginBottom: '12px' }}>
                <div className='flex'>
                    <Text>{Intl.get('trade_slider')}</Text>
                    <Popover
                        zIndex={1070}
                        position='rightTop'
                        content={
                            <article style={{ padding: 12 }}>
                                {Intl.get('slider')}
                            </article>
                        }
                    >
                        <Text>
                            <svg style={{ verticalAlign: 'bottom' }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg"><path d="M235.4 172.2c0-11.4 9.3-19.9 20.5-19.9 11.4 0 20.7 8.5 20.7 19.9s-9.3 20-20.7 20c-11.2 0-20.5-8.6-20.5-20zm1.4 35.7H275V352h-38.2V207.9z"></path><path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path></svg>
                        </Text>
                    </Popover>
                </div>
            </div>
            <div className='fb'>
                <div
                    onClick={() => change(2)}
                    className={`slider-item fc   ${slider == 2 && 'act'}`}>
                    <Text> 2%</Text>
                </div>
                <div
                    onClick={() => change(3)}
                    className={`slider-item fc   ${slider == 3 && 'act'}`}>
                    <Text> 3%</Text>
                </div>
                <div
                    className={`input-box   ${slider != 3 && slider != 2 && 'act'}`}
                >
                    <InputNumber
                        className='input'
                        hideButtons
                        onChange={(v) => {
                            change(v, true)
                        }}
                        onEnterPress={() => {
                            setShow && setTimeout(() => {
                                setShow(false)
                            }, 300);
                        }}
                        value={slider}
                        min={0}
                        max={5}
                    >
                    </InputNumber>
                    <div className='dig'><Text>%</Text></div>
                </div>
            </div>
        </div>

    )
}

export default memo(SliderPop);