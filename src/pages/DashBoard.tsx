import axios from "axios";
import { useEffect, useState } from "react";


interface Dashboard {
    total_revenue: string;
    total_orders: string;
    total_products_sold: string
}
const Dashboard = () => {
    const [dashboard, setdashboard] = useState<Dashboard>({ 'total_orders': '0', 'total_products_sold': '0', 'total_revenue': '0' });
    const getToken = () => {
        return localStorage.getItem('accessToken') || '';
    };
    const token = getToken();
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axios.get('http://localhost:8001/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setdashboard(response.data.result);
            } catch (error) {
                console.error("Error fetching Dashboard:", error);
            }
        };

        fetchDashboard();
    }, []);
    return (
        <div className="max-w-7xl h-screen mx-auto py-6 sm:px-6 lg:px-8 bg-[#f4f3ef]">
            <div className="overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6  border-b   border-black">
                    <div className="flex w-full h-[5.5rem]  justify-around">
                        <div className="flex items-center px-4 w-1/5 rounded-lg shadow-xl bg-white">
                            <div className="w-[80%] text-lg font-semibold">
                                <p>Total Revenue</p>
                                <p >{dashboard.total_revenue}</p>
                            </div>
                            <div className="flex justify-between items-center text-3xl w-[15%]">
                                <i className="fas fa-dollar-sign"></i>
                            </div>
                        </div>
                        <div className="flex items-center px-4 w-1/5 rounded-lg shadow-xl bg-white">
                            <div className="w-[80%] text-lg font-semibold">
                                <p>Total Orders</p>
                                <p >{dashboard.total_orders}</p>
                            </div>
                            <div className="flex justify-between items-center text-3xl w-[15%]">
                                <i className="fas fa-cart-plus"></i>
                            </div>
                        </div>
                        <div className="flex items-center px-4 w-1/5 rounded-lg shadow-xl bg-white">
                            <div className="w-[80%] text-lg font-semibold">
                                <p>Products Sold</p>
                                <p >{dashboard.total_products_sold}</p>
                            </div>
                            <div className="flex justify-between items-center text-3xl w-[15%]">
                                <i className="fas fa-chart-line"></i>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
