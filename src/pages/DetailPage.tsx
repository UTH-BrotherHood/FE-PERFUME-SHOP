import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import 'react-medium-image-zoom/dist/styles.css';
import FBIcon from "../components/DetailPage/FBIcon";
import InsIcon from "../components/DetailPage/InsIcon";
import PinterestIcon from "../components/DetailPage/PinterestIcon";
import TwitterIcon from "../components/DetailPage/TwitterIcon";
import { fetchProductDetailsAsync, selectProductDetails } from "../store/features/productSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addToCart, addToWishlist } from "../apis/cartApi";
import { getUserDetails } from "../apis/UserApi";
import { setUser } from "../store/features/authSlice";
import { useToast } from "../components/ui/use-toast";


interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    category: string;
    description: string;
}

const products: Product[] = [
    { id: 1, name: 'Armaf Passion', description: 'this is desc', image: 'https://imgs.search.brave.com/YYoedtFQ-5pMUYc0HiZbP5WT_LQCKNPuY3jMOetk2lg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/NjA1MTU4MC9waG90/by9wZXJmdW1lLWJv/dHRsZS1vbi1ib2tl/aC1saWdodHMtYmFj/a2dyb3VuZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9LTVo/RS1RNXo4ZkFGY0ha/LS1Dcl9yUnN2VjR2/OWxDWEV4cXBLSEFY/ZmhmVT0', price: '$51.74', category: 'Women' },
    { id: 2, name: 'BVLGARI Extreme', description: 'this is desc', image: 'https://imgs.search.brave.com/WehMyYodpaLyjnFQZBZ0DH3ogle8WvdqTbavN8kr13Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/NTAzMDczL3Bob3Rv/L3BlcmZ1bWUuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTZv/VFAzZ3ZpM3R2Zjla/cWEtcWpyWi1Gc2lm/X0FvdlpJbjRfSVpz/cENMV2c9', price: '$51.74', category: 'Women' },
    { id: 3, name: 'Armaf Passion', description: 'this is desc', image: 'https://imgs.search.brave.com/k1VQOqkelQWFue91HGiKWiIyY-SpcN2ikF-kJvi66xw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTA1/OTYyMTQ2L3Bob3Rv/L3ZpbnRhZ2UtcGVy/ZnVtZS1ib3R0bGUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWltOUhBbGRFczRU/MXRxNzhBQzRQOXU1/TEN1em5VU3MwVGV4/bGdMYVptakk9', price: '$51.74', category: 'Women' },
    { id: 4, name: 'BVLGARI Extreme', description: 'this is desc', image: 'https://imgs.search.brave.com/1e3kPqPWdC66YCCUD_g6Qu6tN5m5cCzr-Q30QYnYN1c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTYy/NzQyNjgyL3Bob3Rv/L3BlcmZ1bWUtYm90/dGxlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1lc2ZvQm9W/NVlCVmVURlp0OHd1/a0dFZVNUY3hFdVBa/WnlHT3VrTUgwc253/PQ', price: '$51.74', category: 'Women' },
];


const SocialMediaLinks = [
    { path: "/MyAccount", icon: <FBIcon /> },
    { path: "/MyAccount", icon: <TwitterIcon /> },
    { path: "/MyAccount", icon: <PinterestIcon /> },
    { path: "/MyAccount", icon: <InsIcon /> }
];

function DetailPage() {
    const [activeTab, setActiveTab] = useState('brand');
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectProductDetails);
    const { toast } = useToast();


    useEffect(() => {
        if (productId) {
            dispatch(fetchProductDetailsAsync(productId));
        }


    }, [dispatch, productId]);

    const handleAddToCart = async () => {
        try {
            const result = await addToCart({ product_id: productId as string, quantity: 1 });
            toast({
                description: result.message,
                duration: 3000,
            });
        } catch (error) {
            toast({
                description: (error as any).response?.data?.message,
                duration: 3000,
            });
        }

    };

    const handleAddToWishlist = async () => {
        try {
            const result = await addToWishlist({ product_id: productId as string });

            const userDetails = await getUserDetails();





            dispatch(setUser(userDetails));

        } catch (error) {
            console.error('Error adding to wishlist', error);
        }
    };

    if (!product) {
        return <div>No product found.</div>;
    }

    return (
        <div className="px-[12rem]">
            <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="text-center font-semibold text-sm text-[#5c5c5c]">
                    Sale ends in: <span className="font-bold text-[#cf8699]">22 hrs 56 min 31 sec</span>
                </div>
                <InnerImageZoom
                    src={product.images[0]}
                    className="w-16 h-16 object-cover border-2 border-black mb-2"
                />
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/3 flex justify-center">
                        <InnerImageZoom
                            src={product.images[0]}
                            className="w-128 h-128 object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 md:ml-6 mt-6 md:mt-0 justify-center">
                        <div className="justify-center text-center">
                            <div className="flex justify-center space-between m-4">
                                <div className="bg-primary text-white py-1 px-4 font-bold">
                                    <h1 className="uppercase">women</h1>
                                </div>
                                <div className="ml-2"></div>
                                <div className="bg-gray-100 text-black py-1 px-4 font-bold">
                                    <h1 className="uppercase">Gucci</h1>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold mb-2 text-center">{product.name}</h1>
                            <div className="text-[#6f5173] underline cursor-pointer text-sm mb-4 inline-block text-center">View All {product.name} (2)</div>
                        </div>
                        <div className="text-center flex justify-between items-center">
                            <p className="text-left">{product.description}</p>
                            <p className="text-xs text-gray-500">Item# {product.id}</p>
                        </div>
                        <p className="text-sm mt-4 mb-4 text-secondary">Select size</p>
                        <select className="border w-full flex justify-center p-2 mb-4">
                            <option value="1.6oz">Eau De Toilette Spray 1.6 Oz</option>
                        </select>
                        <div className="flex justify-center items-center gap-2">
                            <div className="text-3xl font-bold">{product.price}</div>
                            <del className="text-gray-500">$88.00</del>
                            <div className="w-[15px] h-[15px] text-[12px] rounded-[50%] flex items-center justify-center text-[#c8c8c8] border-[1px] border-[#c8c8c8]">?</div>
                        </div>
                        <section className="flex items-center justify-center mb-4">
                            <div className="text-sm text-black font-semibold text-center mr-6"><span className="font-normal text-secondary">or</span> 4 payments of $15.37 with <span className="underline text-secondary">Zip</span></div>
                        </section>
                        <div className="flex justify-center items-center gap-6 mb-4">
                            <button
                                onClick={handleAddToCart}
                                className="bg-primary text-white py-3 px-12 text-sm uppercase rounded-md shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleAddToWishlist}
                                className="border-2 border-primary text-secondary py-3 px-8 text-sm uppercase rounded-md shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                            >
                                Add to Wish
                            </button>
                        </div>
                        <div className="text-xs font-normal underline text-center mb-4 cursor-pointer">Save 15% - Get Code</div>
                        <div className="text-xs font-normal underline text-center mb-4 cursor-pointer">Select a 5-piece sampler with your order. Click to learn more.</div>
                        <div className="text-xs text-gray-500 text-center mb-4">*Discounts and promotions are applied to the lowest MSRP or sale price</div>
                        <div className="flex justify-center items-center space-x-4">
                            {SocialMediaLinks.map((link, index) => (
                                <Link key={index} to={link.path} className="flex items-center">
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="inline-flex flex-col h-30 bg-[#f5f6f6] ">
                    <div className="flex">
                        <div
                            className={`cursor-pointer uppercase text-sm p-3 flex items-center justify-center font-bold text-black ${activeTab === 'brand' ? ' bg-white border-[1px] border-[#e1e1e1] ' : ''}`}
                            onClick={() => setActiveTab('brand')}
                        >
                            Brand Information
                        </div>
                        <div
                            className={`cursor-pointer uppercase  text-sm p-3 flex items-center justify-center font-bold text-black ${activeTab === 'product' ? ' bg-white border-[1px] border-[#e1e1e1] ' : ''}`}
                            onClick={() => setActiveTab('product')}
                        >
                            Product Information
                        </div>
                    </div>



                </div>
                <div className="p-10 w-full text-black bg-[#f5f6f6] ">
                    {activeTab === 'brand' && (
                        <div>
                            <h2 className="font-bold text-sm mb-4">Brand Description</h2>
                            <p className="text-sm text-secondary">Delight Your Senses And Boost Confidence With The Gucci Bamboo Eau De Toilette Spray For Women. Crafted By Gucci In The Year 2015, The Top Notes Of Orange,
                                Bergamot, And Pear Stimulate The Senses And Offer Lasting Freshness. Casablanca Lily, Ylang Ylang, And Jasmine Lend A Sweet And Enchanting Floral Aroma At The
                                Heart For A Perfume That Will Bring A Twinkle To Your Eye. With Warm And Striking Base Notes Of Vanilla, Musk, And Sandalwood, The Perfume Is So Soft, Creamy,
                                And Feminine.</p>
                        </div>
                    )}
                    {activeTab === 'product' && (
                        <div>
                            <h2 className="font-bold text-sm mb-4">Product Description</h2>
                            <p className="text-sm text-secondary">Delight Your Senses And Boost Confidence With The Gucci Bamboo Eau De Toilette Spray For Women. Crafted By Gucci In The Year 2015, The Top Notes Of Orange,
                                Bergamot, And Pear Stimulate The Senses And Offer Lasting Freshness. Casablanca Lily, Ylang Ylang, And Jasmine Lend A Sweet And Enchanting Floral Aroma At The
                                Heart For A Perfume That Will Bring A Twinkle To Your Eye. With Warm And Striking Base Notes Of Vanilla, Musk, And Sandalwood, The Perfume Is So Soft, Creamy,
                                And Feminine.</p>
                        </div>
                    )}
                </div>

            </div>
            <h1 className="mt-10 font-bold text-xl">Customers also liked</h1>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-6">
                {products.map((d) => (
                    <div key={d.id} className='h-[30rem] py-[0.7rem] px-[1.3rem] items-center inline-flex flex-col justify-center'>
                        <div className='w-full flex justify-between mb-2'>
                            <div className='flex items-center justify-center bg-primary text-white w-[3.3rem] h-5 font-extrabold text-[0.525rem]'>WOMEN</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
                                <path d="M17.4637 2.93537L17.4723 2.95055L17.4814 2.96541C17.6552 3.24957 17.7859 3.55447 17.8703 3.87113L17.8714 3.87523C17.9621 4.2092 18.0051 4.55286 17.9995 4.89708L17.9993 4.9084L17.9994 4.91972C18.0037 5.56691 17.826 6.20599 17.4812 6.77021L17.4744 6.78128L17.4679 6.79252C17.3006 7.08293 17.0866 7.3532 16.8347 7.59043L16.8347 7.5904L16.8285 7.59628L9.5 14.6153L2.17148 7.59628L2.17148 7.59628L2.1687 7.59364C1.91315 7.35074 1.69287 7.07797 1.51283 6.78268C1.34654 6.49259 1.21721 6.18546 1.12712 5.86779C1.04287 5.55653 1.00059 5.23569 1.00059 4.91313V4.90516L1.00047 4.89719C0.994977 4.5529 1.03799 4.20917 1.12858 3.87512L1.12864 3.87514L1.13153 3.86399C1.29908 3.21675 1.65374 2.62162 2.16155 2.14837L2.1616 2.14842L2.17027 2.14015C2.54686 1.78067 2.99494 1.49249 3.49067 1.2935C4.48785 0.902415 5.60777 0.902166 6.60511 1.29275C7.05954 1.4776 7.47668 1.73272 7.84015 2.04637L7.86349 2.0732L7.89336 2.10752L7.92622 2.13899L8.8083 2.98383L9.5 3.64632L10.1917 2.98383L11.0738 2.13899L11.1066 2.10753L11.1365 2.07321L11.1598 2.04637C11.5233 1.73272 11.9405 1.47759 12.3949 1.29275C13.3922 0.902162 14.5122 0.902417 15.5093 1.29351C16.0051 1.4925 16.4531 1.78067 16.8297 2.14015L16.8356 2.14572L16.8415 2.1512C17.0911 2.3819 17.3006 2.64662 17.4637 2.93537Z" stroke="#C4C4C4" strokeWidth="2" />
                            </svg>
                        </div>
                        <img className='w-56 h-56' src={d.image} alt="" />
                        <Link to={`/product/${d.id}`} className='text-sm font-bold uppercase text-center mt-[1.89rem]'>{d.name}</Link>
                        <p className='py-[0.812rem] text-sm text-center'>{d.description}</p>
                        <p className='text-[0.812rem] text-center'>from <span className='font-bold text-lg'>{`$${d.price}`}</span></p>
                        <div className='border-[1px] border-[#C4C4C4] w-full h-[2.875rem] justify-center items-center flex mt-4 text-sm font-bold uppercase'>ADD TO BAG</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DetailPage;
