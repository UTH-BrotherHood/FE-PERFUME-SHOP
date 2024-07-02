import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { createShippingAddress, getAllShippingAddresses } from '../apis/orderApi';

// Define interfaces for billing information and address
interface BillingInfo {
    full_name: string;
    phone_number: string;
    address_line: string;
    city: string;
    country: string;
}

interface Address {
    id: string;
    full_name: string;
    phone_number: string;
    address_line: string;
    city: string;
    country: string;
}

const FormField: React.FC<{
    label: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
}> = ({ label, type = 'text', value, onChange, name }) => (
    <div className="flex flex-col gap-2 mb-4">
        {label && <label className="text-sm text-gray-700">{label}</label>}
        <input
            className="w-full border border-primary rounded-sm p-2 text-gray-900 focus:outline-none focus:border-primary"
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            required
        />
    </div>
);

const BillingPage: React.FC = () => {
    const [billingInfo, setBillingInfo] = useState<BillingInfo>({
        full_name: '',
        phone_number: '',
        address_line: '',
        city: '',
        country: '',
    });
    const [addresses, setAddresses] = useState<Address[]>([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await getAllShippingAddresses();
                setAddresses(response);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchAddresses();
    }, []);

    const handleBillingInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillingInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newAddress = await createShippingAddress(billingInfo);
            setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
            setBillingInfo({
                full_name: '',
                phone_number: '',
                address_line: '',
                city: '',
                country: '',
            });
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    return (
        <div className="py-10 px-16">
            <div className="flex items-center font-bold py-4 pl-6 rounded-t bg-white text-gray-900 text-lg">
                Billing Information
            </div>
            <div className="bg-white shadow-md rounded p-6 mt-4">
                <h2 className="text-lg font-semibold mb-4">Existing Addresses</h2>
           
                {addresses.length > 0 ? (
                    <div className='h-80 overflow-y-auto'>
                        <ul className="mb-6">
                            {addresses.map((address) => (
                                <li key={address.id} className="mb-2">
                                    <div className="p-4 border border-gray-300 rounded-sm">
                                        <p><strong>Name:</strong> {address.full_name}</p>
                                        <p><strong>Phone:</strong> {address.phone_number}</p>
                                        <p><strong>Address:</strong> {address.address_line}</p>
                                        <p><strong>City:</strong> {address.city}</p>
                                        <p><strong>Country:</strong> {address.country}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                 
                ) : (
                    <p className="mb-6">No addresses found.</p>
                )}
                <h2 className="text-lg font-semibold mb-4">Add New Address</h2>
                <form onSubmit={handleFormSubmit}>
                    <FormField
                        label="Full Name"
                        type="text"
                        value={billingInfo.full_name}
                        onChange={handleBillingInfoChange}
                        name="full_name"
                    />
                    <FormField
                        label="Phone Number"
                        type="tel"
                        value={billingInfo.phone_number}
                        onChange={handleBillingInfoChange}
                        name="phone_number"
                    />
                    <FormField
                        label="Address Line"
                        type="text"
                        value={billingInfo.address_line}
                        onChange={handleBillingInfoChange}
                        name="address_line"
                    />
                    <FormField
                        label="City"
                        type="text"
                        value={billingInfo.city}
                        onChange={handleBillingInfoChange}
                        name="city"
                    />
                    <FormField
                        label="Country"
                        type="text"
                        value={billingInfo.country}
                        onChange={handleBillingInfoChange}
                        name="country"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-primary text-white rounded-sm hover:bg-primary-dark"
                    >
                        Save Billing Information
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BillingPage;
