import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actions } from "../store/searchSlice";
import logger from "../utils/logger";
import { getStorageSync, setStorageSync } from "../utils/uitls";

function useSearch() {
    const searchSlice = useSelector((v: any) => v.searchSlice, shallowEqual);
    const dispatch = useDispatch()

    function setSearch(key: string, v: any, flag?: Function) {
        const c = JSON.parse(JSON.stringify(searchSlice?.search || {}));
        c[key] = v;
        dispatch(actions.setseatch(c));
        setStorageSync('filter_search', c);
        logger('filter', c)
    }

    return { search: searchSlice?.search, setSearch }
}

export default useSearch;