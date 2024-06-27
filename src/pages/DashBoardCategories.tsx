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


interface Category {
    id: string;
    name: string;
    description: string;
    created_at?: Date;
    updated_at?: Date;
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
                console.log("Fetched categories:", response.data.result); // Debugging log
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

    return (
        <div className='p-4 px-10 relative'>
            <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md absolute right-10 top-0 hover:bg-blue-700 active:bg-red-700"><a href='/dashboard/categories/AddCategory'>Add Category</a></button>
            <div className="grid grid-cols-4 gap-4 p-2 bg-gray-200 font-semibold">
                <div className="col-span-1 ml-14">Category</div>
                <div className='text-center col-span-1'>Description</div>
                <div className='text-center col-span-1'>Created At</div>
                <div className='text-center col-span-1'>Action</div>
            </div>
            {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category) => (
                    <div key={category.id} className="grid grid-cols-4 gap-4 p-2 border-b items-center text-center">
                        <div className="col-span-1 flex items-center">
                            {category.name}
                        </div>
                        <div className='col-span-1'>{category.description}</div>
                        <div className='col-span-1'>{new Date(category.created_at || '').toLocaleDateString()}</div>
                        <div className="flex space-x-2 justify-center col-span-1">
                            <button className="text-blue-500 hover:text-blue-700">
                                <MdModeEdit />
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
