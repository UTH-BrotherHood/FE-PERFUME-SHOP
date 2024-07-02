import React, { useEffect, useState } from 'react';
import { getCart } from '../apis/cartApi';
import { createShippingAddress, getAllShippingAddresses, placeOrderApiCall, processPayment } from '../apis/orderApi';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import Line from '../components/common/Line';



interface FormFieldProps {
  placeholder?: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const FormField: React.FC<FormFieldProps> = ({ placeholder, label, type = "text", value, onChange, name }) => (
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
  images: any;
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

  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const renderAddressInfo = () => {
    if (selectedAddress) {
      const selectedAddressInfo = shippingAddresses.find(address => address.id === selectedAddress);
      if (selectedAddressInfo) {
        return (
          <>
            <div className="text-sm font-medium mb-2">SHIPPING ADDRESS</div>
            <div className="text-sm text-secondary mb-2 w-full">Full Name: <span className='font-medium italic'>{selectedAddressInfo.full_name}</span></div>
            <div className="text-sm text-secondary mb-2 w-full">Phone Number: <span className='font-medium italic'>{selectedAddressInfo.phone_number}</span></div>
            <div className="text-sm text-secondary mb-2 w-full">Address Line: <span className='font-medium italic'>{selectedAddressInfo.address_line}</span></div>
            <div className="text-sm text-secondary mb-2 w-full">City: <span className='font-medium italic'>{selectedAddressInfo.city}</span></div>
            <div className="text-sm text-secondary mb-2 w-full">Country: <span className='font-medium italic'> {selectedAddressInfo.country}</span></div>
          </>
        );
      }
    }
  }

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
  const handleCreateBillingAddress = () => {
    navigate("/address/billing-address"); // Navigate to billing address page or component
  };
  return (
    <div className="px-[12rem]  ">
      <section>
        <div className="flex w-full gap-16 mt-8">
          <div className="flex w-3/5 flex-col gap-16 mt-8">
            <div>
              <p className=" text-sm font-medium mb-8">SHIPPING ADDRESS</p>
              <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                <FormSelect
                  label="Select Existing Address"
                  question="Select Address"
                  options={shippingAddresses?.map(address => address.id)}
                  value={selectedAddress}
                  onChange={handleAddressSelect}
                />
                {!selectedAddress && (
                  <button
                    type="button"
                    onClick={handleCreateBillingAddress}
                    className="btn btn-primary text-sm font-medium uppercase px-12 py-3 mt-4"
                  >
                    Create Billing Address ( if there is no  Billing Address yet )
                  </button>
                )}
                {renderAddressInfo()}

              </form>
            </div>
            <div className='shadow-lg pt-6 pb-2 rounded-md'>
              <p className="uppercase text-sm font-medium pb-4 px-4 ">PAYMENT METHOD</p>
              <div className='p-4'><Line /></div>
              <div className='flex justify-center'>
                <form className="flex p-6 gap-4">
                  <label htmlFor="cash" className="flex flex-col w-40 items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
                      <path d="M10.5883 5.63672L12.7082 6.19531C12.7802 6.21215 12.8446 6.25229 12.8915 6.30951C12.9383 6.36673 12.9649 6.43781 12.9672 6.51172C12.9672 6.69141 12.8074 6.83984 12.6109 6.83984H11.2203C11.0705 6.83941 10.9221 6.81024 10.7832 6.75391C10.5785 6.66797 10.3426 6.6875 10.1855 6.83203L9.44336 7.51562C9.40903 7.54567 9.37941 7.5807 9.35547 7.61953C9.32483 7.66979 9.30443 7.72562 9.29547 7.7838C9.2865 7.84198 9.28914 7.90136 9.30323 7.95851C9.31732 8.01567 9.34258 8.06947 9.37756 8.11681C9.41254 8.16416 9.45654 8.20411 9.50703 8.23438C9.91805 8.48105 10.3782 8.6344 10.8551 8.68359V9.375C10.8551 9.71875 11.1609 10 11.5336 10H12.2121C12.5852 10 12.891 9.71875 12.891 9.375V8.6875C14.1773 8.54688 15.1504 7.47656 14.9809 6.22656C14.8578 5.32812 14.1035 4.61328 13.1621 4.36328L11.0422 3.80469C10.9702 3.78785 10.9058 3.74771 10.8589 3.69049C10.8121 3.63327 10.7855 3.56219 10.7832 3.48828C10.7832 3.30859 10.943 3.16016 11.1395 3.16016H12.5301C12.6805 3.16039 12.8294 3.18957 12.9687 3.24609C13.173 3.33203 13.4094 3.3125 13.5664 3.16797L14.3086 2.48438C14.3418 2.45497 14.3704 2.42073 14.3934 2.38281C14.4243 2.33257 14.4449 2.2767 14.4541 2.21843C14.4633 2.16016 14.4608 2.10065 14.4469 2.04334C14.4329 1.98602 14.4078 1.93204 14.3728 1.88451C14.3379 1.83697 14.2939 1.79683 14.2434 1.76641C13.8322 1.51974 13.3719 1.36639 12.8949 1.31719V0.625C12.8949 0.28125 12.5895 0 12.2164 0H11.5379C11.1648 0 10.8594 0.28125 10.8594 0.625V1.3125C9.57461 1.45312 8.59961 2.52344 8.76914 3.77344C8.8918 4.67188 9.64844 5.38672 10.5883 5.63672ZM22.0809 12.8164C21.6199 12.3984 20.9012 12.4258 20.4168 12.8164L16.8074 15.7031C16.3644 16.0586 15.8129 16.2516 15.2449 16.25H10.625C10.4592 16.25 10.3003 16.1842 10.1831 16.0669C10.0658 15.9497 10 15.7908 10 15.625C10 15.4592 10.0658 15.3003 10.1831 15.1831C10.3003 15.0658 10.4592 15 10.625 15H13.6832C14.3043 15 14.8828 14.5742 14.982 13.9609C14.9943 13.8905 15.0003 13.8191 15 13.7477C14.9994 13.4165 14.8674 13.0992 14.6331 12.8653C14.3987 12.6314 14.0811 12.5 13.75 12.5H7.5C6.44594 12.5003 5.42401 12.8629 4.60547 13.527L2.78906 15H0.625C0.45924 15 0.300268 15.0658 0.183058 15.1831C0.065848 15.3003 0 15.4592 0 15.625L0 19.375C0 19.5408 0.065848 19.6997 0.183058 19.8169C0.300268 19.9342 0.45924 20 0.625 20H14.5613C15.1292 20.0004 15.6802 19.8076 16.1238 19.4531L22.0312 14.7266C22.1734 14.6129 22.2889 14.4696 22.3699 14.3066C22.4509 14.1437 22.4953 13.965 22.5001 13.7831C22.5048 13.6012 22.4698 13.4204 22.3975 13.2535C22.3251 13.0865 22.2172 12.9373 22.0812 12.8164H22.0809Z" fill="#4D2952" />
                    </svg>
                    <div className='font-sm font-medium' >Cash on Delivery</div>
                    <input className="custom-radio h-4 w-4 text-[#4D2952] border-gray-300 focus:text-[#4D2952]" type="radio" id="cash" name="paymentMethod" value="cash" defaultChecked />
                  </label>
                  <label htmlFor="Rayorpay" className="flex flex-col cursor-pointer w-40 items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
                      <path d="M10.5883 5.63672L12.7082 6.19531C12.7802 6.21215 12.8446 6.25229 12.8915 6.30951C12.9383 6.36673 12.9649 6.43781 12.9672 6.51172C12.9672 6.69141 12.8074 6.83984 12.6109 6.83984H11.2203C11.0705 6.83941 10.9221 6.81024 10.7832 6.75391C10.5785 6.66797 10.3426 6.6875 10.1855 6.83203L9.44336 7.51562C9.40903 7.54567 9.37941 7.5807 9.35547 7.61953C9.32483 7.66979 9.30443 7.72562 9.29547 7.7838C9.2865 7.84198 9.28914 7.90136 9.30323 7.95851C9.31732 8.01567 9.34258 8.06947 9.37756 8.11681C9.41254 8.16416 9.45654 8.20411 9.50703 8.23438C9.91805 8.48105 10.3782 8.6344 10.8551 8.68359V9.375C10.8551 9.71875 11.1609 10 11.5336 10H12.2121C12.5852 10 12.891 9.71875 12.891 9.375V8.6875C14.1773 8.54688 15.1504 7.47656 14.9809 6.22656C14.8578 5.32812 14.1035 4.61328 13.1621 4.36328L11.0422 3.80469C10.9702 3.78785 10.9058 3.74771 10.8589 3.69049C10.8121 3.63327 10.7855 3.56219 10.7832 3.48828C10.7832 3.30859 10.943 3.16016 11.1395 3.16016H12.5301C12.6805 3.16039 12.8294 3.18957 12.9687 3.24609C13.173 3.33203 13.4094 3.3125 13.5664 3.16797L14.3086 2.48438C14.3418 2.45497 14.3704 2.42073 14.3934 2.38281C14.4243 2.33257 14.4449 2.2767 14.4541 2.21843C14.4633 2.16016 14.4608 2.10065 14.4469 2.04334C14.4329 1.98602 14.4078 1.93204 14.3728 1.88451C14.3379 1.83697 14.2939 1.79683 14.2434 1.76641C13.8322 1.51974 13.3719 1.36639 12.8949 1.31719V0.625C12.8949 0.28125 12.5895 0 12.2164 0H11.5379C11.1648 0 10.8594 0.28125 10.8594 0.625V1.3125C9.57461 1.45312 8.59961 2.52344 8.76914 3.77344C8.8918 4.67188 9.64844 5.38672 10.5883 5.63672ZM22.0809 12.8164C21.6199 12.3984 20.9012 12.4258 20.4168 12.8164L16.8074 15.7031C16.3644 16.0586 15.8129 16.2516 15.2449 16.25H10.625C10.4592 16.25 10.3003 16.1842 10.1831 16.0669C10.0658 15.9497 10 15.7908 10 15.625C10 15.4592 10.0658 15.3003 10.1831 15.1831C10.3003 15.0658 10.4592 15 10.625 15H13.6832C14.3043 15 14.8828 14.5742 14.982 13.9609C14.9943 13.8905 15.0003 13.8191 15 13.7477C14.9994 13.4165 14.8674 13.0992 14.6331 12.8653C14.3987 12.6314 14.0811 12.5 13.75 12.5H7.5C6.44594 12.5003 5.42401 12.8629 4.60547 13.527L2.78906 15H0.625C0.45924 15 0.300268 15.0658 0.183058 15.1831C0.065848 15.3003 0 15.4592 0 15.625L0 19.375C0 19.5408 0.065848 19.6997 0.183058 19.8169C0.300268 19.9342 0.45924 20 0.625 20H14.5613C15.1292 20.0004 15.6802 19.8076 16.1238 19.4531L22.0312 14.7266C22.1734 14.6129 22.2889 14.4696 22.3699 14.3066C22.4509 14.1437 22.4953 13.965 22.5001 13.7831C22.5048 13.6012 22.4698 13.4204 22.3975 13.2535C22.3251 13.0865 22.2172 12.9373 22.0812 12.8164H22.0809Z" fill="#4D2952" />
                    </svg>
                    <div className='font-sm font-medium'>Rayorpay</div>
                    <input className="custom-radio h-4 w-4 text-[#4D2952] border-gray-300 focus:text-[#4D2952]" type="radio" id="Rayorpay" name="paymentMethod" value="Rayorpay" />
                  </label>
                  <label htmlFor="my-wallet" className="flex flex-col cursor-pointer w-40 items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
                      <path d="M20.24 1H2.76C2.33962 1 2 1.33962 2 1.76V19.24C2 19.6604 2.33962 20 2.76 20H20.24C20.6604 20 21 19.6604 21 19.24V1.76C21 1.33962 20.6604 1 20.24 1ZM19.29 12.02H11.88V8.98H19.29V12.02ZM19.29 18.29H3.71V2.71H19.29V7.46H11.12C10.6996 7.46 10.36 7.79962 10.36 8.22V12.78C10.36 13.2004 10.6996 13.54 11.12 13.54H19.29V18.29ZM13.115 10.5C13.115 10.752 13.2151 10.9936 13.3932 11.1718C13.5714 11.3499 13.813 11.45 14.065 11.45C14.317 11.45 14.5586 11.3499 14.7368 11.1718C14.9149 10.9936 15.015 10.752 15.015 10.5C15.015 10.248 14.9149 10.0064 14.7368 9.82825C14.5586 9.65009 14.317 9.55 14.065 9.55C13.813 9.55 13.5714 9.65009 13.3932 9.82825C13.2151 10.0064 13.115 10.248 13.115 10.5Z" fill="#4D2952" />
                    </svg>
                    <div className='font-sm font-medium' >My Wallet</div>
                    <input className="custom-radio h-4 w-4 text-[#4D2952] border-gray-300 focus:text-[#4D2952] focus:outline-none" type="radio" id="my-wallet" name="paymentMethod" value="my-wallet" />
                  </label>

                </form>

              </div>

            </div>
            <div className='px-4'>
              <p className=" text-sm font-medium pb-6  ">Additional Information</p>
              <p className='text-sm pb-2 '>Order Notes <span className='text-gray-500'>(Optional)</span></p>
              <input placeholder='Notes about your order, e.g. special notes for delivery' className="flex h-[7.75rem] p-[0.75rem] test-sm pl-[1rem] pr-[32rem] pb-[5.75rem] items-center self-stretch rounded-sm border border-[#E4E7E9] bg-white">

              </input>

            </div>
          </div>
          <div className="  border-[1px] border-gray-200 w-2/5 h-full  p-6 ">
            <p className=" text-[1.125rem] font-medium  ">Order Summery</p>
            <div className='flex flex-col gap-4 my-6'>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex gap-4 ">
                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover" />
                    <div className="flex flex-col justify-between py-1">
                      <span className="text-primary">{item.name}</span>
                      <span className="text-sm text-gray-500"> {item.quantity} x <span className='text-primary font-bold'>{item.price}</span></span>
                    </div>
                  </div>
                  <div>${item.price}</div>
                </div>
              ))}
            </div>

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
            <div className='py-4'>   <Line /></div>

            <div className="flex justify-between mt-2">
              <span className="text-sm text-secondary">Total</span>
              <span className="text-primary font-semibold">${totalAmount}</span>
            </div>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-primary text-white rounded-md hover:bg-opacity-80 mt-4"
            >
              Place Order
            </button>
          </div>

        </div>

      </section>

      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold">Order Placed Successfully!</h2>
          <p className="mt-2">Your order has been placed successfully. What would you like to do next?</p>
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={() => navigate('/product')}
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
    </div>
  );
};

export default ShippingState;
