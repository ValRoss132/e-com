import { action, computed, makeObservable, observable } from "mobx";
import ProductsStore from "../ProductsStore";
import { ProductType } from "../ProductsStore/types";

export default class PaginationStore {
    currentPage: number = 1;
    productsPerPage = 9;
    productsStore: ProductsStore;

    constructor(productsStore: ProductsStore) {
        this.productsStore = productsStore;
        makeObservable<PaginationStore>(this, {
            currentPage: observable,
            lastProductsIndex: computed,
            firstProductsIndex: computed,
            currentProducts: computed,
            totalPages: computed,
            paginate: action,
        })
    }

    get lastProductsIndex(): number {
        return Math.min(this.currentPage * this.productsPerPage, this.productsStore.list.length);
    }

    get firstProductsIndex(): number {
        return Math.max(0, this.lastProductsIndex - this.productsPerPage);
    }

    get currentProducts(): ProductType[] {
        return this.productsStore.list.slice(this.firstProductsIndex, this.lastProductsIndex);
    }

    get totalPages(): number {
        return Math.ceil(this.productsStore.list.length / this.productsPerPage) || 1;
    }

    paginate = (pageNumber: number): void => {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
            this.currentPage = pageNumber;
        }
    }
}