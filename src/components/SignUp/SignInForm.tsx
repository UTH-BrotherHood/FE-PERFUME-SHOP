import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { SignInBodyType } from "../../schemaValidations/auth.schema";
import { handleErrorsApi } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { userLogin, setUser, setAccessToken } from "../../store/features/authSlice";
import http from '../../utils/http';

export default function SignInForm() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const form = useForm<SignInBodyType>({
        defaultValues: {
            email: "xuannvuongg+269@gmail.com",
            password: "String.123",
        },
    });

    async function onSubmit(values: SignInBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await http.post("/users/login", values);
            console.log("Result:", result);
            toast({
                description: result.data.message,
            });

            const user = result.data.result.userInfo;
            const token = result.data.result.access_token;

            // Save user and token to redux state
            dispatch(setUser(user));
            dispatch(setAccessToken(token));

            // Save token to localStorage
            localStorage.setItem("accessToken", token);

            console.log(result.data.result);
            navigate('/');
        } catch (error: any) {
            console.log("Error:", error.response.data);
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
                <div className="flex flex-col gap-11 mt-4">
                    <div className="flex gap-11">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <div className="relative flex flex-col gap-2">
                                    <FormItem className="flex items-center">
                                        <FormLabel className="w-[6rem] text-text">Email</FormLabel>
                                        <FormControl>
                                            <Input className="w-[24rem] h-[3rem] rounded-sm" placeholder="Input Your Email" {...field} />
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
                            name="password"
                            render={({ field }) => (
                                <div className="relative flex flex-col gap-2">
                                    <FormItem className="flex items-center">
                                        <FormLabel className="w-[6rem] text-text">Password</FormLabel>
                                        <FormControl>
                                            <Input className="w-[24rem] h-[3rem] rounded-sm" placeholder="Password" type="password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                    <FormMessage className="absolute top-full left-0 text-xs" />
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex w-full justify-between items-center mt-6">
                        <Button type="submit" className="w-[17rem] h-[2.8rem] uppercase font-bold text-white rounded-sm">
                            SIGN IN
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
