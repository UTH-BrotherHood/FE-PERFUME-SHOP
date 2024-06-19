export interface PaginationParams {
    page: number;
    limit: number;
}
export interface IProductTypeFilter {
    page?: number;
    limit?: number;
    category?: string;
    price?: number;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort? : string;
}