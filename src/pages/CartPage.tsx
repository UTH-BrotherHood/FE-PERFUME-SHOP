import React, { useEffect, useState } from 'react';
import { CiCircleAlert } from 'react-icons/ci';
import { HiOutlineTrash } from "react-icons/hi2";
import { BsTicketPerforated, BsGift, BsPaypal } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import AmazonIcon from '../components/svg/AmazonIcon';
import { FaRegHeart } from "react-icons/fa6";
// import { useAppSelector } from '../store/store';
// import { selectCurrentUser } from '../store/features/authSlice';
import { getCart, deleteFromCart, changeQuantity } from '../apis/cartApi';

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  category: string;
}

interface CartItem {
  discount: string;
  id: string;
  images: string[];
  name: string;
  price: string | number | any;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const handleDelete = async (productId: string) => {
    try {
      await deleteFromCart(productId);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));

    
      const response = await getCart();
      setCartItems(response.result);
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };


  const handleChangeQuantity = async (productId: string, quantity: number) => {
    try {
      const updatedItem = await changeQuantity({ product_id: productId, quantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: updatedItem.quantity } : item
        )
      );

      
      const response = await getCart();
      setCartItems(response.result);
    } catch (error) {
      console.error('Error changing cart item quantity:', error);
    }
  };



  const handleAddToCart = async (productId: string, increment: number) => {
    try {
      const item = cartItems.find((cartItem) => cartItem.id === productId);
      if (item) {
        const newQuantity = item.quantity + increment;
        await handleChangeQuantity(productId, newQuantity);
      } else {
      console.log('oh no loi roi')
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-extrabold uppercase text-center my-8">Shopping Cart</h2>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <div className="bg-[#D7FFFA] flex p-3 text-gray-700 mb-4 items-center">
            <div className="text-5xl mr-5">
              <CiCircleAlert />
            </div>
            <div className="text-sm leading-loose">
              Return Items To Us By Post Within 14 Days Of Receipt. Items Should Be Unused, Unopened And Have Any Original Seals Intact. Please Read Our Returns Help Section For More Information.
            </div>
          </div>
          <div className="grid grid-cols-5 font-bold border-b-2 pb-2 mb-4">
            <div className="col-span-2">Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>
          {cartItems?.map((cartItem) => (
            <div key={cartItem.id} className="cart-item grid grid-cols-5 items-center pb-2 mb-4 relative">
              <div className="flex items-center col-span-2">
                <img src={cartItem.images[0]} alt={cartItem.name} className="w-20 h-20" />
                <div className="ml-4 leading-relaxed">
                  <p>{cartItem.name}</p>
                  <p className="text-sm text-gray-400 mb-2">Eau De Toilette Spray 3.3 Oz</p>
                  <p className="text-sm text-gray-400">Item# {cartItem.id}</p>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 line-through">{cartItem.price}</div>
                <div className="font-bold">{cartItem.price}</div>
              </div>
              <div className="flex items-center justify-evenly border-2 w-32">
                <button
                  className="decrease text-lg"
                  onClick={() => handleAddToCart(cartItem.id, -1)}
                  disabled={cartItem.quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={cartItem.quantity}
                  min="1"
                  className="text-center border-none w-10 h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-0"
                  onChange={(e) => handleChangeQuantity(cartItem.id, parseInt(e.target.value))}
                />
                <button
                  className="increase text-lg"
                  onClick={() => handleAddToCart(cartItem.id, 1)}
                >
                  +
                </button>
              </div>
              <div>
                <div className="line-through text-gray-500 text-sm">
                  ${(parseFloat(cartItem.price.replace('$', '')) * cartItem.quantity).toFixed(2)}
                </div>
                <div className="font-bold">
                  ${(parseFloat(cartItem.price.replace('$', '')) * cartItem.quantity).toFixed(2)}
                
                </div>
              </div>
              <div>
                <button
                  className="text-gray-400 text-xl absolute right-0 top-[45%] translate-y-[-50%]"
                  onClick={() => handleDelete(cartItem.id)}
                >
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
          ))}
          <div className="flex relative justify-between border-t-2 py-2">
            <Link to='/product' className="text-sm font-bold uppercase border-2 p-3 mt-5">Continue Shopping</Link>
            <button className="text-sm font-bold uppercase border-2 p-3 mt-5">Clear Shopping Cart</button>
          </div>
        </div>
        <div>
          <div className="p-2 bg-[#F5F6F6]">
            <div className="flex justify-between items-center p-4 cursor-pointer font-bold">
              <span className="flex items-center gap-3">
                <BsTicketPerforated className="text-xl" />
                Have A Promocode?
              </span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex justify-between items-center p-4 cursor-pointer font-bold">
              <span className="flex items-center gap-3">
                <BsGift className="text-xl" />
                Apply Gift Certificate
              </span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex justify-between items-center p-4 cursor-pointer font-bold">
              <span>ESTIMATE SHIPPING AND TAX</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="mt-3 space-y-4 bg-[#F5F6F6] p-6">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between font-extrabold">
                <span>ORDER TOTAL</span>
                <span>
                  {cartItems?.reduce((accumulator, currentValue) => {
                    return accumulator + (parseFloat(currentValue.price.replace('$', '')) * currentValue.quantity);
                  }, 0).toFixed(2)} USD
                </span>
              </div>
            </div>
            <div className="text-center border-t-2 pt-5">
              <Link to={""} className="text-sm text-gray-500 underline">Check Out With Multiple Addresses</Link>
            </div>
            <div className="mt-6">
              <Link to='/shipping-state'><Button content={`Proceed To Secure Checkout`} type="button" w="full" h="12" /></Link> 
            </div>
            <div className="mt-4 flex justify-center items-center gap-2 text-xs">
              <div><span className="text-gray-500">or</span> 4 payments of $25.37 with</div>
              <button className='bg-[#B2FCE4] p-2 rounded-md font-bold'>afterpay</button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 justify-around">
              <div className='flex items-center justify-center bg-[#F7C557] p-3 gap-2'>
                <BsPaypal />
                <p>PayPal</p>
              </div>
              <div className='flex items-center justify-center bg-[#0c3282] p-3 gap-2 text-white'>
                <BsPaypal />
                <p className=''>CREDIT</p>
              </div>
              <div className="flex justify-center items-center gap-2 col-span-2 mt-2 w-full border-2 border-slate-950">
                <AmazonIcon />
                <p>PayPal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default CartPage;
