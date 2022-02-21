import { ConfigProvider, LocaleProvider } from "@douyinfe/semi-ui";
import { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import loacl from "./semi-ui-local";

const LangComponent = memo(({ children }) => {
    const user = useSelector(state => state.user, shallowEqual);

    return (
        <LocaleProvider locale={loacl[user?.lang]}>
            <ConfigProvider locale={loacl[user?.lang]}>
                {children}
            </ConfigProvider>
        </LocaleProvider>
    )
})
export default LangComponent;