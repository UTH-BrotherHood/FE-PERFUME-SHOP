import React, { useEffect, useState } from 'react';
import CouponIcon from '../components/svg/Coupon';
import GiftIcon from '../components/svg/Gift';
import { getCart } from '../apis/cartApi';
import { createShippingAddress, getAllShippingAddresses, processPayment } from '../apis/orderApi';

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

  const [activeTab, setActiveTab] = useState<number>(1);

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
      let addressToUse = {}; 

      if (selectedAddress) {
        // If a shipping address is selected, use it
        addressToUse = shippingAddresses.find(address => address.id === selectedAddress);
      } else {
        // If no address is selected, use new shipping info
        const createdShippingAddress = await createShippingAddress(shippingInfo);
        console.log('Shipping address created:', createdShippingAddress);
        addressToUse = createdShippingAddress;
      }

      // Simulate payment information (replace with actual implementation)
      const paymentInfo = {
        payment_method: 'cash',
      };

      // Process payment (replace with actual implementation)
      const paymentResponse = await processPayment(paymentInfo);
      console.log('Payment processed:', paymentResponse);

      // Navigate to next step or handle success state
      setActiveTab(2);
    } catch (error) {
      console.error('Error processing shipping or payment:', error);
    }
  };

  const calculateSubtotal = (cartItems: CartItem[]): string => {
    const subtotal = cartItems.reduce((accumulator, item) => {
      return accumulator + (parseFloat(item.price.toString()) * item.quantity);
    }, 0);
    return subtotal.toFixed(2);
  };

  const calculateShipping = (cartItems: CartItem[]): string => {
    // Example: Flat rate shipping of $10.00
    const flatRateShipping = 10.00;
    return flatRateShipping.toFixed(2); // Return formatted to two decimal places
  };

  // Helper function to calculate tax
  const calculateTax = (cartItems: CartItem[]): string => {
    // Example: 10% tax rate
    const taxRate = 0.10;
    const subtotal = cartItems.reduce((accumulator, item) => {
      return accumulator + (parseFloat(item.price.toString()) * item.quantity);
    }, 0);
    const tax = subtotal * taxRate;
    return tax.toFixed(2); // Return formatted to two decimal places
  };

  // Helper function to calculate order total
  const calculateOrderTotal = (cartItems: CartItem[]): string => {
    const subtotal = cartItems.reduce((accumulator, item) => {
      return accumulator + (parseFloat(item.price.toString()) * item.quantity);
    }, 0);

    const shipping = parseFloat(calculateShipping(cartItems));
    const tax = parseFloat(calculateTax(cartItems));

    const orderTotal = subtotal + shipping + tax;
    return orderTotal.toFixed(2); // Return formatted to two decimal places
  };

  const subtotal = calculateSubtotal(cartItems);
  const shippingCost = calculateShipping(cartItems);

  const taxAmount = calculateTax(cartItems);
  const totalAmount = calculateOrderTotal(cartItems);

  const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedAddress(selectedId);
    // Optionally, you can pre-fill the shipping info fields with the selected address details
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
              {/* Select existing addresses */}
              <FormSelect
                label="Select Existing Address"
                question="Select Address"
                options={shippingAddresses?.map(address => address.id)}
                value={selectedAddress}
                onChange={handleAddressSelect}
              />
              {/* Or enter new address */}
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
              <FormSelect
                label="Country"
                question="Select Country"
                options={['Vietnam', 'United States', 'United Kingdom']}
                value={shippingInfo.country}
                onChange={handleShippingInfoChange}
              />
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
                    {/* <img src={urlImg1} alt="product" className="w-[60px] h-[60px]" /> */}
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
                  <span className="text-sm text-secondary">Estimated Tax</span>
                  <span className="text-primary font-semibold">${taxAmount}</span>
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between mt-2">
                  <span className="text-lg font-bold">Order Total</span>
                  <span className="text-lg font-bold text-primary">${totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="mt-8">
          <p className="text-lg font-semibold mb-4">Review & Payment</p>
          {/* Placeholder for review and payment components */}
          <div className="flex justify-between gap-16">
            <div className="w-[70%]">
              <p className="text-sm text-secondary mb-4">Shipping Information:</p>
              <div className="flex flex-col gap-2">
                <p className="text-sm">{shippingInfo.full_name}</p>
                <p className="text-sm">{shippingInfo.phone_number}</p>
                <p className="text-sm">{shippingInfo.address_line}</p>
                <p className="text-sm">{shippingInfo.city}</p>
                <p className="text-sm">{shippingInfo.country}</p>
              </div>
              <hr className="my-4 border-gray-300" />
              <p className="text-sm text-secondary mb-4">Order Summary:</p>
              <div className="flex flex-col gap-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex gap-4">
                      {/* <img src={urlImg1} alt="product" className="w-[60px] h-[60px]" /> */}
                      <div className="flex flex-col">
                        <span className="text-primary">{item.name}</span>
                        <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                      </div>
                    </div>
                    <div>${item.price}</div>
                  </div>
                ))}
                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Subtotal ({cartItems.length} items)</span>
                  <span className="text-primary font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Shipping</span>
                  <span className="text-primary font-semibold">${shippingCost}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-secondary">Estimated Tax</span>
                  <span className="text-primary font-semibold">${taxAmount}</span>
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between mt-2">
                  <span className="text-lg font-bold">Order Total</span>
                  <span className="text-lg font-bold text-primary">${totalAmount}</span>
                </div>
              </div>
            </div>
            <div className="w-[30%]">
              <div className="p-6 bg-gray-100">
                <div className="flex items-center gap-4 text-sm font-bold mb-6">
                  <GiftIcon />
                  Gift Message - Free! (Optional)
                </div>
                <div className="flex flex-col gap-4">
                  <FormSelect question="Select Occasion" options={['Birthday', 'Anniversary', 'Graduation']} />
                  <FormField placeholder="Your Brief Gift Message" />
                </div>
                <p className="text-xs text-gray-500 mt-3">Up to 65 Characters</p>
              </div>
              <div className="p-6 bg-gray-100">
                <p className="flex items-center gap-4 text-sm font-bold mb-6">
                  <CouponIcon />
                  Coupon, Gift Certificate Or Gift Card:
                </p>
                <FormField placeholder="Enter Your Coupon" />
                <p className="text-xs text-gray-500 mt-3">Up to 65 Characters</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="confirm" name="confirm" />
              <label className="text-sm text-secondary" htmlFor="confirm">
                YES! I'd Like To Receive Order Updates And Special Offers Via Text From PerfumeShop.Com
              </label>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-40 h-12 bg-primary font-bold text-white justify-center items-center flex text-sm cursor-pointer">
                PLACE ORDER
              </div>
              <div className="text-sm text-secondary cursor-pointer">Back</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingState;

