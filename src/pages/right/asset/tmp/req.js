import Axios from "axios"
import { filter } from "../../../../utils/js_utils/format"

const getAssetData = async ({ addr, code }) => {
    const result = await Axios.get(` https://api.genie.xyz/data/${addr}/${code}`)
    return filter(result)?.data
}
export {
    getAssetData
}