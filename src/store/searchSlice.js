/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/**
 * 初始化数据
 */
const initialState = {
    search: {},
}
/**
 * reducers
 */
const reducers = {
    setseatch: (state, action) => {
        state.search = action.payload;
    }
}

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers,
})


export const actions = {
    ...searchSlice.actions,
};
export default searchSlice.reducer;