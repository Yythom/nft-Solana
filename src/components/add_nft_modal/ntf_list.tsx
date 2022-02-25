import { Button, Card, Select, SideSheet } from "@douyinfe/semi-ui";
import { memo, useState } from "react";
import NtfItemListCard from "./nft_item_card/nft_item_list_card";
import SelectTag from "../../global-component/selectTag/select_tag";
import useSearch from "../../hooks/useSearch";
import useSlice from "../../hooks/useStore";
import ImagesComponent from "../../pages/right/demo/img_show/img_show";
import { IconReply, IconFilter } from "@douyinfe/semi-icons";
import { Input } from "@douyinfe/semi-ui/lib/es/input";
const NftList = memo(({ setntfmodal }: any) => {
    const { search, setSearch } = useSearch();
    const [visible, setVisible] = useState(false);
    const { slice, dispatch } = useSlice('ntf_data_slice');
    const { slice: searchSlice, } = useSlice('searchSlice');
    const change = () => {
        setVisible(!visible);
    };
    return <div>
        <div className="fb">
            <div className="fc hover forword" onClick={() => setntfmodal(false)}><IconReply /> </div>
            <div className="flex">
                <div>
                    <Input
                        value={searchSlice.search?.token_id}
                        placeholder='Search by name or token ID'
                        onChange={(e) => {
                            setSearch('token_id', e);
                        }} />
                </div>
                <div>
                    <Select
                        value={searchSlice.search?.price}
                        onChange={(v: any) => {
                            setSearch('price', v)
                        }}
                        style={{ width: 120, marginRight: '12px' }}>
                        <Select.Option value='1'>Lowest Price</Select.Option>
                        <Select.Option value='0'>Highest Price</Select.Option>
                    </Select>
                </div>
                <div onClick={change} className='flex hover'>
                    Filter
                    <IconFilter style={{ marginLeft: '6px' }} />
                </div>
            </div>

        </div>
        <SideSheet title="滑动侧边栏" visible={visible} onCancel={change}>
            <SelectTag search={search} itemKey='a' setSearch={setSearch} />
        </SideSheet>
        <div>
            <NtfItemListCard />
        </div>
        <div>
            <div style={{ width: '50px', height: '50px', marginTop: '9px' }}>
                <ImagesComponent imgList={slice.select_nft?.map((e: any) => e.bg)} />
            </div>
        </div>
    </div>
});

export default NftList;