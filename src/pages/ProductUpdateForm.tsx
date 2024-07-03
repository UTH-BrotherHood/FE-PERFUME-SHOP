/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ProductReqBody } from "../schemaValidations/product.schema";
import { useToast } from "../components/ui/use-toast";
import { handleErrorsApi } from "../utils/utils";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { Textarea } from "../components/ui/textarea";

export default function ProductUpdateForm() {
    const { idUpdateProduct } = useParams<{ idUpdateProduct: string }>();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState<ProductReqBody | null>(null);

    const { toast } = useToast();
    const navigate = useNavigate();
    const getToken = () => {
        return localStorage.getItem('accessToken') || '';
    };
    const token = getToken();

    const form = useForm<ProductReqBody>({
        mode: "onBlur",
        disabled: false,
        reValidateMode: "onChange",
    });

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get("http://localhost:8001/categories");
                setCategories(response.data.result);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        async function fetchProductDetails() {
            try {
                const response = await axios.get(`http://localhost:8001/products/${idUpdateProduct}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setProduct(response.data.result);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        }

        fetchCategories();
        fetchProductDetails();
    }, [idUpdateProduct, token]);

    async function onSubmit(values: ProductReqBody) {
        if (loading) return;
        setLoading(true);
        try {

            const result = await axios.patch(`http://localhost:8001/products/${idUpdateProduct}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Result:", result);

            toast({
                description: result.data.message,
                duration: 10000,
            });

            navigate('/dashboard/products');
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
            <h1 className="text-2xl font-bold mb-4">Update Product</h1>
            <div className='flex justify-between items-center'>
                <div className='flex items-center pt-2 pb-6 gap-2 text-primary text-sm font-medium'>DashBoard
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 11.9192V4.47121C6.00003 4.33938 6.03914 4.21051 6.1124 4.10091C6.18565 3.9913 6.28976 3.90587 6.41156 3.85543C6.53336 3.80498 6.66738 3.79178 6.79669 3.81749C6.92599 3.8432 7.04476 3.90667 7.138 3.99988L10.862 7.72388C10.987 7.8489 11.0572 8.01844 11.0572 8.19521C11.0572 8.37199 10.987 8.54153 10.862 8.66655L7.138 12.3905C7.04476 12.4838 6.92599 12.5472 6.79669 12.5729C6.66738 12.5986 6.53336 12.5854 6.41156 12.535C6.28976 12.4846 6.18565 12.3991 6.1124 12.2895C6.03914 12.1799 6.00003 12.051 6 11.9192Z" fill="#8B8E99" />
                    </svg>
                    <span className='text-primary'>Product List</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 11.9192V4.47121C6.00003 4.33938 6.03914 4.21051 6.1124 4.10091C6.18565 3.9913 6.28976 3.90587 6.41156 3.85543C6.53336 3.80498 6.66738 3.79178 6.79669 3.81749C6.92599 3.8432 7.04476 3.90667 7.138 3.99988L10.862 7.72388C10.987 7.8489 11.0572 8.01844 11.0572 8.19521C11.0572 8.37199 10.987 8.54153 10.862 8.66655L7.138 12.3905C7.04476 12.4838 6.92599 12.5472 6.79669 12.5729C6.66738 12.5986 6.53336 12.5854 6.41156 12.535C6.28976 12.4846 6.18565 12.3991 6.1124 12.2895C6.03914 12.1799 6.00003 12.051 6 11.9192Z" fill="#8B8E99" />
                    </svg>
                    <span className='text-[#667085]'>Update Product</span>
                </div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center">
                <div className="flex flex-col gap-11 w-full">
                    <section className="bg-white rounded-xl p-6 w-[80%]">
                        <p className="text-[1.125rem] font-semibold pb-[0.8rem]">General Information</p>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex gap-1 flex-col">
                                    <FormLabel className="text-text text-sm font-medium">Product Name</FormLabel>
                                    <FormControl>
                                        <Input className="w-full rounded-[0.5rem] bg-gray-50 h-[2.5rem] border-gray-100" placeholder={product?.name || "Type product name here..."} {...field} />
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
                                        <Textarea className="w-full rounded-[0.5rem] bg-gray-50 h-[2.5rem] border-gray-100" placeholder={product?.description || "Type product description here..."} {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                    </section>
                    <section className="bg-white rounded-xl p-6 w-[80%]">
                        <p className="text-[1.125rem] font-semibold pb-[0.8rem]">Additional Information</p>
                        <FormField
                            control={form.control}
                            name="category_id"
                            render={({ field }) => (
                                <FormItem className="flex gap-1 flex-col">
                                    <FormLabel className="text-text text-sm font-medium">Category</FormLabel>
                                    <FormControl>
                                        <select {...field} className="w-full rounded-[0.5rem] bg-gray-50 h-[2.5rem] border-gray-100">
                                            <option value="">Select a category</option>
                                            {categories.map((category: any) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                                <FormItem className="flex gap-1 flex-col">
                                    <FormLabel className="text-text text-sm font-medium">Discount</FormLabel>
                                    <FormControl>
                                        <Input className="w-full rounded-[0.5rem] bg-gray-50 h-[2.5rem] border-gray-100" placeholder={product?.discount as string || "Enter discount"} {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem className="flex gap-1 flex-col">
                                    <FormLabel className="text-text text-sm font-medium">Image Links</FormLabel>
                                    <FormControl>
                                        <Textarea className="w-full rounded-[0.5rem] bg-gray-50 h-[4rem] border-gray-100" placeholder={product?.images[0] || "Enter image links separated by commas"} {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem className="flex gap-1 flex-col">
                                    <FormLabel className="text-text text-sm font-medium">Stock</FormLabel>
                                    <FormControl>
                                        <Input className="w-full rounded-[0.5rem] bg-gray-50 h-[2.5rem] border-gray-100" placeholder={product?.stock as string || "Enter stock quantity"} {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="flex gap-1 flex-col">
                                    <FormLabel className="text-text text-sm font-medium">Price</FormLabel>
                                    <FormControl>
                                        <Input className="w-full rounded-[0.5rem] bg-gray-50 h-[2.5rem] border-gray-100" placeholder={product?.price || "Enter price"} {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                    </section>
                </div>
                <Button type="submit" className="w-[17rem] h-[2.8rem] uppercase font-bold text-white rounded-sm bg-primary hover:bg-primary-dark mt-4">
                    Update Product
                </Button>
            </form>
        </Form>
    );
}
