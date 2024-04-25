
export interface Product {
    //todo: id : string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}

export type ValidSizes = 5|5.5|6|6.5|7|7.5|8|8.5|9|9.5|10|10.5|11|12|13;
export type ValidTypes = 'sneakers'|'slides'|'shirts'|'jacket';