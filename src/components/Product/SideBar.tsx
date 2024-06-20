import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion"
import { Button } from "../ui/button"
import { Input } from "../ui/input"


function SideBar() {
    return (

        <div className='w-[20%]'>
            <div className='grid gap-2 grid-cols-3'>
                <div className="inline-flex items-center justify-center  gap-[0.38rem]  bg-[#F5F6F6] p-2 ">
                    <div className='text-xs font-semibold leading-5 uppercase'>CK ONE</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M9.375 2.625L2.625 9.375" stroke="#929FA5" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                        <path d="M9.375 9.375L2.625 2.625" stroke="#929FA5" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className="inline-flex items-center gap-[0.38rem] justify-center    bg-[#F5F6F6] p-2 ">
                    <div className='text-xs font-semibold leading-5 uppercase'>75 ML</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M9.375 2.625L2.625 9.375" stroke="#929FA5" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                        <path d="M9.375 9.375L2.625 2.625" stroke="#929FA5" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div className='border-[1px] border-[#BE5B75] text-[#BE5B75] w-full h-[2.875rem] justify-center items-center flex mt-6 text-sm font-bold uppercase'>RESET ALL FILTERS</div>
            <div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>FEATURED BRANDS</AccordionTrigger>
                        <AccordionContent>
                            Thang nguyenkenny vo code cho t
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>PRICE RANGE</AccordionTrigger>
                        <AccordionContent>
                            Thang nguyenkenny vo code cho t
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>PARFUME SIZE</AccordionTrigger>
                        <AccordionContent>
                            Thang nguyenkenny vo code cho t
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>GENDER</AccordionTrigger>
                        <AccordionContent>
                            Thang nguyenkenny vo code cho t
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="flex flex-col  gap-3 w-full py-4 pt-4">
                <p className="text-sm">LIST COUPON OURJOIN</p>
                <Input placeholder="Email Address" className="w-full rounded-none" />
                <Button type="submit" className="w-full h-[2.8rem] uppercase font-bold text-white rounded-sm">
                    SIGN UP
                </Button>
            </div>
            <div className="flex flex-col  gap-3 w-full py-4 pt-4">
                <p className="text-sm">ABOUT WOMEN'S PERFUME</p>
                <p className="text-xs">The Only Place To Shop The Latest Designer
                    Perfumes At Discounts Up To 80% Off
                    Department Store Prices. We Offer The
                    Largest Selection Of The Latest Brand Name
                    Perfumes And Discount Perfume Products.
                    Shop And Save On All Women's Perfume
                    Today.</p>
            </div>
        </div>






    )
}

export default SideBar