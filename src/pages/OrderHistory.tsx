import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../utils/http';
import Modal from 'react-modal';

interface IOrder {
    id: string;
    user_id: string;
    payment_id: string;
    total_price: string;
    order_date: string;
    address_id: string;
}

interface IOrderDetail {
    payment_method: string;
    order_id: string;
    user_id: string;
    payment_id: string;
    total_price: string;
    order_date: string;
    shipping_address: {
        full_name: string;
        phone_number: string;
        address_line: string;
        city: string;
        country: string;
    };
    listProductOfOrder: Array<{
        order_item_id: string;
        product_id: string;
        product_name: string;
        product_description: string;
        product_price: string;
        quantity: number;
        discount: number;
    }>;
}

const OrderHistory: React.FC = () => {
    const [orderHistory, setOrderHistory] = useState<IOrder[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<IOrderDetail | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const getToken = () => {
        return localStorage.getItem('accessToken') || '';
    };

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const token = getToken();
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await http.get('/orders', config);
                setOrderHistory(response.data.result);
            } catch (error) {
                setError('Error fetching order history');
                console.error('Error fetching order history:', error);
            }
        };

        fetchOrderHistory();
    }, []);

    const fetchOrderDetail = async (orderId: string) => {
        try {
            const token = getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await http.get(`/orders/${orderId}`, config);
            setSelectedOrder(response.data.result);
            setIsModalOpen(true);
        } catch (error) {
            setError('Error fetching order details');
            console.error('Error fetching order details:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="border border-gray-200 bg-white">
            <div className="flex items-center font-bold py-4 pl-6 rounded-t border-b border-gray-200 bg-white text-gray-900 text-sm uppercase">
                Order History
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
                <thead className="bg-[#F5F5F7] text-[#8B8E99] text-[0.7rem]">
                    <tr>
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Total Price</th>
                        <th className="py-3 px-4">Order Date</th>
                        <th className="py-3 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orderHistory.map(order => (
                        <tr key={order.id} className="border-t">
                            <th className="py-3 px-4 text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap font-public-sans text-sm font-normal leading-5 w-58">{order.id}</th>
                            <th className="py-3 px-4 font-normal text-sm">${order.total_price}</th>
                            <th className="py-3 px-4 font-normal test-sm">{new Date(order.order_date).toLocaleString()}</th>
                            <th className="py-3 px-4 font-normal">
                                <button
                                    onClick={() => fetchOrderDetail(order.id)}
                                    className="text-rose-500 italic text-sm underline hover:underline"
                                >
                                    View
                                </button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Order Detail"
                ariaHideApp={false}
                className="fixed inset-0 flex items-center justify-center p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                {selectedOrder && (
                    <div className="bg-white rounded-lg p-6 h-[80%] overflow-y-auto shadow-xl w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4 text-primary">Order Detail</h2>
                        <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
                        <p><strong>User ID:</strong> {selectedOrder.user_id}</p>
                        <p><strong>Payment Option:</strong> {selectedOrder.payment_method}</p>
                        <p><strong>Total Price:</strong> {selectedOrder.total_price}</p>
                        <p><strong>Order Date:</strong> {new Date(selectedOrder.order_date).toLocaleString()}</p>
                        <h3 className="text-xl font-semibold mt-4">Shipping Address</h3>
                        <p>{selectedOrder.shipping_address.full_name}</p>
                        <p>{selectedOrder.shipping_address.phone_number}</p>
                        <p>{selectedOrder.shipping_address.address_line}, {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.country}</p>
                        <h3 className="text-xl font-semibold mt-4">Products</h3>
                        <ul className="list-disc pl-5">
                            {selectedOrder.listProductOfOrder.map(product => (
                                <li key={product.order_item_id} className="border-t pt-2 mt-2">
                                    <p><strong>Product Name:</strong> {product.product_name}</p>
                                    <p><strong>Description:</strong> {product.product_description}</p>
                                    <p><strong>Price:</strong> {product.product_price}</p>
                                    <p><strong>Quantity:</strong> {product.quantity}</p>
                                    <p><strong>Discount:</strong> {product.discount}</p>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                        >
                            Close
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default OrderHistory;
