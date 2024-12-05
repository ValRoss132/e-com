import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Meta } from "../../utils/meta";
import ApiStore from "../ApiStore";
import { CategoryType, ICategoryStore } from "./types";
import { ApiResponse, HTTPMethod } from "../ApiStore/ApiStore";

const BASE_URL = 'https://api.escuelajs.co/api/v1/categories';

type PrivateFields = '_list' | '_meta';

export default class CategoriesStore implements ICategoryStore {
    private readonly _apistore = new ApiStore(BASE_URL);

    private _list: CategoryType[] = [];
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<CategoriesStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            list: computed,
            meta: computed,
            getCategoryList: action,
        })
    }

    get list(): CategoryType[] {
        return this._list;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getCategoryList(): Promise<void> {
        this._meta = Meta.loading;
        this._list = [];
        
        try {
            const response: ApiResponse<CategoryType[]> = await this._apistore.request({
                method: HTTPMethod.GET,
                url: ''
            })
            runInAction(() => {
                if (response.success && response.data) {
                    this._meta = Meta.success;
                    this._list = this.removeDuplicateCategories(response.data);
                } else {
                    this._meta = Meta.error;
                }
            })
        } catch {
            runInAction(() => {
                this._meta = Meta.error;
            })
        }
    } 

    private removeDuplicateCategories(categories: CategoryType[]): CategoryType[] {
        const uniqueNames = new Set();
        return categories.filter(category => {
            const isUnique = !uniqueNames.has(category.name);
            uniqueNames.add(category.name);
            return isUnique;
        });
    }
    
    destroy(): void {

    }
}