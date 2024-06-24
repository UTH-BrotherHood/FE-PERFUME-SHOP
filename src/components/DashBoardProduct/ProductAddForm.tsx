/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { ProductReqBody } from "../../schemaValidations/product.schema";
import http from "../../utils/http";
import { createProduct } from '../../apis/ProductApi';
import { useAppSelector } from '../../store/store';
import { selectAccessToken } from '../../store/features/authSlice';
import { handleErrorsApi } from '../../utils/utils';
import { fetchCategory } from '../../apis/CategoryApi';
import { Select } from '../ui/select';

export default function ProductAddForm() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { toast } = useToast();
  const accessToken = useAppSelector(selectAccessToken);
  const form = useForm<ProductReqBody>({
    defaultValues: {
      category_id: '',
      name: '',
      description: '',
      discount: 0,
      images: [],
      stock: 0,
      price: 0
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await fetchCategory({}, accessToken as string);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, [accessToken]);

  async function onSubmit(values: ProductReqBody) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await createProduct(values, accessToken as string);
  
      toast({
        description: "Product added successfully!",
      });
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center">
        <div className="flex gap-11">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div className="relative flex flex-col gap-4">
                <FormItem className="flex items-center">
                  <FormLabel className="w-[6rem] text-text">Name</FormLabel>
                  <FormControl>
                    <Input className="w-[24rem] h-[3rem] rounded-sm" placeholder="Product Name" {...field} />
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
                  <FormLabel className="w-[6rem] text-text">Description</FormLabel>
                  <FormControl>
                    <Input className="w-[24rem] h-[3rem] rounded-sm" placeholder="Product Description" {...field} />
                  </FormControl>
                </FormItem>
                <FormMessage className="absolute top-full left-0 ml-[6rem] text-xs" />
              </div>
            )}
          />
        </div>
        <div className="flex gap-11">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <div className="relative flex flex-col gap-4">
                <FormItem className="flex items-center">
                  <FormLabel className="w-[6rem] text-text">Price</FormLabel>
                  <FormControl>
                    <Input className="w-[24rem] h-[3rem] rounded-sm" placeholder="Product Price" type="number" {...field} />
                  </FormControl>
                </FormItem>
                <FormMessage className="absolute top-full left-0 ml-[6rem] text-xs" />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <div className="relative flex flex-col gap-4">
                <FormItem className="flex items-center">
                  <FormLabel className="w-[6rem] text-text">Stock</FormLabel>
                  <FormControl>
                    <Input className="w-[24rem] h-[3rem] rounded-sm" placeholder="Product Stock" type="number" {...field} />
                  </FormControl>
                </FormItem>
                <FormMessage className="absolute top-full left-0 ml-[6rem] text-xs" />
              </div>
            )}
          />
        </div>
        <div className="flex gap-11">
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <div className="relative flex flex-col gap-4">
                <FormItem className="flex items-center">
                  <FormLabel className="w-[6rem] text-text">Category</FormLabel>
                  <FormControl>
                    <Select  {...field}>
                      <option value="">Select Category</option>
                      {categories.map((category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </FormItem>
                <FormMessage className="absolute top-full left-0 ml-[6rem] text-xs" />
              </div>
            )}
          />
        </div>
        <div className="flex w-full justify-between items-center mt-6">
          <Button type="submit" className="w-[17rem] h-[2.8rem] uppercase font-bold text-white rounded-sm">
            Add Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
