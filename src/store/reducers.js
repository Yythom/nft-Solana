import { combineReducers } from '@reduxjs/toolkit'
// import cart from './cart';
import demo from './demo'
import user from './userinfo'


/**
 * 合并reducers
 */
const reducers = {
    demo: demo,
    user,
}

const reducer = combineReducers(reducers)
export default reducer;