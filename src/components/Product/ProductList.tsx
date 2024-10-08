import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductsAsync, selectProducts, selectTotalPages } from '../../store/features/productSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Pagination from '../common/Pagination';
import { addToCart, addToWishlist } from '../../apis/cartApi';
import { toast } from '../ui/use-toast';

interface Perfume {
    id?: string;
    category_id: string;
    name: string;
    description: string;
    discount: number;
    images: string[];
    stock: number;
    price: number;
    created_at?: Date;
    updated_at?: Date;
}

interface ProductListProps {
    brandFilter: string[];
    priceRangeFilter: [number, number] | null;
    sizeFilter: string[];
    genderFilter: string[];
}

const ProductList: React.FC<ProductListProps> = ({ brandFilter, priceRangeFilter, sizeFilter, genderFilter }) => {
    const products = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();
    const totalPages = useAppSelector(selectTotalPages);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProductsAsync({ page: currentPage, limit: 8 }));
    }, [currentPage, dispatch]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleAddToCart = async (productId: string) => {
        try {
            const result = await addToCart({ product_id: productId, quantity: 1 });
            toast({
                description: 'Product added to cart successfully!',
                duration: 3000,
            });
        } catch (error) {
            toast({
                description: (error as any).response?.data?.message || 'Failed to add product to cart.',
                duration: 3000,
            });
        }
    };
    const handleAddToWishlist = async (productId: string) => {
        try {
            const result = await addToWishlist({ product_id: productId});
            toast({
                description: 'Product added to wl successfully!',
                duration: 3000,
            });
        } catch (error) {
            toast({
                description: (error as any).response?.data?.message || 'Failed to add product to wl.',
                duration: 3000,
            });
        }
    };
    const applyFilters = (products: Perfume[]) => {
        let filteredProducts = products;

        if (brandFilter.length > 0) {
            filteredProducts = filteredProducts.filter(product => brandFilter.includes(product.category_id));
        }

        if (priceRangeFilter) {
            filteredProducts = filteredProducts.filter(product => product.price >= priceRangeFilter[0] && product.price <= priceRangeFilter[1]);
        }

        if (sizeFilter.length > 0) {
            filteredProducts = filteredProducts.filter(product => sizeFilter.includes(product.description)); // Adjust this to match your size attribute
        }

        if (genderFilter.length > 0) {
            filteredProducts = filteredProducts.filter(product => genderFilter.includes(product.description)); // Adjust this to match your gender attribute
        }

        return filteredProducts;
    };

    const filteredProducts = applyFilters(products);

    return (
        <div className='flex flex-col w-[80%] relative'>
            <div className='text-center'>
                <p className='font-bold text-3xl mt-2'>WOMEN'S PERFUME</p>
                <p className='text-secondary text-sm'>The Only Place To Shop The Latest Designer Perfumes At Discounts Up To 80% Off Department Store Prices. We <br />
                    Offer The Largest Selection Of The Latest Brand Name Perfumes And Discount Perfume Products, Shop And<br />
                    Save On All Women's Perfume Today.</p>
            </div>

            <div className='grid grid-cols-4 gap-4'>
                {filteredProducts.map((d) => (
                    <div key={d.id} className='h-[25rem] py-[0.7rem] px-[1.3rem] items-center inline-flex flex-col justify-center'>
                        <div className='w-full flex justify-between mb-2'>
                            <svg onClick={() => handleAddToWishlist(d.id as string)} xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
                                <path d="M17.4637 2.93537L17.4723 2.95055L17.4814 2.96541C17.6552 3.24957 17.7859 3.55447 17.8703 3.87113L17.8714 3.87523C17.9621 4.2092 18.0051 4.55286 17.9995 4.89708L17.9993 4.9084L17.9994 4.91972C18.0037 5.56691 17.826 6.20599 17.4812 6.77021L17.4744 6.78128L17.4679 6.79252C17.3006 7.08293 17.0866 7.3532 16.8347 7.59043L16.8347 7.5904L16.8285 7.59628L9.5 14.6153L2.17148 7.59628L2.17148 7.59628L2.1687 7.59364C1.91315 7.35074 1.69287 7.07797 1.51283 6.78268C1.34654 6.49259 1.21721 6.18546 1.12712 5.86779C1.04287 5.55653 1.00059 5.23569 1.00059 4.91313V4.90516L1.00047 4.89719C0.994977 4.5529 1.03799 4.20917 1.12858 3.87512L1.12864 3.87514L1.13153 3.86399C1.29908 3.21675 1.65374 2.62162 2.16155 2.14837L2.1616 2.14842L2.17027 2.14015C2.54686 1.78067 2.99494 1.49249 3.49067 1.2935C4.48785 0.902415 5.60777 0.902166 6.60511 1.29275C7.05954 1.4776 7.47668 1.73272 7.84015 2.04637L7.86349 2.0732L7.89336 2.10752L7.92622 2.13899L8.8083 2.98383L9.5 3.64632L10.1917 2.98383L11.0738 2.13899L11.1066 2.10753L11.1365 2.07321L11.1598 2.04637C11.5233 1.73272 11.9405 1.47759 12.3949 1.29275C13.3922 0.902162 14.5122 0.902417 15.5093 1.29351C16.0051 1.4925 16.4531 1.78067 16.8297 2.14015L16.8356 2.14572L16.8415 2.1512C17.0911 2.3819 17.3006 2.64662 17.4637 2.93537Z" stroke="#C4C4C4" strokeWidth="2" />
                            </svg>
                        </div>
                        <Link to={`/product/${d.id}`} className='h-56 overflow-hidden'>
                            <img className='w-full h-full object-cover transform transition-transform duration-200 hover:scale-125' src={d.images[0]} alt="" />
                        </Link>
                        <Link to={`/product/${d.id}`} className='text-sm font-bold uppercase text-center mt-[1.89rem]'>{d.name}</Link>
                        <p className='py-[0.812rem] text-sm text-center'>{d.description}</p>
                        <p className='text-[0.812rem] text-center'>from <span className='font-bold text-lg'>{`$${d.price}`}</span></p>
                        <div className='border-[1px] border-[#C4C4C4] w-full h-[2.875rem] justify-center items-center flex mt-4 text-sm font-bold uppercase' onClick={() => handleAddToCart(d.id as string)}>ADD TO BAG</div>
                    </div>
                ))}
            </div>
            <div className='relative bottom-0 left-[50%] translate-x-[-50%]'>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default ProductList;
