
export interface Product {
    id : string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    tags: string[];
    title: string;
    //TODO type: Type;
    gender: Category;
}

export interface CartProduct{
    id : string;
    slug : string;
    title : string;
    quantity : number;
    size : string;
    price : number;
    image : string;
}

export type Category = 'men'|'women'|'kid'|'unisex';
export type Size = "5"|"5.5"|"6"|"6.5"|"7"|"7.5"|"8"|"8.5"|"9"|"9.5"|"10"|"10.5"|"11"|"12"|"13";
export type Type = 'sneakers'|'slides'|'shirts'|'jacket';