/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useState } from "react";
import { Button } from "../ui/button";
import { RegisterBodyType } from "../../schemaValidations/auth.schema";
import { handleErrorsApi } from "../../utils/utils";
import http from "../../utils/http";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<RegisterBodyType>({
        defaultValues: {
            name: "Vuong",
            email: "xuannvuongg+269@gmail.com",
            password: "String.123",
            confirm_password: "String.123",
            date_of_birth: "2004-04-24",
        },
    });

    async function onSubmit(values: RegisterBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await http.post("/users/register", values);
          
            toast({
                description: result.data.message,
            });
            navigate('/sign-in')
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
                                        <Input className="w-[24rem] h-[3rem] rounded-sm" placeholder="Input Your Name" {...field} />
                                    </FormControl>
                                </FormItem>
                                <FormMessage className="absolute top-full left-0 ml-[6rem] text-xs" />
                            </div>
                        )}
                    />
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
                <div className="flex flex-col gap-11 mt-4">
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
                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <div className="relative flex flex-col gap-2">
                                    <FormItem className="flex items-center">
                                        <FormLabel className="w-[6rem] text-text">Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input className="w-[24rem] h-[3rem] rounded-sm" placeholder="Confirm Password" type="password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                    <FormMessage className="absolute top-full left-0 text-xs" />
                                </div>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="date_of_birth"
                        render={({ field }) => (
                            <div className="relative flex flex-col gap-2">
                                <FormItem className="flex items-center">
                                    <FormLabel className="w-[6rem] text-text">Date of Birth</FormLabel>
                                    <FormControl>
                                        <Input className="w-[24rem] h-[3rem] rounded-sm" placeholder="YYYY-MM-DD" type="date" {...field} />
                                    </FormControl>
                                </FormItem>
                                <FormMessage className="absolute top-full left-0 text-xs" />
                            </div>
                        )}
                    />
                    <div className="flex w-full justify-between items-center mt-6">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="confirm" name="fav_language" value="HTML" />
                            <label className="text-sm text-secondary" htmlFor="confirm">
                                I Agree To Receive Promotional Emails And Consent To Our <span className="underline">Terms Of Use</span> And <span className="underline">Privacy Policy</span>.
                            </label>
                        </div>
                        <Button type="submit" className="w-[17rem] h-[2.8rem] uppercase font-bold text-white rounded-sm">
                            SIGN UP
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
