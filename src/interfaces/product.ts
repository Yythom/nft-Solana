
interface specs_values {
    value_id: number,
    spec_id: string,
    value: string
}

interface product_specs {
    spec_name: string,
    spec_id: string,
    spec_values: specs_values[]
}

export interface Goods {
    product_id: string,
    product_name: string,
    discount_price: number,
    num?: number,
    member_price?: number,
    product_specs: product_specs[]
}

