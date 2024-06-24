import React, { useEffect, useState } from 'react';
import CouponIcon from '../components/svg/Coupon';
import GiftIcon from '../components/svg/Gift';
import { getCart } from '../apis/cartApi';

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
  price: string | number | any;
  quantity: number;
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

  const urlImg1 = "https://i5.walmartimages.com/seo/Lancome-La-Vie-Est-Belle-Eau-de-Parfum-Perfume-for-Women-3-4-oz_58c64918-43bb-43de-b59b-57c03197d78f_2.75529471134cc5ca27ec0dd1d0fd3a57.jpeg";
  const urlImg2 = "https://i5.walmartimages.com/seo/Ariana-Grande-Sweet-Like-Candy-Eau-de-Parfum-Perfume-for-Women-1-Oz_6e8a4fdb-601f-42e5-86b0-0ed64fb1412a.28b228882edbbd27cf7d851dad8ec0df.jpeg";

  return (
    <div className="px-[12rem]">
      <div className="flex justify-center items-center">
        <TabItem tabNumber={1} activeTab={activeTab} onClick={handleTabClick} label="Shipping" />
        <TabItem tabNumber={2} activeTab={activeTab} onClick={handleTabClick} label="Review & Payments" />
      </div>
      {activeTab === 1 && (
        <div className="flex justify-between gap-16 mt-8">
          <div>
            <p className="uppercase text-sm font-bold mb-8">SHIPPING ADDRESS</p>
            <form className="flex flex-col gap-4">
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
                options={['Vietnam', 'United States', 'United Kingdom']}
                value={shippingInfo.country}
                onChange={handleShippingInfoChange}
              />
            </form>
            <form className='mt-10' >
              <p className="uppercase text-sm font-bold mb-8">SHIPPING METHODS</p>
              <TableComponent />
              <div className="flex items-center gap-4 mt-4">
                <div className="w-40 h-12 bg-primary font-bold text-white justify-center items-center flex text-sm">NEXT</div>
                <div className="text-sm text-secondary">Back</div>
              </div>
            </form>
            <div className="flex gap-2 items-center mt-6">
              <input type="checkbox" id="confirm" name="confirm" />
              <label className='text-sm text-secondary' htmlFor="confirm">YES! I'd Like To Receive Order Updates And Special Offers Via Text From PerfumeShop.Com</label>
            </div>
          </div>
          <div>
            <div className='p-6 bg-gray-100'>
              <div className='flex items-center gap-4 text-sm font-bold mb-6'><GiftIcon /> Gift Message - Free! (Optional)</div>
              <div className='flex flex-col gap-4'>
                <FormSelect question="Select Occasion" options={['Birthday', 'Anniversary', 'Graduation']} />
                <FormField placeholder="Your Brief Gift Message" />
              </div>
              <p className='text-xs text-gray-500 mt-3'>Up to 65 Characters</p>
            </div>
            <div className='p-6 bg-gray-100 '>
              <p className='flex items-center gap-4 text-sm font-bold mb-6'><CouponIcon /> Coupon, Gift Certificate Or Gift Card:</p>
              <FormField placeholder="Enter Your Coupon" />
              <p className='text-xs text-gray-500 mt-3'>Up to 65 Characters</p>
            </div>
            <div className='p-6 bg-gray-100 '>
              <p className='font-bold text-lg'>ORDER SUMMARY</p>
              <p className="h-[1px] bg-[#E4E7E9] my-4"></p>
              <div className='text-sm mb-2 text-secondary'>{cartItems.length} Items In Cart</div>
              <section className='flex flex-col gap-4 '>
                {cartItems.map((cartItem) => (
                  <div key={cartItem.id} className='flex gap-12'>
                    <img className='w-20 h-20' src={urlImg1} alt="" />
                    <div className='flex flex-col gap-2 '>
                      <p className=' w-32 text-[14px]'>{cartItem.name}<span className='text-xs'> by</span>  <span className=' text-sm underline'>Dolce & Gabbana</span></p>
                      <p className='text-xs'>Item# {cartItem.id}</p>
                      <p className='text-lg'>1x <span className='font-bold'>${cartItem.price}</span> <del>$78.99</del></p>
                    </div>
                    <p className="h-[1px] bg-[#E4E7E9] my-2"></p>
                  </div>
                ))}
                <p className='text-secondary text-sm'>Have a Question? <span className='text-purple-700 underline'> Contact Us Here</span></p>
              </section>
            </div>
          </div>
        </div>
      )}
      {activeTab === 2 && <div></div>}
    </div>
  );
};

export default ShippingState;

