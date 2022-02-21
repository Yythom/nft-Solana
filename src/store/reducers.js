import { combineReducers } from '@reduxjs/toolkit'
// import cart from './cart';
import demo from './demo'
import searchSlice from './searchSlice'
import user from './userinfo'


/**
 * 合并reducers
 */
const reducers = {
    demo: demo,
    user,
    searchSlice: searchSlice
}

const reducer = combineReducers(reducers)
export default reducer;