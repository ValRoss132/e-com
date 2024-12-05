

export type CategoryType = {
    id: number,
    name: string,
    image: string
}

export interface ICategoryStore {
    getCategoryList(): Promise<void>;
}