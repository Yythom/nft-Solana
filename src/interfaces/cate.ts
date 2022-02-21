export interface children_cate {
    category_id: string,
    category_name: string,
    image: string,
}
export interface cate {
    category_id: string,
    category_name: string,
    image: string,
    children: children_cate[];
}
