import { useForm, FormProvider } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import TickIcon from "./TickIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil1Icon } from "@radix-ui/react-icons";
import TimesIcon from "./TimesIcon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

interface User {
  username: string;
  email: string;
  avatar: string;
  date_of_birth: string;
  id: string;
  phone_number: string | null;
  total_cart_quantity: number;
  total_wishlist_quantity: number;
  created_at: string;
  updated_at: string;
  verify: string;
}

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formMethods = useForm<User>({
    defaultValues: {
      email: '',
      username: '',
      phone_number: '',
      date_of_birth: '',
    },
  });

  const { handleSubmit, control, setValue } = formMethods;

  const onSubmit = async (data: User) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const config = {
        baseURL: 'http://localhost:8001',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      try {
        const response = await axios.put("/users/me", data, config);
        console.log('User updated:', response.data.result);
        setUser(response.data.result);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const config = {
          baseURL: 'http://localhost:8001',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        try {
          const response = await axios.get("/users/me", config);
          console.log('User fetched:', response.data.result);
          setUser(response.data.result);
          const { email, username, phone_number, date_of_birth } = response.data.result;
          setValue("email", email);
          setValue("username", username);
          setValue("phone_number", phone_number);
          setValue("date_of_birth", date_of_birth);
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);
        }
      }
    };

    fetchData();
  }, [setValue]);

  return (
    <div className="border border-gray-200 bg-white">
      <div className="flex items-center font-bold py-4 pl-6 rounded-t border-b border-gray-200 bg-white text-gray-900 text-sm uppercase">
        ACCOUNT SETTING
      </div>
      <div className="pt-6 relative">
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex pl-6 gap-12  border-b-[1px] pb-20 border-gray-100">
            <div className="flex flex-col items-center gap-4">
              <img src={user?.avatar || "https://i.pinimg.com/736x/c3/36/0a/c3360abaf6a9294f02f65e703a13cf69.jpg"} alt="avatar" className="w-36 h-36 rounded-[50%]" />
              <p className="font-semibold text-gray-500 italic text-sm flex items-center gap-2">{user?.username} <TickIcon verified={user?.verify === "Verified"} /></p>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="w-8 flex justify-center items-center absolute right-5  top-5 h-8 bg-primary text-white rounded-[50%]"
              >
                {isEditing ? <TimesIcon /> : <Pencil1Icon />}
              </button>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex justify-center gap-28">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }: { field: any }) => (
                    <div className="relative flex">
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="w-[6rem] text-gray-500">Email</FormLabel>
                        <FormControl>
                          <Input
                            className="w-[18rem] h-[3rem] rounded-sm"
                            placeholder="Input Your Email"
                            {...field}
                            disabled={!isEditing}
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage className="absolute top-full left-0 ml-[6rem] text-xs" />
                    </div>
                  )}
                />
                <FormField
                  control={control}
                  name="username"
                  render={({ field }: { field: any }) => (
                    <div className="relative flex">
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="w-[6rem] text-gray-500">Username</FormLabel>
                        <FormControl>
                          <Input
                            className="w-[18rem] h-[3rem] rounded-sm"
                            placeholder="Input Your Username"
                            {...field}
                            disabled={!isEditing}
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage className="absolute top-full left-0 ml-[6rem] text-xs" />
                    </div>
                  )}
                />
              </div>
              <div className="flex justify-center gap-28">
                <FormField
                  control={control}
                  name="phone_number"
                  render={({ field }: { field: any }) => (
                    <div className="relative flex">
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className=" text-gray-500">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            className="w-[18rem] h-[3rem] rounded-sm"
                            placeholder="Input Your Phone Number"
                            {...field}
                            disabled={!isEditing}
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage className="absolute top-full left-0 ml-[6rem] text-xs" />
                    </div>
                  )}
                />
                <FormField
                  control={control}
                  name="date_of_birth"
                  render={({ field }: { field: any }) => (
                    <div className="relative flex">
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="w-[6rem] text-gray-500">Date of Birth</FormLabel>
                        <FormControl>
                          <Input
                            className="w-[18rem] h-[3rem] rounded-sm"
                            placeholder="Input Your Date of Birth"
                            {...field}
                            disabled={!isEditing}
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage className="absolute top-full left-0 ml-[6rem] text-xs" />
                    </div>
                  )}
                />
              </div>
              {isEditing && (
                <div className="flex justify-center">
                  <button type="submit" className="w-8 flex justify-center items-center absolute right-5 shadow-lg top-16 text-[0.6rem] h-8 bg-primary text-white rounded-[50%]">Save</button>
                </div>
              )}
              
            </div>
          </form>
        </FormProvider>
        <div className="flex flex-col gap-4 p-4 ">

          <p className="text-sm  font-semibold uppercase   ">About PERFUMESHOP.COM</p>
          <p className="text-xs text-[#8f8f8f]">PerfumeShop Has Been Trusted Online Since 1997. We Have Shipped Over 30 Million Packages And Have Sold Over $1 Billion In
            Beauty Products. We Carry 17,000 Genuine, Brand Name Perfumes, Skincare, Makeup, Haircare, Aromatherapy And Candles All At
            Discount Prices. We Offer Free Shipping In U.S. With A Minimum Order. PerfumeShop Has Received An A+ Rating From The Better
            Business Bureau.</p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[#969696] text-xs">Product Guarantee</AccordionTrigger>
              <AccordionContent>
               
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[#969696] text-xs">  Our Commitment</AccordionTrigger>
              <AccordionContent>

              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[#969696] text-xs"> Legal Disclaimer</AccordionTrigger>
              <AccordionContent>

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        

         
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
