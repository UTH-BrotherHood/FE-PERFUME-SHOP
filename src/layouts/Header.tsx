// Header.tsx

import { Badge } from 'antd';
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import CartIcon from "../components/svg/CartIcon";
import Logo from "../components/svg/LogoIcon";
import SearchIcon from "../components/svg/SearchIcon";
import User from "../components/svg/UserIcon";
import { selectCurrentUser, setUser } from "../store/features/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import HeartIcon from '../components/svg/HeartIcon';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  console.log(user)


  const navItems = [
    { path: "/Perfumes", label: "Perfumes" },
    { path: "/Brands", label: "Brands" },
    { path: "/Skincare", label: "Skincare" },
    { path: "/Makeup", label: "Makeup" },
    { path: "/Haircare", label: "Haircare" },
    { path: "/Aromatherapy", label: "Aromatherapy" },
    { path: "/Candles", label: "Candles" },
    { path: "/Gifts", label: "Gifts" }
  ];

  const userLinks = [
    {
      path: "/MyAccount",
      label: user ? (
        <span className=" ">
          hello {user.username}
        </span>
      ) : "My Account",
      icon: <User />
    },
    {
      path: "/cart",
      label: "Cart",
      icon: <Badge count={user?.total_cart_quantity}><CartIcon /></Badge>
    },
    {
      path: "/wishlist",
      label: "Wishlist",
      icon: <Badge count={user?.total_wishlist_quantity}><HeartIcon /></Badge>
    },
     {
      path: "/product",
      label: "product",
      
    }
  ];

  return (
    <>
      <div className="text-text border-b-[2px] border-gray-100">
        <div className="flex justify-between items-center py-1 px-[3rem] bg-primary text-white">
          <div></div>
          <div><p>🔥 Only 11 days left until VALENTINE'S DAY! 🔥</p></div>
          <div className="flex gap-[2rem]">
            <Link to="/">Help & Information</Link>
            <Link to="/">Connect with us</Link>
          </div>
        </div>

        <div className="flex justify-between items-center py-[1.725rem] px-[3rem]">
          {/* search */}
          <div>
            <form action="" className="flex justify-between w-[25rem] border-[1px] px-[2rem] py-[0.55rem] rounded-[1.8125rem]">
              <input type="text" className="w-[80%] focus:outline-none" placeholder="Hey, what are you looking for?" />
              <button>
                <SearchIcon />
              </button>
            </form>
          </div>
          {/* logo */}
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="flex gap-[2rem]  text-[#515151]">
            {userLinks.map(link => (
              <Link key={link.label as string} to={link.path} className="flex justify-between items-center gap-2">
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <nav className="main-menu flex text-[#515151] uppercase justify-center items-center py-3 px-[17rem] gap-[3rem]">
            {navItems.map(item => (
              <Link key={item.path} to={item.path}>{item.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header;

