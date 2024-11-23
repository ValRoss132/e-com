import { action, computed, makeObservable, observable } from "mobx";
import { Meta } from "../../utils/meta";
import { IProductStore, ProductType } from "./types";
import ApiStore from "../ApiStore";
import { ApiResponse, HTTPMethod } from "../ApiStore/ApiStore";

const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

type PrivateFields = "_list" | "_meta" | "_item";

export default class ProductsStore implements IProductStore {
    private readonly _apistore = new ApiStore(BASE_URL);

    private _item: ProductType = {
        id: NaN,
        title: '',
        price: NaN,
        description: '',
        images: [],
        category: {id: NaN, name: '', image: ''}
    };
    private _list: ProductType[] = [];
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<ProductsStore, PrivateFields>(this, {
            _item: observable,
            _list: observable,
            _meta: observable,
            item: computed,
            list: computed,
            meta: computed,
            getProductList: action,
            getProductById: action
        })
    }

    get item(): ProductType {
        return this._item
    }

    get list(): ProductType[] {
        return this._list;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getProductList(): Promise<void> {
        this._meta = Meta.loading;
        this._list = [];

        const response: ApiResponse<ProductType[]> = await this._apistore.request({
            method: HTTPMethod.GET,
            url: ''
        })

        if (response.success && response.data) {
            this._meta = Meta.success;
            this._list = response.data;
        } else {
            this._meta = Meta.error;
        }
    }

    async getProductById(id: string): Promise<void> {
        this._meta = Meta.loading;
        this._item = {
            id: NaN,
            title: '',
            price: NaN,
            description: '',
            images: [],
            category: {id: NaN, name: '', image: ''}
        };
        const response: ApiResponse<ProductType> = await this._apistore.request({
            method: HTTPMethod.GET,
            url: `/${id}`
        })
        if (response.success && response.data) {
            this._meta = Meta.success;
            this._item = response.data;
        } else {
            this._meta = Meta.error
        }
    }

    async getRelatedProducts(categoryId: number): Promise<void> {
        this._meta = Meta.loading;
        this._list = [];

        const response: ApiResponse<ProductType[]> = await this._apistore.request({
            method: HTTPMethod.GET,
            url: '',
        })
        if (response.success && response.data) {
            this._meta = Meta.success;
            this._list = response.data.filter((item) => item.category.id === categoryId).slice(0, 3);
        } else {
            this._meta = Meta.error;
        }
    }

    destroy(): void {
        
    }
}
