import { useLocation } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

function DashBoardUser({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <>
            <Header />
            <div className="px-24 py-12">
                {/* <div className="p-4 text-2xl font-bold border-b border-gray-700">
                Profile
            </div> */}
                <div className='flex gap-12'>
                    <nav className='w-1/5 py-4 text-sm h-full inline-flex flex-col items-start rounded border border-gray-100 bg-white shadow-md '>
                        <a
                            href="/MyAccount"
                            className={`w-full text-left items-start flex gap-[0.8rem] p-4 py-[0.8rem] hover:bg-primary-dark transition-colors ${location.pathname === '/MyAccount' ? 'bg-primary text-white' : 'text-gray-400'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none" className="stroke-current">
                                <path d="M19.7778 20.9997V18.7775C19.7778 17.5987 19.3095 16.4683 18.476 15.6348C17.6425 14.8013 16.5121 14.333 15.3333 14.333H6.44444C5.2657 14.333 4.13524 14.8013 3.30175 15.6348C2.46825 16.4683 2 17.5987 2 18.7775V20.9997" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.8888 9.88889C13.3434 9.88889 15.3332 7.89904 15.3332 5.44444C15.3332 2.98985 13.3434 1 10.8888 1C8.43418 1 6.44434 2.98985 6.44434 5.44444C6.44434 7.89904 8.43418 9.88889 10.8888 9.88889Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            My Account
                        </a>
                        <a
                            href="/wishlist"
                            className={`w-full text-left p-4 py-[0.8rem] items-start flex gap-[0.8rem] hover:bg-primary-dark transition-colors ${location.pathname === '/wishlist' ? 'bg-primary text-white' : 'text-gray-400'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none" className="stroke-current">
                                <path d="M22.1622 2.76815C21.6019 2.20759 20.9367 1.76292 20.2045 1.45954C19.4723 1.15615 18.6875 1 17.895 1C17.1024 1 16.3176 1.15615 15.5854 1.45954C14.8532 1.76292 14.188 2.20759 13.6277 2.76815L12.4649 3.93095L11.3021 2.76815C10.1703 1.6364 8.63536 1.00059 7.03482 1.00059C5.43429 1.00059 3.89931 1.6364 2.76756 2.76815C1.63581 3.89989 1 5.43487 1 7.03541C1 8.63594 1.63581 10.1709 2.76756 11.3027L3.93036 12.4655L12.4649 21L20.9994 12.4655L22.1622 11.3027C22.7228 10.7424 23.1674 10.0771 23.4708 9.34495C23.7742 8.61276 23.9304 7.82796 23.9304 7.03541C23.9304 6.24285 23.7742 5.45806 23.4708 4.72587C23.1674 3.99368 22.7228 3.32844 22.1622 2.76815Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Wishlist
                        </a>

                        <a
                            href="/orderhistory"
                            className={`w-full text-left items-start flex gap-[0.8rem]  p-4 py-[0.8rem] hover:bg-primary-dark transition-colors ${location.pathname === '/orderhistory' ? 'bg-primary text-white' : 'text-gray-400'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none" className="stroke-current">
                                <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11 5V11L15 13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Order History
                        </a>
                        <a
                            href="/address"
                            className={`w-full text-left items-start flex gap-[0.8rem]  p-4 py-[0.8rem] hover:bg-primary-dark transition-colors ${location.pathname === '/address' ? 'bg-primary text-white' : 'text-gray-400'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="22" viewBox="0 0 30 22" fill="none">
                                <path d="M26 1H3.5C2.11929 1 1 2.11929 1 3.5V18.5C1 19.8807 2.11929 21 3.5 21H26C27.3807 21 28.5 19.8807 28.5 18.5V3.5C28.5 2.11929 27.3807 1 26 1Z" stroke="#8B8E99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1 8.5H28.5" stroke="#8B8E99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Address
                        </a>

                    </nav>
                    <div className=" w-4/5">
                        {children}
                    </div>
                </div>

            </div>
            <Footer />
        </>


    );
}

export default DashBoardUser;
