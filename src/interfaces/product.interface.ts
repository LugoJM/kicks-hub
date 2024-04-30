
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

export interface ProductImage {
    id : number;
    url : string;
};

type Category = 'men'|'women'|'kid'|'unisex';
