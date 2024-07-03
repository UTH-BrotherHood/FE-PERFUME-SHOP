import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store/store';
import Pagination from '../components/common/Pagination';
import { MdModeEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi2";
import { fetchProductsAsync, deleteProductAsync, selectProducts, selectTotalPages, Product } from '../store/features/productSlice';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { Link } from 'react-router-dom';

function DashBoardProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getToken = () => {
    return localStorage.getItem('accessToken') || '';
  };
  const token = getToken();
  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/products?page=${currentPage}&limit=15`);
        console.log("Fetched products:", response.data.products);
        setProducts(response.data.products);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchproducts();
  }, []);

  const handlePageChange = async (newPage: number) => {
    try {
      const response = await axios.get(`http://localhost:8001/products?page=${newPage}&limit=15`);
      console.log("Fetched products:", response.data.products);
      setProducts(response.data.products);
      setTotalPages(response.data.total_pages);
      setCurrentPage(newPage);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };



  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`http://localhost:8001/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setProducts(prevProducts => prevProducts.filter(products => products.id !== productId));


    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  return (
    <div className='  relative bg-[#F5F5F7]'>
      <h1 className="text-2xl font-bold mb-4 ">Product</h1>
      <div className='flex justify-between items-center'>
        <div className='flex items-center pt-2 pb-6 gap-2 text-primary text-sm font-medium'>DashBoard <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 11.9192V4.47121C6.00003 4.33938 6.03914 4.21051 6.1124 4.10091C6.18565 3.9913 6.28976 3.90587 6.41156 3.85543C6.53336 3.80498 6.66738 3.79178 6.79669 3.81749C6.92599 3.8432 7.04476 3.90667 7.138 3.99988L10.862 7.72388C10.987 7.8489 11.0572 8.01844 11.0572 8.19521C11.0572 8.37199 10.987 8.54153 10.862 8.66655L7.138 12.3905C7.04476 12.4838 6.92599 12.5472 6.79669 12.5729C6.66738 12.5986 6.53336 12.5854 6.41156 12.535C6.28976 12.4846 6.18565 12.3991 6.1124 12.2895C6.03914 12.1799 6.00003 12.051 6 11.9192Z" fill="#8B8E99" />
        </svg> <span className='text-[#667085]'>Product List</span></div>
        <button className="bg-primary text-white  py-2 rounded-md flex p-2 items-center px-[0.88rem] justify-center gap-2 hover:bg-blue-700 active:bg-red-700"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 10H18" stroke="#F5F5F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M10 2V18" stroke="#F5F5F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg><a href='/dashboard/products/AddProduct' className='text-sm font-medium'>Add Product</a></button>
      </div>


      <div className='p-2 mb-5 rounded-[0.5rem] inline-flex bg-white'>
        <div className='text-primary text-sm font-medium bg-[#F5F5F7] px-2 py-1 rounded cursor-pointer'>All Products</div>
        <div className='text-gray-500 text-sm font-medium px-2 py-1 rounded cursor-pointer $stock>0'>Published</div>
        <div className='text-gray-500 text-sm font-medium px-2 py-1 rounded cursor-pointer $stock<10'>Low Stock</div>
        <div className='text-gray-500 text-sm font-medium px-2 py-1 rounded cursor-pointer $stock<1'>Out of Stock</div>
      </div>

      <div className="grid grid-cols-9 gap-4 p-2 text-sm bg-white font-medium rounded-t-2xl border-b-[1px]">
        <div className='  py-4 col-span-3 ml-14'>Products</div>
        <div className='  py-4 text-center '>Brand</div>
        <div className='  py-4 text-center'>Stock</div>
        <div className='  py-4 text-center'>Price</div>
        <div className='  py-4 text-center'>Stock</div>
        <div className='  py-4 text-center'>Added</div>
        <div className='  py-4 text-center'>Action</div>
      </div>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="grid grid-cols-9 gap-4 p-2 border-b items-center text-center bg-white hover:bg-[#F9F9FC] round-b-2xl">
            <div className="col-span-3 flex items-center">
              <div className="w-16 h-16 flex items-center justify-center mr-2">
                {product.images[0] && (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover p-2 bg-transparent" />
                )}
              </div>

              <div className='text-sm font-medium'>{formatName(product.name)}</div>
            </div>
            <div className='capitalize text-sm font-medium text-[#667085]'>{product.category_name}</div>
            <div className='text-sm font-medium text-[#667085]'>{product.stock}</div>
            <div className='text-sm font-medium text-[#667085]'>${product.price}</div>
            <div className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 10 ? <div className='text-[#1A9882] bg-[#E9FAF7] px-3 py-1 rounded-lg'>Published</div> : product.stock > 0 ? <div className='text-[#F86624] bg-[#FFF0EA] px-3 py-1 rounded-lg'>Low Stock</div> : <div className='text-[#EB3D4D] bg-[#FEECEE] px-3 py-1 rounded-lg' >Out of Stock</div>}
            </div>
            <div className='text-sm font-medium text-[#667085]'>{formatDate(product.created_at as string)}</div>
            <div className="flex gap-3 items-center justify-center">

              <Link to={`/dashboard/products/${product.id}`} className="text-primary hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <g clip-path="url(#clip0_64_9476)">
                    <path d="M0.781333 12.7459C0.281202 13.2459 0.000151033 13.9241 0 14.6312L0 15.9999H1.36867C2.07585 15.9997 2.75402 15.7187 3.254 15.2186L12.1493 6.32325L9.67667 3.85059L0.781333 12.7459Z" fill="#A3A9B6" />
                    <path d="M15.4298 0.570239C15.2675 0.407729 15.0747 0.278809 14.8625 0.19085C14.6503 0.102891 14.4228 0.0576172 14.1931 0.0576172C13.9634 0.0576172 13.736 0.102891 13.5238 0.19085C13.3116 0.278809 13.1188 0.407729 12.9565 0.570239L10.6191 2.90824L13.0918 5.38091L15.4298 3.04357C15.5923 2.88123 15.7212 2.68845 15.8092 2.47626C15.8972 2.26406 15.9424 2.03661 15.9424 1.80691C15.9424 1.5772 15.8972 1.34975 15.8092 1.13755C15.7212 0.925358 15.5923 0.73258 15.4298 0.570239Z" fill="#A3A9B6" />
                  </g>
                  <defs>
                    <clipPath id="clip0_64_9476">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
              <button className="text-green-500 hover:text-green-700">
                <a href={`/product/${product.id}`} target='blank'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path d="M7.99989 9.66531C9.4721 9.66531 10.6656 8.47185 10.6656 6.99965C10.6656 5.52744 9.4721 4.33398 7.99989 4.33398C6.52769 4.33398 5.33423 5.52744 5.33423 6.99965C5.33423 8.47185 6.52769 9.66531 7.99989 9.66531Z" fill="#A3A9B6" />
                    <path d="M15.5112 5.28013C14.4776 3.59676 12.1265 0.772461 7.99998 0.772461C3.87352 0.772461 1.52239 3.59676 0.488772 5.28013C-0.162924 6.33421 -0.162924 7.66609 0.488772 8.7202C1.52239 10.4036 3.87352 13.2279 7.99998 13.2279C12.1265 13.2279 14.4776 10.4036 15.5112 8.7202C16.1629 7.66609 16.1629 6.33421 15.5112 5.28013ZM7.99998 10.9987C5.79168 10.9987 4.00147 9.20846 4.00147 7.00015C4.00147 4.79184 5.79168 3.00163 7.99998 3.00163C10.2083 3.00163 11.9985 4.79184 11.9985 7.00015C11.9963 9.20755 10.2074 10.9964 7.99998 10.9987Z" fill="#A3A9B6" />
                  </svg>
                </a>
              </button>

              <button className="text-red-500 flex items-center hover:text-red-700">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                      <path d="M12.9999 2.66666H10.9333C10.6143 1.11572 9.24997 0.002 7.66656 0H6.33322C4.74981 0.002 3.3855 1.11572 3.06656 2.66666H0.999908C0.631721 2.66666 0.333252 2.96513 0.333252 3.33331C0.333252 3.7015 0.631721 4 0.999908 4H1.66656V12.6667C1.66878 14.5067 3.15988 15.9978 4.99991 16H8.99991C10.8399 15.9978 12.331 14.5067 12.3333 12.6667V4H12.9999C13.3681 4 13.6666 3.70153 13.6666 3.33334C13.6666 2.96516 13.3681 2.66666 12.9999 2.66666ZM6.33325 11.3333C6.33325 11.7015 6.03478 12 5.6666 12C5.29838 12 4.99991 11.7015 4.99991 11.3333V7.33334C4.99991 6.96516 5.29838 6.66669 5.66656 6.66669C6.03475 6.66669 6.33322 6.96516 6.33322 7.33334V11.3333H6.33325ZM8.99991 11.3333C8.99991 11.7015 8.70144 12 8.33325 12C7.96506 12 7.6666 11.7015 7.6666 11.3333V7.33334C7.6666 6.96516 7.96506 6.66669 8.33325 6.66669C8.70144 6.66669 8.99991 6.96516 8.99991 7.33334V11.3333ZM4.44725 2.66666C4.73081 1.86819 5.48594 1.33434 6.33325 1.33331H7.6666C8.51391 1.33434 9.26903 1.86819 9.5526 2.66666H4.44725Z" fill="#A3A9B6" />
                    </svg>
                  </AlertDialogTrigger>
                  <AlertDialogContent className='bg-white'>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure you want to delete this category?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the category named <b>{product.name}</b> and delete your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteProduct(product.id as string)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </button>
            </div>
          </div>
        ))) : (
        <div className="text-center col-span-4">No categories found</div>
      )}
      <div className='relative bottom-0 left-[50%] translate-x-[-50%] mt-5'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default DashBoardProduct;
