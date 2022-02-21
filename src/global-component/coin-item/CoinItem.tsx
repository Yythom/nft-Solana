import { Button } from "@douyinfe/semi-ui"
import Text from "@douyinfe/semi-ui/lib/es/typography/text"
import { Fragment, memo } from "react"
import './coinitem.scss'

interface CoinItemProps {
    onClick: Function,
    select_symbol?: string,
    e: {
        address: string,
        chainId?: number,
        decimals?: number,
        logoURI?: string,
        name?: string,
        symbol?: string,
    }
}

const CoinItem = memo(({ onClick, select_symbol, e }: CoinItemProps) => {
    return (
        <Fragment>
            <Button
                theme='solid'
                type='primary'
                style={{ height: '55px' }}
                disabled={select_symbol === e.symbol} key={e.address} className={`${select_symbol === e.symbol && 'disable-coin'} coin-search-item flex`}
                onClick={() => {
                    if (select_symbol === e.symbol) return
                    onClick()
                }}
            >
                <div className='flex'>
                    <img src={e.logoURI} alt='err' />
                    <Text>{e.symbol}</Text>
                </div>
            </Button>
        </Fragment>
    )
})

export default CoinItem;