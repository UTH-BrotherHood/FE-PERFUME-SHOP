import React, { useEffect, useState } from 'react';
import CouponIcon from '../components/svg/Coupon';
import GiftIcon from '../components/svg/Gift';
import { getCart } from '../apis/cartApi';
import { createShippingAddress, getAllShippingAddresses, placeOrderApiCall, processPayment } from '../apis/orderApi';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const TableComponent: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-2">
        <p className="h-[1px] bg-[#E4E7E9] "></p>
        <div className="flex justify-between py-2 text-sm text-secondary ">
          <div className="w-1/3 flex gap-2 items-center">
            <input type="radio" id="price1" name="shippingMethod" value="5.00" />
            <label htmlFor="price1">$5.00</label>
          </div>
          <div className="w-1/3">Fixed</div>
          <div className="w-1/3">Flat Rate</div>
        </div>
        <p className="h-[1px] bg-[#E4E7E9] "></p>
        <div className="flex justify-between py-2 text-sm text-secondary">
          <div className="w-1/3 flex gap-2 items-center">
            <input type="radio" id="price2" name="shippingMethod" value="10.00" />
            <label htmlFor="price2">$10.00</label>
          </div>
          <div className="w-1/3">Table Rate</div>
          <div className="w-1/3">Best Way</div>
        </div>
        <p className="h-[1px] bg-[#E4E7E9] "></p>
      </div>
    </div>
  );
};

interface TabItemProps {
  tabNumber: number;
  activeTab: number;
  onClick: (tabNumber: number) => void;
  label: string;
}

const TabItem: React.FC<TabItemProps> = ({ tabNumber, activeTab, onClick, label }) => {
  const isActive = activeTab === tabNumber;

  return (
    <div className="flex flex-col items-center gap-8 cursor-pointer" onClick={() => onClick(tabNumber)}>
      <div className={`flex justify-center items-center w-[200px] h-[3px] ${isActive ? 'bg-primary' : 'bg-border'}`}>
        <div className={`flex items-center justify-center bg-white border-[3px] rounded-[50%] w-[3rem] h-[3rem] ${isActive ? 'border-primary' : 'border-border'}`}>
          {isActive ? 'a' : ''}
        </div>
      </div>
      <div className={`text-sm font-medium ${isActive ? 'text-primary font-semibold' : 'text-border'}`}>
        {label}
      </div>
    </div>
  );
};

interface FormFieldProps {
  placeholder?: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ placeholder, label, type = "text", value, onChange, name }) => (
  <div className="flex items-start justify-between gap-4">
    {label && <div className="text-sm text-secondary">{label}</div>}
    <input
      className="w-[400px] border-[1px] h-[40px] border-border text-primary px-2 text-sm focus:outline-none"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      name={name}
    />
  </div>
);

interface FormSelectProps {
  question?: string;
  label?: string;
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({ question, label, options, value, onChange }) => (
  <div className="flex items-start justify-between gap-4">
    {label && <div className="text-sm text-secondary">{label}</div>}
    <select
      className="w-[400px] border-[1px] h-[40px] border-border text-primary px-2 text-sm focus:outline-none"
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>{question}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);
interface CartItem {
  discount: string;
  id: string;
  name: string;
  price: string | number;
  quantity: number;
}

interface ShippingAddress {
  id: string;
  full_name: string;
  phone_number: string;
  address_line: string;
  city: string;
  country: string;
}

interface PaymentResponse {
  result: {
    id: string;
  };
}

const ShippingState: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingInfo, setShippingInfo] = useState({
    full_name: '',
    phone_number: '',
    address_line: '',
    city: '',
    country: '',
  });
  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate(); // Updated for navigation

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCart();
        setCartItems(response.result);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchShippingAddresses = async () => {
      try {
        const addresses = await getAllShippingAddresses();
        setShippingAddresses(addresses);
      } catch (error) {
        console.error('Error fetching shipping addresses:', error);
      }
    };

    fetchShippingAddresses();
  }, []);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let addressToUse: ShippingAddress | undefined;

      if (selectedAddress) {
        addressToUse = shippingAddresses.find(address => address.id === selectedAddress);
      } else {
        const createdShippingAddress = await createShippingAddress(shippingInfo);
        console.log('Shipping address created:', createdShippingAddress);
        addressToUse = createdShippingAddress;
      }

      setActiveTab(2);
    } catch (error) {
      console.error('Error processing shipping or payment:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      let addressToUse: ShippingAddress | undefined;


      if (selectedAddress) {
        addressToUse = shippingAddresses.find(address => address.id === selectedAddress);
      } else {
        // Create a new shipping address if none selected
        const createdShippingAddress = await createShippingAddress(shippingInfo);
        console.log('Shipping address created:', createdShippingAddress);
        addressToUse = createdShippingAddress;
      }


      const paymentMethod = (document.querySelector('input[name="paymentMethod"]:checked') as HTMLInputElement)?.value;


      const paymentInfo = {
        payment_method: paymentMethod || 'cash',
      };


      const paymentResponse: PaymentResponse = await processPayment(paymentInfo);
      console.log('Payment processed:', paymentResponse);


      const orderInfo = {
        address_id: addressToUse?.id,
        payment_id: paymentResponse.result.id,
      };


      const orderResponse = await placeOrderApiCall(orderInfo);
      console.log('Order placed:', orderResponse);


      setShowModal(true);

    } catch (error) {
      console.error('Error placing order:', error);

    }
  };


  const calculateSubtotal = (cartItems: CartItem[]): string => {
    const subtotal = cartItems.reduce((accumulator, item) => {
      return accumulator + (parseFloat(item.price.toString()) * item.quantity);
    }, 0);
    return subtotal.toFixed(2);
  };

  const calculateShipping = (cartItems: CartItem[]): string => {
    const flatRateShipping = 10.00;
    return flatRateShipping.toFixed(2);
  };

  const calculateTax = (cartItems: CartItem[]): string => {
    const taxRate = 0.10;
    const subtotal = cartItems.reduce((accumulator, item) => {
      return accumulator + (parseFloat(item.price.toString()) * item.quantity);
    }, 0);
    const tax = subtotal * taxRate;
    return tax.toFixed(2);
  };

  const calculateOrderTotal = (cartItems: CartItem[]): string => {
    const subtotal = cartItems.reduce((accumulator, item) => {
      return accumulator + (parseFloat(item.price.toString()) * item.quantity);
    }, 0);

    const shipping = parseFloat(calculateShipping(cartItems));
    const tax = parseFloat(calculateTax(cartItems));

    const orderTotal = subtotal + shipping + tax;
    return orderTotal.toFixed(2);
  };

  const subtotal = calculateSubtotal(cartItems);
  const shippingCost = calculateShipping(cartItems);
  const taxAmount = calculateTax(cartItems);
  const totalAmount = calculateOrderTotal(cartItems);

  const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedAddress(selectedId);
    const selectedAddress = shippingAddresses.find(address => address.id === selectedId);
    if (selectedAddress) {
      setShippingInfo({
        full_name: selectedAddress.full_name,
        phone_number: selectedAddress.phone_number,
        address_line: selectedAddress.address_line,
        city: selectedAddress.city,
        country: selectedAddress.country,
      });
    }
  };

  return (
    <div className="px-[12rem]">
      <div className="flex justify-center items-center">
        <TabItem tabNumber={1} activeTab={activeTab} onClick={handleTabClick} label="Shipping" />
        <TabItem tabNumber={2} activeTab={activeTab} onClick={handleTabClick} label="Review & Payments" />
      </div>

      {activeTab === 1 && (
        <div className="flex flex-col gap-16 mt-8">
          <div>
            <p className="uppercase text-sm font-bold mb-8">SHIPPING ADDRESS</p>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
              <FormSelect
                label="Select Existing Address"
                question="Select Address"
                options={shippingAddresses?.map(address => address.id)}
                value={selectedAddress}
                onChange={handleAddressSelect}
              />
              <FormField
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={shippingInfo.full_name}
                onChange={handleShippingInfoChange}
                name="full_name"
              />
              <FormField
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                value={shippingInfo.phone_number}
                onChange={handleShippingInfoChange}
                name="phone_number"
              />
              <FormField
                label="Address Line"
                type="text"
                placeholder="Enter your address"
                value={shippingInfo.address_line}
                onChange={handleShippingInfoChange}
                name="address_line"
              />
              <FormField
                label="City"
                type="text"
                placeholder="Enter your city"
                value={shippingInfo.city}
                onChange={handleShippingInfoChange}
                name="city"
              />
              <FormField
                label="Country"
                type="text"
                placeholder="Enter your country"
                value={shippingInfo.country}
                onChange={handleShippingInfoChange}
                name="country"
              />
              {/* <FormField
                label="Country"
                type="text"
                value={shippingInfo.country}
                onChange={handleShippingInfoChange}
              /> */}
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-md hover:bg-opacity-80 mt-4"
              >
                Continue to Review & Payments
              </button>
            </form>
          </div>
          <div>
            <p className="uppercase text-sm font-bold mb-8">YOUR ORDER</p>
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-primary">{item.name}</span>
                      <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                    </div>
                  </div>
                  <div>${item.price}</div>
                </div>
              ))}
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Subtotal ({cartItems.length} items)</span>
                  <span className="text-primary font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Shipping</span>
                  <span className="text-primary font-semibold">${shippingCost}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Tax</span>
                  <span className="text-primary font-semibold">${taxAmount}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Total</span>
                  <span className="text-primary font-semibold">${totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="flex flex-col gap-16 mt-8">
          <div>
            <p className="uppercase text-sm font-bold mb-8">PAYMENT METHOD</p>
            <form className="flex flex-col gap-4">
              <div className="flex gap-4">
                <input type="radio" id="cash" name="paymentMethod" value="cash" defaultChecked />
                <label htmlFor="cash">Cash</label>
              </div>
              <div className="flex gap-4">
                <input type="radio" id="credit-card" name="paymentMethod" value="credit_card" />
                <label htmlFor="credit-card">Credit Card</label>
              </div>
              <div className="flex gap-4">
                <input type="radio" id="paypal" name="paymentMethod" value="paypal" />
                <label htmlFor="paypal">PayPal</label>
              </div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-primary text-white rounded-md hover:bg-opacity-80 mt-4"
              >
                Place Order
              </button>
            </form>
          </div>
          <div>
            <p className="uppercase text-sm font-bold mb-8">YOUR ORDER</p>
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-primary">{item.name}</span>
                      <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                    </div>
                  </div>
                  <div>${item.price}</div>
                </div>
              ))}
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Subtotal ({cartItems.length} items)</span>
                  <span className="text-primary font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Shipping</span>
                  <span className="text-primary font-semibold">${shippingCost}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Tax</span>
                  <span className="text-primary font-semibold">${taxAmount}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Total</span>
                  <span className="text-primary font-semibold">${totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-xl font-semibold">Order Placed Successfully!</h2>
            <p className="mt-2">Your order has been placed successfully. What would you like to do next?</p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => navigate('/shop')}
                className="px-4 py-2 text-white bg-primary rounded"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/order-history')}
                className="px-4 py-2 text-white bg-primary rounded"
              >
                View Order History
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>

  );

};

export default ShippingState;
