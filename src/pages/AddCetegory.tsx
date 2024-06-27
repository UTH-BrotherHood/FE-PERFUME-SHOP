/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { ProductReqBody } from "../schemaValidations/product.schema";
import { useToast } from "../components/ui/use-toast";
import { handleErrorsApi } from "../utils/utils";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { Textarea } from "../components/ui/textarea";

export default function AddCategory() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get("http://localhost:8001/categories");
                setCategories(response.data.result);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories();
    }, []);
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
        defaultValues: {
            category_id: "",
            name: "",
            description: "",
            images: [''],
        },
    });

    async function onSubmit(values: ProductReqBody) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await axios.post("http://localhost:8001/categories", values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Result:", result);

            toast({
                description: result.data.message,
                duration: 1000,
            });

        } catch (error: any) {

            handleErrorsApi({
                error: error.response.data,
                setError: form.setError,
            });
        } finally {
            setLoading(false);
            navigate('/dashboard/categories')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center">
                <div className="flex flex-col py-32 gap-11">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <div className="relative flex flex-col gap-4">
                                <FormItem className="flex items-center">
                                    <FormLabel className="w-[6rem] text-text">Product's Name</FormLabel>
                                    <FormControl>
                                        <Input className="w-[24rem] h-[3rem] rounded-sm" placeholder="Input Product's Name" {...field} />
                                    </FormControl>
                                </FormItem>
                                <FormMessage className="absolute top-full left-0 ml-[6rem] text-xs" />
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <div className="relative flex flex-col gap-2">
                                <FormItem className="flex items-center">
                                    <FormLabel className="w-[6rem] text-text">Price</FormLabel>
                                    <FormControl>
                                        <Input className="w-[24rem] h-[3rem] rounded-sm" placeholder="Price" {...field} />
                                    </FormControl>
                                </FormItem>
                                <FormMessage className="absolute top-full left-0 text-xs" />
                            </div>
                        )}
                    />
                    <Button type="submit" className="w-full h-[2.8rem] uppercase font-bold text-white rounded-sm">
                        Add Category
                    </Button>
                </div>
            </form>
        </Form>
    );
}
