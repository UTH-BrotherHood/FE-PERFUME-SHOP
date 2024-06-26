import React, { useEffect, useState } from 'react';
import { fetchProductsAsync, deleteProductAsync ,selectProducts, selectTotalPages } from '../store/features/productSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import Pagination from '../components/common/Pagination';
import { MdModeEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi2";

interface Perfume {
  id?: string;
  category_id: string;
  name: string;
  description: string;
  discount: number;
  images: string[];
  stock: number;
  price: number;
  created_at?: Date;
  updated_at?: Date;
}

function DashBoardProduct() {
  const products = useAppSelector(selectProducts);
  const totalPages = useAppSelector(selectTotalPages);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Perfume[]>([]);

  useEffect(() => {
  console.log("🚀 ~ DashBoardProduct ~ selectedProduct:", selectedProduct)
  }
  , [selectedProduct]);

  useEffect(() => {
    dispatch(fetchProductsAsync({ page: currentPage, limit: 8 }));
  }, [currentPage, dispatch]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSelectProduct = (product: Perfume) => {
    setSelectedProduct((prev) => {
      return prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product];
    });
  };
  
  const handleDeleteProduct = (productId: string | undefined) => {
    if (productId) {
      dispatch(deleteProductAsync(productId));
    }
  }

  return (
    <div className='p-4 px-10 relative'>
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md absolute right-10 top-0 hover:bg-blue-700 active:bg-red-700">Add Product</button>
      <div className="grid grid-cols-7 gap-4 p-2 bg-gray-200 font-semibold">
        <div className="col-span-3 ml-14">Products</div>
        <div className='text-center'>Category</div>
        <div className='text-center'>Stock</div>
        <div className='text-center'>Price</div>
        <div className='text-center'>Action</div>
      </div>
      {products.map((product) => (
        <div key={product.id} className="grid grid-cols-7 gap-4 p-2 border-b items-center text-center ">
          <div className="col-span-3 flex items-center">
            <input type="checkbox" className="mr-2 form-checkbox rounded-full text-blue-500 h-5 w-5 focus:ring-transparent" 
            onClick={() => handleSelectProduct(product)}
            checked={selectedProduct.includes(product)}
            />
            <div className="w-24 h-24 flex items-center justify-center mr-2">
              {product.images[0] && (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover p-2 bg-transparent" />
              )}
            </div>
            {product.name}
          </div>
          <div className='capitalize'>{product.category_id.split('_')[0]}</div>
          <div>{product.stock}</div>
          <div>${product.price}</div>
          <div className="flex space-x-2 justify-center">
            <button className="text-blue-500 hover:text-blue-700">
              <MdModeEdit />
            </button>
            <button className="text-green-500 hover:text-green-700">
              <IoEyeSharp />
            </button>
            <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteProduct(product.id)}>
              <HiOutlineTrash />
            </button>
          </div>
        </div>
      ))}
      <div className='relative bottom-0 left-[50%] translate-x-[-50%] mt-5'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default DashBoardProduct;
