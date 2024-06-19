export interface IProductData {
    data: IProductData;
    _id?: string;
    name: string;
    image: string;
    price: number;
    discount?: number | undefined;
    discountStartDate?: Date;
    discountEndDate?: Date;
    countInStock: number;
    rating: number;
    types: string[];
    brand: string;
    likedBy: string[];
    totalLikes: number;
    views: number;
    description: string;
    sold: number;
}