import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../components/svg/LogoIcon';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown, Menu } from 'antd';
import { toast, useToast } from '../components/ui/use-toast';

const LogoDBIcon: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none" className='stroke-current'>
            <path d="M8.77778 1H1V8.77778H8.77778V1Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.77778 14H1V21.7778H8.77778V14Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.9995 1H13.2217V8.77778H20.9995V1Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.9995 14H13.2217V21.7778H20.9995V14Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};
const LogoPDIcon: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none" className='stroke-current'>
            <path d="M16.4474 8.36908L7.48235 3.19922" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.9301 14.9436V6.97467C20.9298 6.62531 20.8376 6.28218 20.6627 5.97971C20.4879 5.67724 20.2366 5.42607 19.934 5.25139L12.9612 1.26691C12.6583 1.09205 12.3148 1 11.9651 1C11.6154 1 11.2718 1.09205 10.969 1.26691L3.99612 5.25139C3.69356 5.42607 3.44226 5.67724 3.26742 5.97971C3.09258 6.28218 3.00036 6.62531 3 6.97467V14.9436C3.00036 15.293 3.09258 15.6361 3.26742 15.9386C3.44226 16.2411 3.69356 16.4922 3.99612 16.6669L10.969 20.6514C11.2718 20.8262 11.6154 20.9183 11.9651 20.9183C12.3148 20.9183 12.6583 20.8262 12.9612 20.6514L19.934 16.6669C20.2366 16.4922 20.4879 16.2411 20.6627 15.9386C20.8376 15.6361 20.9298 15.293 20.9301 14.9436Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3.26809 5.93848L11.9642 10.9689L20.6603 5.93848" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.9652 20.9999V10.959" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};
const LogoCATEIcon: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className='stroke-current' viewBox="0 0 22 22" fill="none">
            <path d="M11 1L1 6L11 11L21 6L11 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 16L11 21L21 16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 11L11 16L21 11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};
const LogoODIcon: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className='stroke-current' viewBox="0 0 22 22" fill="none">
            <path d="M19 1H3C1.89543 1 1 1.89543 1 3V7C1 8.10457 1.89543 9 3 9H19C20.1046 9 21 8.10457 21 7V3C21 1.89543 20.1046 1 19 1Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19 13H3C1.89543 13 1 13.8954 1 15V19C1 20.1046 1.89543 21 3 21H19C20.1046 21 21 20.1046 21 19V15C21 13.8954 20.1046 13 19 13Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.99983 5H5.01019" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.99983 17H5.01019" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};
interface User {
    username: string;
    email: string;
    avatar: string;
    date_of_birth: string;
    id: string;
    phone_number: string | null;
    total_cart_quantity: number;
    total_wishlist_quantity: number;
    created_at: string;
    updated_at: string;
    verify: string;
}

function DashBoardLayout({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
    const refreshToken = localStorage.getItem('refreshToken');
    const config = {
        baseURL: 'http://localhost:8001',
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    };
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const config = {
                    baseURL: 'http://localhost:8001',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };

                try {
                    const response = await axios.get("/users/me", config);
                    console.log('User fetched:', response.data.result);
                    setUser(response.data.result);


                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null);
                }
            }
        };

        fetchData();
    }, []);
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
    const menu = (
        <Menu>

            <Menu.Item key="signout" onClick={handleSignOut}>
                Sign Out
            </Menu.Item>
        </Menu>
    );

    const location = useLocation();

    return (
        <div className="flex w-full gap-10">
            <div className="w-1/5  text-white shadow-xl h-screen fixed p-6">
                <ul className="text-black">
                    <p className="text-4xl items-center justify-center flex p-2 "><Logo /></p>
                    <div>
                        <p className='items-stretch text-[0.68rem] tracking-wider uppercase text-primary opacity-40 pt-6 pb-2'>Menu</p>

                        <a href="/dashboard/" className={`flex gap-[0.62rem] items-center py-4  px-4 text-sm rounded ${location.pathname === '/dashboard/' ? 'bg-[#ebebee]     text-primary' : ''}`}>
                            <LogoDBIcon />
                            Home
                        </a>


                        <a href="/dashboard/products" className={`flex gap-[0.62rem] items-center py-4  px-4 text-sm rounded  ${location.pathname.includes('/dashboard/products') ? 'bg-[#ebebee]     text-primary' : ''}`}>
                            <LogoPDIcon />
                            Products
                        </a>


                        <a href="/dashboard/categories" className={`flex gap-[0.62rem] items-center py-4  px-4 text-sm rounded  ${location.pathname.includes('/dashboard/categories') ? 'bg-[#ebebee]     text-primary' : ''}`}>
                            <LogoCATEIcon />
                            Categories
                        </a>
                   

                    </div>

                </ul>
            </div>
            <div className="flex-1 bg-[#F5F5F7]  px-10 ml-[20%]">
                <div className='py-6'>
                    <div className='flex gap-8 item-center justify-center w-full'>
                        <div className='rounded-[0.5rem] w-[80%] bg-white border-border border-[1px] flex gap-2 px-[0.875rem] py-[0.325rem]'><input
                            placeholder='Search...'
                            type="text"
                            className=" w-full border-none focus:outline-none focus:border-none focus:ring-0 text-[#8B8E99]"
                        /><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                <path d="M27.9369 26.4905L21.1198 19.6734C22.1777 18.3058 22.7499 16.6337 22.7499 14.875C22.7499 12.7697 21.9283 10.7957 20.4426 9.30736C18.9568 7.819 16.9776 7 14.875 7C12.7723 7 10.7931 7.82162 9.30736 9.30736C7.819 10.7931 7 12.7697 7 14.875C7 16.9776 7.82162 18.9568 9.30736 20.4426C10.7931 21.9309 12.7697 22.7499 14.875 22.7499C16.6337 22.7499 18.3032 22.1777 19.6708 21.1224L26.4879 27.9369C26.5079 27.9569 26.5316 27.9728 26.5578 27.9836C26.5839 27.9944 26.6119 28 26.6402 28C26.6684 28 26.6964 27.9944 26.7226 27.9836C26.7487 27.9728 26.7724 27.9569 26.7924 27.9369L27.9369 26.795C27.9569 26.775 27.9728 26.7513 27.9836 26.7252C27.9944 26.6991 28 26.6711 28 26.6428C28 26.6145 27.9944 26.5865 27.9836 26.5604C27.9728 26.5343 27.9569 26.5105 27.9369 26.4905ZM19.0329 19.0329C17.92 20.1433 16.4447 20.7549 14.875 20.7549C13.3052 20.7549 11.83 20.1433 10.717 19.0329C9.60661 17.92 8.99499 16.4447 8.99499 14.875C8.99499 13.3052 9.60661 11.8274 10.717 10.717C11.83 9.60661 13.3052 8.99499 14.875 8.99499C16.4447 8.99499 17.9226 9.60399 19.0329 10.717C20.1433 11.83 20.7549 13.3052 20.7549 14.875C20.7549 16.4447 20.1433 17.9226 19.0329 19.0329Z" fill="#8B8E99" />
                            </svg>


                        </div>
                        <Dropdown overlay={menu}>
                            <div className='flex gap-3 items-center justify-end w-[20%] '>

                                <img src={user?.avatar || "https://i.pinimg.com/736x/c3/36/0a/c3360abaf6a9294f02f65e703a13cf69.jpg"} alt="avatar" className="w-8 h-8 rounded-[50%]" />
                                <div className='flex flex-col gap-1'>
                                    <div className='text-sm'>{user?.username}
                                    </div>
                                    <div className='text-[0.75rem] text-[#4A4C56]'>Admin</div>


                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M4.81063 6.75H13.1896C13.3379 6.75003 13.4829 6.79404 13.6062 6.87645C13.7295 6.95886 13.8256 7.07598 13.8824 7.21301C13.9391 7.35003 13.954 7.50081 13.9251 7.64627C13.8961 7.79174 13.8247 7.92536 13.7199 8.03025L9.53038 12.2197C9.38974 12.3603 9.199 12.4393 9.00013 12.4393C8.80126 12.4393 8.61053 12.3603 8.46988 12.2197L4.28038 8.03025C4.17552 7.92536 4.10412 7.79174 4.07519 7.64627C4.04627 7.50081 4.06112 7.35003 4.11787 7.21301C4.17463 7.07598 4.27073 6.95886 4.39404 6.87645C4.51734 6.79404 4.66232 6.75003 4.81063 6.75Z" fill="#858D9D" />
                                </svg>

                            </div>
                        </Dropdown>
                    </div>

                </div>
                <div className='h-screen'>  {children}</div>



            </div>
        </div>
    );
}

export default DashBoardLayout;
