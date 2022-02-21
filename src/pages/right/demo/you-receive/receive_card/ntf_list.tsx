import { Button, SideSheet } from "@douyinfe/semi-ui";
import { memo, useState } from "react";
import SelectTag from "../../../../../global-component/selectTag/select_tag";
import useSearch from "../../../../../hooks/useSearch";



const NftList = memo(() => {
    const { search, setSearch } = useSearch();
    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };
    return <div>
        <Button onClick={change}>Filter</Button>
        <SideSheet title="滑动侧边栏" visible={visible} onCancel={change}>
            <SelectTag search={search} itemKey='a' setSearch={setSearch} />
        </SideSheet>
    </div>
});

export default NftList;