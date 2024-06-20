import React from "react"
import 'react-medium-image-zoom/dist/styles.css';
import Zoom from 'react-medium-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { MdMiscellaneousServices } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import { MdZoomOutMap } from "react-icons/md";
import InnerImageZoom from "react-inner-image-zoom";
import FBIcon from "../components/DetailPage/FBIcon";
import TwitterIcon from "../components/DetailPage/TwitterIcon";
import PinterestIcon from "../components/DetailPage/PinterestIcon";
import InsIcon from "../components/DetailPage/InsIcon";

interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    category: string;
}

const products: Product[] = [
    { id: 1, name: 'Armaf Passion', image: 'https://imgs.search.brave.com/YYoedtFQ-5pMUYc0HiZbP5WT_LQCKNPuY3jMOetk2lg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/NjA1MTU4MC9waG90/by9wZXJmdW1lLWJv/dHRsZS1vbi1ib2tl/aC1saWdodHMtYmFj/a2dyb3VuZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9LTVo/RS1RNXo4ZkFGY0ha/LS1Dcl9yUnN2VjR2/OWxDWEV4cXBLSEFY/ZmhmVT0', price: '$51.74', category: 'Women' },
    { id: 2, name: 'BVLGARI Extreme', image: 'https://imgs.search.brave.com/WehMyYodpaLyjnFQZBZ0DH3ogle8WvdqTbavN8kr13Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/NTAzMDczL3Bob3Rv/L3BlcmZ1bWUuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTZv/VFAzZ3ZpM3R2Zjla/cWEtcWpyWi1Gc2lm/X0FvdlpJbjRfSVpz/cENMV2c9', price: '$51.74', category: 'Women' },
    { id: 3, name: 'Armaf Passion', image: 'https://imgs.search.brave.com/k1VQOqkelQWFue91HGiKWiIyY-SpcN2ikF-kJvi66xw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTA1/OTYyMTQ2L3Bob3Rv/L3ZpbnRhZ2UtcGVy/ZnVtZS1ib3R0bGUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWltOUhBbGRFczRU/MXRxNzhBQzRQOXU1/TEN1em5VU3MwVGV4/bGdMYVptakk9', price: '$51.74', category: 'Women' },
    { id: 4, name: 'BVLGARI Extreme', image: 'https://imgs.search.brave.com/1e3kPqPWdC66YCCUD_g6Qu6tN5m5cCzr-Q30QYnYN1c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTYy/NzQyNjgyL3Bob3Rv/L3BlcmZ1bWUtYm90/dGxlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1lc2ZvQm9W/NVlCVmVURlp0OHd1/a0dFZVNUY3hFdVBa/WnlHT3VrTUgwc253/PQ', price: '$51.74', category: 'Women' },

];


const SocialMediaLinks = [

    { path: "/MyAccount", icon: <FBIcon /> },
    { path: "/MyAccount", icon: <TwitterIcon /> },
    { path: "/MyAccount", icon: <PinterestIcon /> },
    { path: "/MyAccount", icon: <InsIcon /> }

];
function DetailPage() {
    const imageUrl = "https://imgs.search.brave.com/6ldLo3qzP-uU2dU7yFRY7cUPXi2YFToFdkxXaSNxrrA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAw/MjA2NTE3OC9waG90/by9ib3R0bGUtb2Yt/cGVyZnVtZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9Z2x3/NUhHMWVOTmVGVTY4/VVlyWDZoZUZyak9U/S2tUSE95NEpuTW5P/cXJ2bz0";
    return (
        <><div className="px-[12rem]">
            <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="text-center font-semibold text-sm text-[#5c5c5c]">Sale ends in: <span className="font-bold text-[#cf8699]">22 hrs 56 min 31 sec</span></div>
                <InnerImageZoom
                    src={imageUrl}

                    className="w-16 h-16 object-cover border-2 border-black mb-2" />

                <div className="flex flex-col md:flex-row ">
                    <div className=" md:w-2/3 flex justify-center">
                        <InnerImageZoom

                            src={imageUrl}

                            className="w-128 h-128 object-cover"
                        />

                    </div>
                    <div className="md:w-1/2 md:ml-6 mt-6 md:mt-0 justify-center">
                        <div className="justify-center text-center ">
                            <div className="flex justify-center space-between m-4">
                                <div className="bg-primary text-white py-1 px-4 font-bold">
                                    <h1 className="uppercase">women</h1>
                                </div>
                                <div className="ml-2"></div>
                                <div className="bg-gray-100 text-black py-1 px-4 font-bold">
                                    <h1 className="uppercase">Gucci</h1>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold mb-2 text-center">GUCCI BAMBOO</h1>
                            <div className="text-[#6f5173] underline cursor-pointer text-sm mb-4 inline-block text-center ">View All Gucci Bamboo (2)</div>
                        </div>
                        <div className="text-center flex justify-between items-center">
                            <p className="text-left">Eau De Toilette Spray 2.5 Oz</p>
                            <p className="text-xs text-gray-500">Item# 300257</p>
                        </div>

                        <p className="text-sm mt-4 mb-4 text-secondary">Select size</p>
                        <select className="border w-full flex justify-center p-2  mb-4">
                            <option value="1.6oz">Eau De Toilette Spray 1.6 Oz</option>
                        </select>
                        <div className="flex justify-center items-center gap-2">
                            <div className="text-3xl font-bold  ">$61.49</div>
                            <del className="text-gray-500 ">$88.00</del>
                            <div className="w-[15px] h-[15px] text-[12px] rounded-[50%] flex items-center justify-center text-[#c8c8c8] border-[1px] border-[#c8c8c8]">?</div>
                        </div>
                        <section className="flex items-center justify-center mb-4 ">
                            <div className="text-sm text-black font-semibold  text-center mr-6 "><span className="font-normal text-secondary">or</span> 4 payments of $15.37 with</div>
                            <div className=" text-green-600 mr-3font-bold bg-[#b2fce4] py-2 px-1 rounded-md flex item-center">afterpay</div>
                            <div className="w-[15px] h-[15px] text-[12px] rounded-[50%] flex items-center justify-center text-[#c8c8c8] border-[1px] border-[#c8c8c8]">?</div>
                        </section>


                        <div className="flex items-center mb-4 text-center">
                            <input type="number" min="1" className="border p-3 rounded w-16" defaultValue="1" />
                            <button className="bg-primary text-white uppercase font-semibold py-3 px-4  ml-4 w-full">Add to Bag</button>
                        </div>

                        <div className="flex space-x-4 mb-4 justify-center mr-4">
                            <p className="text-sm italic text-secondary">
                                Share:
                            </p>

                            {SocialMediaLinks.map(link => (
                                <Link className="flex text-sm items-center " to={""}>
                                    <span className="">{link.icon}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="flex items-center mb-8 justify-center mr-16 italic font-thin ">
                    <div className="text-center mr-4">
                        <MdZoomOutMap />
                    </div>
                    <div className="text-center text-xs">
                        <p>Zoom image</p>
                    </div>
                </div>
                <div className="bg-gray-100 border-t pt-4 g-white p-4 rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">Description:</h2>
                    <p className="text-gray-700">Delight Your Senses And Boost Confidence With The Gucci Bamboo Eau De Toilette Spray For Women. Crafted By Gucci In The Year 2015, The Top Notes Of Orange, Bergamot, And Pear Stimulate The Senses And Offer Lasting Freshness. Casablanca Lily, Ylang Ylang, And Jasmine Lend A Sweet And Enchanting Floral Aroma At The Heart For A Perfume That Will Bring A Twinkle To Your Eye. With Warm And Striking Base Notes Of Vanilla, Musk, And Sandalwood, The Perfume Is So Soft, Creamy, And Feminine.</p>
                </div>
            </div>
            <p className="text-2xl text-center font-bold mt-8">RECOMMEND FOR YOU</p>
            <div className="container mx-auto px-4 py-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg text-center">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <p className="text-gray-700">{product.price}</p>
                            <p className="text-sm text-gray-500">{product.category}</p>
                            <button className="py-2 px-4 align-items: center border  uppercase hover:border-slate-300 mt-4 text-black w-full rounded border-black">
                                Add to BaG
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
            {/*         <div className="flex justify-center items-center py-1 px-[3rem] bg-primary text-text">

            {ServiceLinks.map(link => (
                <Link key={link.label} to={link.path} className="flex gap-[1rem] text-sm mr-4 ml-4 items-center">
                {link.icon}
                <span className="">{link.label}</span>
                </Link>
            ))}
            </div>*/}


        </>
    )
}



export default DetailPage;







