// import { ShopInfo } from "src/interfaces/shop";
// import { GoodsInfo } from "./goods";

export interface BuyOrder {
    order_meituan_write_off_id: number;
    create_at: string;
    shop_id: number;
    price: number;
    type: number;
    status: number;
    // shop: ShopInfo;
    type_message: string;
    status_message: string;
}

export interface MealOrder {
    status_message: string;
    order_happy_birthday_id: number;
    create_at: string;
    shop_id: number;
    status: number;
    freight: number;
    price: number;
    // shop: ShopInfo;
    // products: GoodsInfo[];
}

/* interface GoodsInfo {
    a:number;
} */