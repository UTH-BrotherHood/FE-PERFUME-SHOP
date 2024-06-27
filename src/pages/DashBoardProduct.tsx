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
        const response = await axios.get(`http://localhost:8001/products?page=${currentPage}&limit=6`);
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
      const response = await axios.get(`http://localhost:8001/products?page=${newPage}&limit=6`);
      console.log("Fetched products:", response.data.products);
      setProducts(response.data.products);
      setTotalPages(response.data.total_pages);
      setCurrentPage(newPage); // Update currentPage state
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

  return (
    <div className='p-4 px-10 relative'>
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md absolute right-10 top-0 hover:bg-blue-700 active:bg-red-700">Add Product</button>
      <div className="grid grid-cols-7 gap-4 p-2 bg-gray-200 font-semibold">
        <div className="col-span-3 ml-14">Products</div>
        <div className='text-center'>Product</div>
        <div className='text-center'>Stock</div>
        <div className='text-center'>Price</div>
        <div className='text-center'>Action</div>
      </div>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="grid grid-cols-7 gap-4 p-2 border-b items-center text-center">
            <div className="col-span-3 flex items-center">
              <div className="w-24 h-24 flex items-center justify-center mr-2">
                {product.images[0] && (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover p-2 bg-transparent" />
                )}
              </div>
              {product.name}
            </div>
            <div className='capitalize'>{(product.id as string).split('_')[0]}</div>
            <div>{product.stock}</div>
            <div>${product.price}</div>
            <div className="flex space-x-2 justify-center">
              <button className="text-blue-500 hover:text-blue-700">
                <MdModeEdit />
              </button>
              <button className="text-green-500 hover:text-green-700">
                <a href={`/product/${product.id}`} target='blank'>
                  <IoEyeSharp />
                </a>
              </button>

              <button className="text-red-500 hover:text-red-700">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <HiOutlineTrash />
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
