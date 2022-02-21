
import { memo, useMemo, useState } from "react";
import './index.scss'
const ImagesComponent = memo(({
    imgList = []
}: {
    imgList: String[],
}) => {
    return <div className="flex sss">
        {
            imgList.map((e: any, i: number) => {
                return <div className="item" >
                    <img className="img" src={e} alt="1" />

                </div>
            })
        }
    </div>

});

export default ImagesComponent;