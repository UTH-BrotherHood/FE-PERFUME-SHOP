import Icon1 from "../components/svg/footer/Icon1"
import Icon2 from "../components/svg/footer/Icon2"
import Icon3 from "../components/svg/footer/Icon3";
import Icon4 from "../components/svg/footer/Icon4";
import Icon5 from "../components/svg/footer/Icon5";
import FbLogo from "../assets/SocialLogo/Facebook.svg";
import InsLogo from "../assets/SocialLogo/Ins.svg";
import PinterestLogo from "../assets/SocialLogo/Pinterest.svg";
import XLogo from "../assets/SocialLogo/X.svg";
import YoutubeLogo from "../assets/SocialLogo/Youtube.svg";
import MultiCreditCard from "../components/svg/footer/MultiCreditCard";
import UsaFlag from "../components/svg/footer/UsaFlag";
import LuxuryLogo from "../components/svg/footer/LuxuryLogo";
function Footer() {
    const footerItems = [
        { icon: <Icon1 />, text: "Free Delivery & Returns*" },
        { icon: <Icon2 />, text: "Online Self-Service" },
        { icon: <Icon3 />, text: "100% Genuine Guaranteed" },
        { icon: <Icon4 />, text: "Secure Payment" },
        { icon: <Icon5 />, text: "100% authentic products" }
    ];

    return (
        <div>
            <div className="flex w-full py-2 justify-around bg-primary text-[#F5F6F6]">
                {footerItems.map((item, index) => (
                    <div className="flex gap-3" key={index}>
                        {item.icon}
                        <div className="text-[0.8125rem]">
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex bg-[#F5F6F6]">
                <div className="flex flex-col  gap-[1.5rem] w-[50%] px-12 py-8 bg-[#F5F6F6] border border-r-[#CCC]">
                    <h3 className="font-bold">Subscribe for Special Offers and Promotions</h3>
                    <form action="" className="flex items-center gap-5">
                        <input type="text" placeholder="Your Email" className="focus:outline-none h-[2.25rem] border-[2px] px-3 border-b-black" />
                        <input type="text" placeholder="Your Mobile" className="focus:outline-none h-[2.25rem] border-[2px] px-3 border-b-black" />
                        <button className="h-[2.25rem] border-[2px] px-8 border-black font-[750] hover:bg-slate-100">Subscribe</button>
                    </form>
                    <div className="text-[0.75rem]">By entering your email and clicking “subscribe”, you consent to receive marketing emails from e.l.f. You can unsubscribe at any time through the unsubscribe link in each email. See our <a href="" className="underline">Privacy Notice</a> for more details, including how your personal information is used and shared.</div>
                </div>
                <div className="flex flex-col gap-6 w-[50%] px-12 py-8 border border-l-[#CCC]">
                    <div>
                        <h3 className="font-bold">Need help? </h3>
                        <p className="text-[0.875rem]">info@perfumeshop.com</p>
                    </div>
                    <div>
                        <h3 className="font-bold">Visit Us</h3>
                        <p className="text-[0.875rem]">PerfumeShop, Inc</p>
                        <p className="text-[0.875rem]">789 Ocean Ave.</p>
                        <p className="text-[0.875rem]">Coral City, CA 90210</p>
                    </div>
                </div>
            </div>

            <div className="flex px-12 py-8 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <ul>
                            <li><a href="#" className="text-gray-600">Company Information</a></li>
                            <li><a href="#" className="text-gray-600">Careers</a></li>
                            <li><a href="#" className="text-gray-600">Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                        <ul>
                            <li><a href="#" className="text-gray-600">Contact Us</a></li>
                            <li><a href="#" className="text-gray-600">Order Tracking</a></li>
                            <li><a href="#" className="text-gray-600">Returns</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul>
                            <li><a href="#" className="text-gray-600">Blog</a></li>
                            <li><a href="#" className="text-gray-600">Guides</a></li>
                            <li><a href="#" className="text-gray-600">Help Center</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-5 h-[2rem]">
                            <img src={FbLogo} alt="FbLogo" />
                            <img src={InsLogo} alt="InsLogo" />
                            <img src={YoutubeLogo} alt="YoutubeLogo" />
                            <img src={XLogo} alt="XLogo" />
                            <img src={PinterestLogo} alt="PinterestLogo" />
                        </div>
                        <div className="flex">
                            <UsaFlag />
                            <p>Change Country</p>
                        </div>
                        <div>
                            <LuxuryLogo />
                        </div>
                    </div>
                </div>
            </div>



            <div className="bg-black py-4 flex flex-col justify-center gap-8 items-center text-text text-[0.875rem] font-thin">
                <div className="flex gap-8">
                    <p>Customer Service Code: 0A</p>
                    <p>Privacy Policy   |   CA Privacy Notice</p>
                    <p>Entire contents Copyright © 1997-2023. PerfumeShop.com, Inc.</p>
                </div>
                <div className="text-center">
                    <p>PerfumeShop.com is an independent retailer carrying genuine brand name Perfumes, skincare, haircare, candles and makeup.</p>
                    <p>PerfumeShop and PerfumeShop.com are trademarks of PerfumeShop, Inc. and are Registered in the US Patent & Trademark Office.</p>
                </div>
                <div>
                    <p>All Rights Reserved.</p>
                </div>
                <div>
                    <MultiCreditCard />
                </div>
            </div>
        </div>
    )
}

export default Footer