import { Select } from "@douyinfe/semi-ui";
import { memo } from "react";

const SelectTag = memo(({ search, setSearch, itemKey }: {
    search: any,
    itemKey: string,
    setSearch: Function
}) => {
    return <div>
        <Select
            placeholder='multiple'
            onChange={(v) => {
                setSearch(itemKey, v)
                // setSearch()
            }}
            multiple
            style={{ width: '320px' }}
            defaultValue={search[itemKey] || []}>
            <Select.Option value='abc'>抖音</Select.Option>
            <Select.Option value='hotsoon'>火山</Select.Option>
            <Select.Option value='jianying'>剪映</Select.Option>
            <Select.Option value='xigua'>西瓜视频</Select.Option>
        </Select>
    </div>
});

export default SelectTag;