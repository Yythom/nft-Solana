/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconTick } from "@douyinfe/semi-icons";
import { memo, useMemo, useState } from "react";
import usePaging from "../../../hooks/usePaging";
import useSlice from "../../../hooks/useStore";
import { formatUrl } from "../../../utils/js_utils/format";
import './index.scss'
import { getAssetData } from "./tmp/req";
const Asset = memo(() => {
    const query: any = formatUrl();
    const { slice, dispatch } = useSlice('ntfDataSlice');
    const [result] = usePaging({
        addr: query.addr,
        code: query.code,
    }, getAssetData)

    console.log(result);

    return <div className="asset">


    </div >
});

export default Asset;