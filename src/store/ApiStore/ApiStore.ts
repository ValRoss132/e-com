import axios from 'axios'

export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export type ApiResponse<T> = {
    success: boolean,
    data?: T,
}

export default class ApiStore  {

    constructor(private url: string) {}

    async request<T>( options: {method: HTTPMethod, url: string}): Promise<ApiResponse<T>> {
        const url = this.url + options.url
        try {
            const response = await axios({
                method: options.method,
                url
            })
            return {success: true, data: response.data}
        } catch {
            return {success: false};
        }
    }
}