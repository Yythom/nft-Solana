/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actions } from "../store/searchSlice";
import logger from "../utils/logger";

function useSearch() {
    const searchSlice = useSelector((v: any) => v.searchSlice, shallowEqual);
    const dispatch = useDispatch()

    function setSearch(key: string, v: any, flag?: Function) {
        const c = JSON.parse(JSON.stringify(searchSlice?.search || {}));
        c[key] = v;
        dispatch(actions.setseatch(c));
        logger('filter', c)
    }

    return { search: searchSlice?.search, setSearch }
}

export default useSearch;