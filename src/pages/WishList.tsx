import React, { useEffect, useState } from 'react';
import http from '../utils/http';

interface IWishlistItem {
    images: string[];
    id: string;
    name: string;
    price: string;
    discount: number;
    stock: number;
}

const Wishlist: React.FC = () => {
    const [wishlistItems, setWishlistItems] = useState<IWishlistItem[]>([]);
    const getToken = () => {
        return localStorage.getItem('accessToken') || '';
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = getToken();
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await http.get('/wishlist', config);
                setWishlistItems(response.data.result);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
    }, []);

    const addToCart = (item: IWishlistItem) => {
        console.log(`Adding ${item.name} to cart`);
    };

    return (
        <div className="border border-gray-200 bg-white">
            <div className="flex items-center font-bold py-4 pl-6 rounded-t border-b border-gray-200 bg-white text-gray-900 text-sm uppercase">
               Wish list
            </div>
            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
                <thead className="bg-[#F5F5F7] text-[#8B8E99] text-[0.7rem]">
                    <tr>
                        <th className="py-3 px-4">Image</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Price</th>
                        
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {wishlistItems.map(item => (
                        <tr key={item.id} className="border-t">
                            <td className="py-3 pl-14 "><img className="w-20 h-20" src={item.images[0]} alt="" /></td>
                            <th className="text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap font-public-sans text-sm font-normal leading-5 w-58">{ item.name}</th>
                            <th className="py-3 px-4 font-normal text-sm">${item.price}</th>
                          
                            <th className="py-3 px-4 font-semibold">
                                <span className={item.stock > 0 ? 'text-[#25B800]' : 'text-red-500'}>
                                    {item.stock > 0 ? 'In stock' : 'Out of stock'}
                                </span>
                            </th>
                            <th className="py-3 px-4 ">
                                <button
                                    onClick={() => addToCart(item)}
                                    className="bg-primary font-semibold text-white py-2 px-4 rounded hover:bg-primary-dark"
                                >
                                    Add to Cart
                                </button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Wishlist;
