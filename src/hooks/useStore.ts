import { shallowEqual, useDispatch, useSelector } from "react-redux";

const useSlice = (sliceKey: string,) => {
    const slice = useSelector((s: any) => s[sliceKey], shallowEqual)
    const dispatch = useDispatch();
    return {
        dispatch,
        slice,
    }
}

export default useSlice;