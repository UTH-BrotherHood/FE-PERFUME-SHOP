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
    // Add more products as needed
  ];
  const ServiceLinks = [
    { path: "/MyAccount", label: "Free Delivery & Returns", icon: <TbTruckDelivery /> },
    { path: "/MyAccount", label: "Online Self-Service", icon: <MdMiscellaneousServices /> },
    { path: "/MyAccount", label: "100% Genuine Guarantee", icon: <IoCheckmarkCircleOutline /> },
    { path: "/MyAccount", label: "Secure Payment", icon: <RiSecurePaymentLine /> },
    { path: "/MyAccount", label: "100% Authentic Products", icon: <RiSecurePaymentLine /> },
  ];

  const SocialMediaLinks = [
    
    { path: "/MyAccount", icon: <CiFacebook /> },
    { path: "/MyAccount", icon: <FaInstagram /> },
    { path: "/MyAccount", icon: <CiTwitter /> },
    { path: "/MyAccount", icon: <CgMail /> }

];
function DetailPage() {
    const imageUrl = "https://imgs.search.brave.com/6ldLo3qzP-uU2dU7yFRY7cUPXi2YFToFdkxXaSNxrrA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAw/MjA2NTE3OC9waG90/by9ib3R0bGUtb2Yt/cGVyZnVtZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9Z2x3/NUhHMWVOTmVGVTY4/VVlyWDZoZUZyak9U/S2tUSE95NEpuTW5P/cXJ2bz0";
    return (
    <><div className="px-[12rem]">
            <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="text-center text-sm text-red-600">Sale ends in: <span className="font-bold">22 hrs 56 min 31 sec</span></div>
                <InnerImageZoom
                    src={imageUrl}
                    alt="Gucci Bamboo Thumbnail"
                    className="w-16 h-16 object-cover border-2 border-black mb-2" />

                <div className="flex flex-col md:flex-row ">
                    <div className=" md:w-2/3 flex justify-center">
                        <InnerImageZoom
                                
                                    src= {imageUrl}
                                    alt= "Gucci Bamboo Thumbnail"
                                    className= "w-128 h-128 object-cover"
                                    />                 

                    </div>
                    <div className="md:w-1/2 md:ml-6 mt-6 md:mt-0 justify-center">
                    <div className="justify-center text-center">
                        <div className="flex mr-6 justify-center space-between m-4">
                            <div className="bg-primary text-white py-1 px-4 font-bold">
                                <h1>women</h1>
                            </div>
                            <div className="ml-2"></div>
                            <div className="bg-gray-100 text-black py-1 px-4 font-bold">
                                <h1>Gucci</h1>
                            </div>
                        </div>
                            <h1 className="text-3xl font-bold mb-2 text-center mr-6">GUCCI BAMBOO</h1>
                            <a href="#" className="text-purple-600 hover:underline mb-4 inline-block text-center mr-6">View All Gucci Bamboo (2)</a>
                        </div>
                        <div className="text-center flex justify-between items-center">
                            <p className="text-left">Eau De Toilette Spray 2.5 Oz</p>
                            <p className="text-xs text-gray-500 mr-16">Item# 300257</p>
                        </div>

                        <p className="text-sm mt-4 mb-4">Select one</p>
                        <select className="border p-2 rounded mb-4">
                            <option value="1.6oz">Eau De Toilette Spray 1.6 Oz</option>
                        </select>
                        <div className="flex justify-center mr-6">
                            <div className="text-3xl font-bold mb-2 ">$61.49</div>
                            <div className="text-gray-500 mb-4 line-through">$88.00</div>
                        </div>

                        <p className="text-sm text-gray-500 mb-4 text-center mr-6">or 4 payments of $15.37 with <span className=" text-green-600 font-bold">afterpay</span></p>

                        <div className="flex items-center mb-4 text-center">
                            <input type="number" min="1" className="border p-2 rounded w-16" defaultValue="1" />
                            <button className="bg-primary text-white py-2 px-4 rounded ml-4 w-2/3">Add to Bag</button>
                        </div>
            
                        <div className="flex space-x-4 mb-4 justify-center mr-4">
                           <p className="text-sm italic">
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
                            <button className="py-2 px-4 align-items: center border border-slate-950 hover:border-slate-300 mt-4 text-black w-full rounded border-black">
                                Add to Bag
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