/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconTick } from "@douyinfe/semi-icons";
import { memo, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import useSlice from "../../../hooks/useStore";
import { actions } from "../../../store/ntf_data_slice";
import logger from "../../../utils/js_utils/logger";
import './index.scss'
const Listings = memo(() => {
    const { slice, dispatch } = useSlice('ntfDataSlice');

    return <div>


    </div >
});

export default Listings;