import React, { useEffect, useState } from 'react';
import http from '../utils/http';

interface IWishlistItem {
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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-primary">Wishlist</h1>
            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
                <thead className="bg-primary text-white">
                    <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Discount</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {wishlistItems.map(item => (
                        <tr key={item.id} className="border-t">
                            <td className="py-3 px-4">{item.name}</td>
                            <td className="py-3 px-4">{item.price}</td>
                            <td className="py-3 px-4">{item.discount}</td>
                            <td className="py-3 px-4">
                                <span className={item.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                                    {item.stock > 0 ? 'In stock' : 'Out of stock'}
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                <button
                                    onClick={() => addToCart(item)}
                                    className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark"
                                >
                                    Add to Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Wishlist;
