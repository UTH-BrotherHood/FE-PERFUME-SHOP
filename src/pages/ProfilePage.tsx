import React, { useState } from 'react';
import Wishlist from './WishList';
import OrderHistory from './OrderHistory';

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('wishlist');

    return (
        <div className="flex">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="ml-64 p-4 flex-grow">
                {activeTab === 'wishlist' && <Wishlist />}
                {activeTab === 'orderhistory' && <OrderHistory />}
            </div>
        </div>
    );
};

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="w-64  bg-gray-900 text-white fixed shadow-lg">
            <div className="p-4 text-2xl font-bold border-b border-gray-700">
                Profile
            </div>
            <nav>
                <ul>
                    <li>
                        <button
                            onClick={() => setActiveTab('wishlist')}
                            className={`w-full text-left p-4 hover:bg-primary-dark transition-colors ${activeTab === 'wishlist' ? 'bg-primary text-white' : 'text-gray-400'
                                }`}
                        >
                            Wishlist
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('orderhistory')}
                            className={`w-full text-left p-4 hover:bg-primary-dark transition-colors ${activeTab === 'orderhistory' ? 'bg-primary text-white' : 'text-gray-400'
                                }`}
                        >
                            Order History
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ProfilePage;
