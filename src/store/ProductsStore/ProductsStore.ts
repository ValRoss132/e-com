import { computed, makeObservable, observable } from "mobx";
import { Meta } from "../../utils/meta";
import { ProductType } from "./types";
import ApiStore from "../ApiStore";
import { ApiResponse, HTTPMethod } from "../ApiStore/ApiStore";

const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

type PrivateFields = "_list" | "_meta";

export default class ProductsStore {
    private readonly _apistore = new ApiStore(BASE_URL);

    private _list: ProductType[] | undefined = [];
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<ProductsStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            list: computed,
            meta: computed
        })
    }

    get list(): ProductType[] | undefined {
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
        })

        if (response.success) {
            this._meta = Meta.success;
            this._list = response.data;
            return;
        } else {
            this._meta = Meta.error;
        }
    }

    destroy(): void {
        
    }
}
