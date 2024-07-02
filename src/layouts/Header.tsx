// Header.tsx

import { Badge, Dropdown, Menu } from 'antd';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../components/svg/CartIcon";
import Logo from "../components/svg/LogoIcon";
import SearchIcon from "../components/svg/SearchIcon";
import UserIcon from "../components/svg/UserIcon";
import HeartIcon from '../components/svg/HeartIcon';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { useToast } from '../components/ui/use-toast';
import { fetchProductsAsync } from '../store/features/productSlice';
import { useAppDispatch } from '../store/store';

const Header: React.FC = () => {
  const { user, setUser } = useContext(UserContext) || {};
  const { toast } = useToast();
  const refreshToken = localStorage.getItem('refreshToken');
  const config = {
    baseURL: 'http://localhost:8001',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };
  const navigate = useNavigate()
  const handleSignOut = () => {
    // Xử lý đăng xuất
    if (setUser) {
      setUser(null);
    }
    axios.post("/users/logout", { refresh_token: refreshToken }, config).then((res) => {
      toast({
        description: "You have been signed out",
      });
    })

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/')
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductsAsync({ page: 1, limit: 8 }));
  }, [dispatch]);
  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/MyAccount">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="signout" onClick={handleSignOut}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  // const navItems = [
  //   { path: "/Perfumes", label: "Perfumes" },
  //   { path: "/Brands", label: "Brands" },
  //   { path: "/Skincare", label: "Skincare" },
  //   { path: "/Makeup", label: "Makeup" },
  //   { path: "/Haircare", label: "Haircare" },
  //   { path: "/Aromatherapy", label: "Aromatherapy" },
  //   { path: "/Candles", label: "Candles" },
  //   { path: "/Gifts", label: "Gifts" }
  // ];

  const AuthLink = [
    {
      path: refreshToken ? "/MyAccount" : "/sign-In",
      label: user ? (
        <Dropdown overlay={menu}>
          <span className="cursor-pointer">
            Hello <span className='italic text-[#975c3f]'>{user.username}</span>
          </span>
        </Dropdown>
      ) : "Sign In",
      icon: <UserIcon />
    }
  ];
  const userLinks = [
    {
      path: "/cart",
      label: "Cart",
      icon: <Badge count={user?.total_cart_quantity}><CartIcon /></Badge>
    },

    {
      path: "/product",
      label: "Product",
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
            <form action="" className="flex justify-between w-[23rem] border-[1px] px-[2rem] py-[0.25rem] rounded-[1.8125rem]">
              <input type="text" className="w-[80%]  border-none" placeholder="Hey, what are you looking for?" />
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
            {AuthLink.map(link => (
              <Link key={link.label as string} to={link.path} className="flex justify-between items-center gap-2">
                {link.icon}
                {link.label}
              </Link>
            ))}
            {refreshToken && userLinks.map(link => (
              <Link key={link.label as string} to={link.path} className="flex justify-between items-center gap-2">
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* <div>
          <nav className="main-menu flex text-[#515151] uppercase justify-center items-center py-3 px-[17rem] gap-[3rem]">
            {navItems.map(item => (
              <Link key={item.path} to={item.path}>{item.label}</Link>
            ))}
          </nav>
        </div> */}
      </div>
    </>
  )
}

export default Header;
