import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Statistic } from 'antd';
import { Line, Pie } from '@ant-design/charts';

interface DailySale {
    day: string;
    total_revenue: string;
}

interface MostSoldItems {
    category_name: string;
    total_quantity_sold: string;
}

interface LatestOrder {
    product_image: string | undefined;
    order_id: string;
    order_date: string;
    total_price: string;
    product_name: string;
    quantity: number;
    customer_name: string;
}

const Dashboard: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const getToken = () => {
        return localStorage.getItem('accessToken') || '';
    };
    const token = getToken();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8001/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setData(response.data.result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [token]);

    if (!data) return <div>Loading...</div>;

    const { total, latest_orders, most_sold_items_by_category, daily_sales } = data;

    // Data for Charts
    const dailySalesData = daily_sales.map((item: DailySale) => ({
        date: new Date(item.day).toLocaleDateString(),
        revenue: parseFloat(item.total_revenue),
    }));

    const mostSoldItemsData = most_sold_items_by_category.map((item: MostSoldItems) => ({
        category: item.category_name,
        quantity: parseInt(item.total_quantity_sold, 10),
    }));

    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div style={{ padding: '24px', background: '#F5F5F7' }}>
            <Row gutter={24}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Total Revenue" value={`$${total.total_revenue}`} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Total Products Sold" value={total.total_products_sold} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Total Orders" value={total.total_orders} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: '24px' }}>
                <Col span={12}>
                    <Card title="Daily Sales">
                        <Line
                            data={dailySalesData}
                            xField="date"
                            yField="revenue"
                            seriesField=""
                            xAxis={{ type: 'time', tickCount: 5 }}
                            yAxis={{ title: { text: 'Revenue ($)' } }}
                            tooltip={{ formatter: (datum: { revenue: any }) => ({ name: 'Revenue', value: `$${datum.revenue}` }) }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Most Sold Items by Category">
                        <Pie
                            
                            data={mostSoldItemsData}
                            angleField="quantity"
                            colorField="category"
                            radius={0.8}
                            legend={{ position: 'top-left' }}
                            tooltip={{ formatter: (datum: { category: any; quantity: any }) => ({ name: datum.category, value: datum.quantity }) }}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: '24px' }}>
                <Col span={24} className='rounded-lg'>
                    <div className="grid grid-cols-7 gap-4 p-2 text-sm bg-white font-medium rounded-t-2xl border-b-[1px]">
                        <div className='py-4 col-span-3 ml-14'>Products</div>
                        <div className='py-4 text-center'>Customer Name</div>
                        <div className='py-4 text-center'>Quantity</div>
                        <div className='py-4 text-center'>Price</div>
                        <div className='py-4 text-center'>Order Date</div>
                    </div>

                    {Array.isArray(latest_orders) && latest_orders.length > 0 ? (
                        latest_orders.map((order: LatestOrder) => (
                            <div key={order.order_id} className="grid grid-cols-7 gap-4 p-2 border-b items-center text-center bg-white hover:bg-[#F9F9FC]">
                                <div className="col-span-3 flex items-center">
                                    <div className="w-16 h-16 flex items-center justify-center mr-2">
                                        <img src={order.product_image} alt={order.product_name} className="w-full h-full object-cover p-2 bg-transparent" />
                                    </div>
                                    <div className='text-sm font-medium'>{order.product_name}</div>
                                </div>
                                <div className='capitalize text-sm font-medium text-[#667085]'>{order.customer_name}</div>
                                <div className='text-sm font-medium text-[#667085]'>{order.quantity}</div>
                                <div className='text-sm font-medium text-[#667085]'>${order.total_price}</div>
                                <div className='text-sm font-medium text-[#667085]'>{formatDate(order.order_date)}</div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center col-span-4">No latest orders found</div>
                    )}

                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
