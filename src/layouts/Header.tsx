import React from 'react';
import { FaSearch } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { PiShoppingBagLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="w-full py-2 border-b border-gray-300">
      <div className="flex justify-between items-center bg-purple-900 text-white py-1 px-2">
        <div className="flex items-center">
          <select className="mr-2 p-1 border border-gray-300 rounded text-gray-800 bg-white">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">VND</option>
          </select>
          <select className="p-1 border border-gray-300 rounded text-gray-800 bg-white">
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">VietNamese</option>
          </select>
        </div>
        <div className="text-center flex- pl-8">
          🔥 Only 11 days left until VALENTINE'S DAY! 🔥
        </div>
        <div className="flex items-center text-xs space-x-2">
          <a href="/Help&Information" className="text-white">Help & Information</a>
          <a href="/Connectwithus" className="text-white">Connect with us</a>
        </div>
      </div>
      <div className="w-11/12 mx-auto flex justify-between items-center py-2">
        <div className="flex items-center w-1/4">
          <input
            type="text"
            placeholder="Hey, what are you looking for?"
            className="w-11/12 p-2 rounded-l border border-gray-300"
          />
          <button className="p-2 rounded-r border border-gray-300 bg-gray-300 flex items-center justify-center">
            <FaSearch />
          </button>
        </div>
        <div className="flex items-center justify-center w-1/2 mx-auto">
          <img
            src="https://imgs.search.brave.com/UxwOKcdQthp4oYCXIN9XOZ0FrRJJyRbPDre5EKdkEIA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU2LzE4LzIw/LzM2MF9GXzc1NjE4/MjA2MV9FZVdSWDZz/ZWgwRVcyV2dsaVlx/dGo1YjgxV1BWQmIx/cy5qcGc"
            alt="Perfume Icon"
            className="w-20 h-auto mr-2"
          />
          <div className="flex flex-col justify-center text-left">
            <a href='/' className="text-4xl text-purple-900 m-0 mb-1">PerfumeShop</a>
            <p className="text-lg text-gray-500 m-0">TRUSTED ONLINE SINCE 1997</p>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <span className="text-2xl">
            <CiShoppingCart />
          </span>
          <a href="/account" className="mr-2 text-gray-800 no-underline whitespace-nowrap">My Account</a>
          <span className="text-2xl">
            <CiHeart />
          </span>
          <a href="/wishlist" className="mr-2 text-gray-800 no-underline">Wishlist</a>
          <span className="text-2xl">
            <PiShoppingBagLight />
          </span>
          <a href="/account" className="mr-2 text-gray-800 no-underline whitespace-nowrap">2 Items</a>
        </div>
      </div>
      <nav className="w-11/12 mx-auto border-t border-gray-300 py-2">
        <ul className="list-none p-0 flex justify-center">
          {['Perfumes', 'Brands', 'Skincare', 'Makeup', 'Haircare', 'Aromatherapy', 'Candles', 'Gifts'].map((item) => (
            <li key={item} className="mx-2">
              <a
                href={`/${item.toLowerCase()}`}
                className="no-underline text-gray-800 p-2 rounded transition-all duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
