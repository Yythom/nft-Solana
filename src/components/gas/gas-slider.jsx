/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { Popover, Tag } from "@douyinfe/semi-ui";
import { Input } from "@douyinfe/semi-ui/lib/es/input";
import { InputNumber } from "@douyinfe/semi-ui/lib/es/inputNumber";
import { memo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/userinfo";
import Intl from 'react-intl-universal'
import './index.scss'

const GasSliderPop = memo(() => {
    const dis = useDispatch();
    const { slider } = useSelector(s => s?.user, shallowEqual);
    console.log(slider, 'slider');
    const change = (v) => {
        dis(actions.setGas(v))
    }
    return (
        <div className='gas-slider'>
            <div style={{ marginBottom: '12px' }}>
                <div className='flex'>
                    {Intl.get('trade_gas')}
                </div>
            </div>
            <div className='fb'>
                <div
                    onClick={() => change(101)}
                    className={`gas-slider-item fdc  ${slider == 101 && 'act'}`}>
                    <div>{Intl.get('trade_gas_standard')}</div>
                    <div className='gas'>(101 Gwei)</div>
                </div>
                <div
                    onClick={() => change(102)}
                    className={`gas-slider-item fdc  ${slider == 102 && 'act'}`}>
                    <div>{Intl.get('trade_gas_fast')}</div>
                    <div className='gas'>(102 Gwei)</div>
                </div>
                <div
                    onClick={() => change(103)}
                    className={`gas-slider-item fdc  ${slider == 103 && 'act'}`}>
                    <div>{Intl.get('trade_gas_instan')}</div>
                    <div className='gas'>(103 Gwei)</div>
                </div>
            </div>
        </div>

    )
})

export default GasSliderPop;