import { Avatar } from "@douyinfe/semi-ui";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import { memo } from "react";
import icon from "../constants/icon";

const Logo = memo(() => {
    return (
        <div className='flex' onClick={() => window.location.href = window.location.origin} style={{ cursor: 'pointer' }}>
            {/* <Avatar size="small" style={{ marginRight: '8px' }}>
                <img src={icon.logo} alt="" />
            </Avatar> */}
            <Text>
                <h1 style={{ fontSize: '24px', fontStyle: 'normal' }}>
                    <a href={window.location.origin} style={{ color: 'inherit', fontSize: '45px' }}>
                        Page
                    </a>
                </h1>
            </Text>
            {/* <Button onClick={() => {
          console.log(icon);
        }}>
          测试
        </Button> */}
        </div>
    )
})

export default Logo;