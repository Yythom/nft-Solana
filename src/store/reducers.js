import { combineReducers } from '@reduxjs/toolkit'
// import cart from './cart';
import demo from './demo'
import ntf_data_slice from './ntf_data_slice'
import searchSlice from './searchSlice'
import user from './userinfo'


/**
 * 合并reducers
 */
const reducers = {
    demo: demo,
    user,
    searchSlice: searchSlice,
    ntf_data_slice
}

const reducer = combineReducers(reducers)
export default reducer;