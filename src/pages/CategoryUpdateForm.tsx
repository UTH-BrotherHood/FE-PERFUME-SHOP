/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// Đảm bảo bạn có định nghĩa schema này
import { useToast } from "../components/ui/use-toast";
import { handleErrorsApi } from "../utils/utils";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";

export default function CategoryUpdateForm() {
    const { idUpdateCategory } = useParams<{ idUpdateCategory: string }>();
    const [loading, setLoading] = useState(false);

    const { toast } = useToast();
    const navigate = useNavigate();
    const getToken = () => {
        return localStorage.getItem('accessToken') || '';
    };
    const token = getToken();

    const form = useForm<any>({
        mode: "onBlur",
        disabled: false,
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            description: "",
        },
    });

    useEffect(() => {
        async function fetchCategoryDetails() {
            try {
                const response = await axios.get(`http://localhost:8001/categories/${idUpdateCategory}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const categoryData = response.data.result;
                form.reset({
                    name: categoryData.name,
                    description: categoryData.description,
                });
            } catch (error) {
                console.error("Error fetching category details:", error);
            }
        }

        fetchCategoryDetails();
    }, [idUpdateCategory, token, form]);

    async function onSubmit(values: any) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await axios.patch(`http://localhost:8001/categories/${idUpdateCategory}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Result:", result);

            toast({
                description: result.data.message,
                duration: 10000,
            });

            navigate('/dashboard/categories');
        } catch (error: any) {
            handleErrorsApi({
                error: error.response.data,
                setError: form.setError,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <h1 className="text-2xl font-bold mb-4">Update Category</h1>
            <div className='flex justify-between items-center'>
                <div className='flex items-center pt-2 pb-6 gap-2 text-primary text-sm font-medium'>DashBoard
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 11.9192V4.47121C6.00003 4.33938 6.03914 4.21051 6.1124 4.10091C6.18565 3.9913 6.28976 3.90587 6.41156 3.85543C6.53336 3.80498 6.66738 3.79178 6.79669 3.81749C6.92599 3.8432 7.04476 3.90667 7.138 3.99988L10.862 7.72388C10.987 7.8489 11.0572 8.01844 11.0572 8.19521C11.0572 8.37199 10.987 8.54153 10.862 8.66655L7.138 12.3905C7.04476 12.4838 6.92599 12.5472 6.79669 12.5729C6.66738 12.5986 6.53336 12.5854 6.41156 12.535C6.28976 12.4846 6.18565 12.3991 6.1124 12.2895C6.03914 12.1799 6.00003 12.051 6 11.9192Z" fill="#8B8E99" />
                    </svg>
                    <span className='text-primary'>Category List</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 11.9192V4.47121C6.00003 4.33938 6.03914 4.21051 6.1124 4.10091C6.18565 3.9913 6.28976 3.90587 6.41156 3.85543C6.53336 3.80498 6.66738 3.79178 6.79669 3.81749C6.92599 3.8432 7.04476 3.90667 7.138 3.99988L10.862 7.72388C10.987 7.8489 11.0572 8.01844 11.0572 8.19521C11.0572 8.37199 10.987 8.54153 10.862 8.66655L7.138 12.3905C7.04476 12.4838 6.92599 12.5472 6.79669 12.5729C6.66738 12.5986 6.53336 12.5854 6.41156 12.535C6.28976 12.4846 6.18565 12.3991 6.1124 12.2895C6.03914 12.1799 6.00003 12.051 6 11.9192Z" fill="#8B8E99" />
                    </svg>
                    <span className='text-[#667085]'>Update Category</span>
                </div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center">
                <div className="flex flex-col gap-11 w-full">
                    <section className="bg-white rounded-xl p-6 w-[80%]">
                        <p className="text-[1.125rem] font-semibold pb-[0.8rem]">Category Information</p>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex gap-1 flex-col">
                                    <FormLabel className="text-text text-sm font-medium">Category Name</FormLabel>
                                    <FormControl>
                                        <Input className="w-full rounded-[0.5rem] bg-gray-50 h-[2.5rem] border-gray-100" placeholder="Type category name here..." {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="flex gap-1 flex-col">
                                    <FormLabel className="text-text text-sm font-medium">Description</FormLabel>
                                    <FormControl>
                                        <Input className="w-full rounded-[0.5rem] bg-gray-50 h-[2.5rem] border-gray-100" placeholder="Type category description here..." {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                    </section>
                </div>
                <Button type="submit" className="w-[17rem] h-[2.8rem] uppercase font-bold text-white rounded-sm bg-primary hover:bg-primary-dark mt-4">
                    Update Category
                </Button>
            </form>
        </Form>
    );
}
