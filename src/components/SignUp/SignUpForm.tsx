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

export default function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<RegisterBodyType>({
        defaultValues: {
            name: "Vuong",
            email: "xuannvuongg+69@gmail.com",
            password: "String.123",
            confirm_password: "String.123",
            date_of_birth: "2004-04-24"
        },
    });

    async function onSubmit(values: RegisterBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await http.post("/users/register", values);
            console.log("Result:", result);
            toast({
                description: result.data.message,
            });
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
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 max-w-[400px] flex-shrink-0  w-full"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Input Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Input Your Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ConfirmPassword</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="confirmPassword"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full !mt-6">
                    Register
                </Button>
            </form>
        </Form>
    );
}
