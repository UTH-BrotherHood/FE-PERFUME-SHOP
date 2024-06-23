import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { selectCategories, selectCategoriesError, selectCategoriesLoading } from '../../store/features/categoriesSlice';

interface SideBarProps {
    setBrandFilter: (brands: string[]) => void;
    setPriceRangeFilter: (range: [number, number] | null) => void;
    setSizeFilter: (sizes: string[]) => void;
    setGenderFilter: (genders: string[]) => void;
    resetFilters: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ setBrandFilter, setPriceRangeFilter, setSizeFilter, setGenderFilter, resetFilters }) => {
    const categories = useAppSelector(selectCategories);
    console.log(categories)
    const loading = useAppSelector(selectCategoriesLoading);
    const error = useAppSelector(selectCategoriesError);

    const [priceRangeFilter, setPriceRangeFilterState] = useState<[number, number] | null>(null);

    // useEffect(() => {
        
    // }, [loading, error]);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const minValue = Number(e.target.value);
        setPriceRangeFilterState(prev => [minValue, prev ? prev[1] : 0]);
        setPriceRangeFilter([minValue, priceRangeFilter ? priceRangeFilter[1] : 0]);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxValue = Number(e.target.value);
        setPriceRangeFilterState(prev => [prev ? prev[0] : 0, maxValue]);
        setPriceRangeFilter([priceRangeFilter ? priceRangeFilter[0] : 0, maxValue]);
    };

    return (
        <>
        
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
                <div onClick={resetFilters}  className='border-[1px] border-[#BE5B75] text-[#BE5B75] w-full h-[2.875rem] justify-center items-center flex mt-6 text-sm font-bold uppercase'>RESET ALL FILTERS</div>
            <div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>FEATURED BRANDS</AccordionTrigger>
                            <AccordionContent>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error: {error}</p>}
                                {!loading && !error && (
                                    <div>
                                        {categories?.map((category) => (
                                            <Button key={category.id} onClick={() => setBrandFilter([category.id])}>
                                                {category.name}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>PRICE RANGE</AccordionTrigger>
                            <AccordionContent>
                                <Input
                                    type="number"
                                    placeholder="Min price"
                                    onChange={handleMinPriceChange}
                                />
                                <Input
                                    type="number"
                                    placeholder="Max price"
                                    onChange={handleMaxPriceChange}
                                />
                            </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>PARFUME SIZE</AccordionTrigger>
                            <AccordionContent>
                                <Input
                                    onChange={(e) => setSizeFilter(e.target.value.split(','))}
                                    placeholder="Enter sizes, separated by commas"
                                />
                            </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>GENDER</AccordionTrigger>
                            <AccordionContent>
                                <Button onClick={() => setGenderFilter(['Women'])}>Women</Button>
                                <Button onClick={() => setGenderFilter(['Men'])}>Men</Button>
                                <Button onClick={() => setGenderFilter(['Unisex'])}>Unisex</Button>
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
       </>
    );
};

export default SideBar;
