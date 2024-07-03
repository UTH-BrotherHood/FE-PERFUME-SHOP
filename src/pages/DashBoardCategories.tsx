import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi2";
import Pagination from '../components/common/Pagination';
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

interface Category {
    id: string;
    name: string;
    description: string;
    created_at?: string;
    updated_at?: string;
}

function DashBoardCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getToken = () => {
        return localStorage.getItem('accessToken') || '';
    };
    const token = getToken();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8001/categories');
                console.log("Fetched categories:", response.data.result);
                setCategories(response.data.result);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleDeleteCategory = async (categoryId: string) => {
        try {
            await axios.delete(`http://localhost:8001/categories/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div className='relative bg-[#F5F5F7]'>
            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            <div className='flex justify-between items-center'>
                <div className='flex items-center pt-2 pb-6 gap-2 text-primary text-sm font-medium'>DashBoard <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 11.9192V4.47121C6.00003 4.33938 6.03914 4.21051 6.1124 4.10091C6.18565 3.9913 6.28976 3.90587 6.41156 3.85543C6.53336 3.80498 6.66738 3.79178 6.79669 3.81749C6.92599 3.8432 7.04476 3.90667 7.138 3.99988L10.862 7.72388C10.987 7.8489 11.0572 8.01844 11.0572 8.19521C11.0572 8.37199 10.987 8.54153 10.862 8.66655L7.138 12.3905C7.04476 12.4838 6.92599 12.5472 6.79669 12.5729C6.66738 12.5986 6.53336 12.5854 6.41156 12.535C6.28976 12.4846 6.18565 12.3991 6.1124 12.2895C6.03914 12.1799 6.00003 12.051 6 11.9192Z" fill="#8B8E99" />
                </svg> <span className='text-[#667085]'>Category List</span></div>
                <button className="bg-primary text-white py-2 rounded-md flex p-2 mb-6 items-center px-[0.88rem] justify-center gap-2 hover:bg-blue-700 active:bg-red-700"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2 10H18" stroke="#F5F5F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10 2V18" stroke="#F5F5F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg><a href='/dashboard/categories/AddCategory' className='text-sm font-medium '>Add Category</a></button>
            </div>

            <div className="grid grid-cols-4 gap-4 p-2 text-sm bg-white font-medium rounded-t-2xl border-b-[1px]">
                <div className='py-4 col-span-1 ml-14'>Category</div>
                <div className='py-4 text-center col-span-1'>Description</div>
                <div className='py-4 text-center col-span-1'>Created At</div>
                <div className='py-4 text-center col-span-1'>Action</div>
            </div>
            {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category) => (
                    <div key={category.id} className="grid grid-cols-4 gap-4 p-2 border-b items-center text-center bg-white hover:bg-[#F9F9FC] ">
                        <div className="col-span-1 flex ml-14 items-center">
                            <div className='text-sm font-medium flex '>{category.name}</div>
                        </div>
                        <div className='capitalize text-sm font-medium text-[#667085] col-span-1'>{category.description}</div>
                        <div className='text-sm font-medium text-[#667085] col-span-1'>{formatDate(category.created_at as string)}</div>
                        <div className="flex gap-3 items-center justify-center col-span-1">
                            <Link to={`/dashboard/categories/${category.id}`} className="text-primary hover:text-blue-700">
                                <MdModeEdit />
                            </Link>
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
                                                This action cannot be undone. This will permanently delete the category named <b>{category.name}</b> and delete your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center col-span-4">No categories found</div>
            )}
            <div className='relative bottom-0 left-[50%] translate-x-[-50%] mt-5'>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default DashBoardCategories;
