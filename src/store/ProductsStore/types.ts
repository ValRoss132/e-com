

export type ProductCategory = {
    id: number;
    name: string;
    image: string;
}

export type ProductType = {
    id: number;
    title: string;
    price: number;
    category: ProductCategory;
    description: string;
    images: string[];
};

export interface IProductStore {
    getProductList(): Promise<void>;
}