
export interface Product {
    //todo: id : string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    type: Type;
    gender: Category;
}

export type Category = 'men'|'women'|'kid'|'unisex';
export type Size = 5|5.5|6|6.5|7|7.5|8|8.5|9|9.5|10|10.5|11|12|13;
export type Type = 'sneakers'|'slides'|'shirts'|'jacket';