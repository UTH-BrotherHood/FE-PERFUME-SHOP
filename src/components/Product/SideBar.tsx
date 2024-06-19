import { Dropdown } from 'flowbite-react'
import React from 'react'

function SideBar() {
    return (

        <div>
            <div className='grid gap-2 grid-cols-3'>
                <div className="inline-flex items-center justify-center  gap-[0.38rem]  bg-[#F5F6F6] p-2 ">
                    <div className='text-xs font-semibold leading-5 uppercase'>CK ONE</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M9.375 2.625L2.625 9.375" stroke="#929FA5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9.375 9.375L2.625 2.625" stroke="#929FA5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className="inline-flex items-center gap-[0.38rem] justify-center    bg-[#F5F6F6] p-2 ">
                    <div className='text-xs font-semibold leading-5 uppercase'>75 ML</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M9.375 2.625L2.625 9.375" stroke="#929FA5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9.375 9.375L2.625 2.625" stroke="#929FA5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div className='border-[1px] border-[#BE5B75] text-[#BE5B75] w-full h-[2.875rem] justify-center items-center flex mt-6 text-sm font-bold uppercase'>RESET ALL FILTERS</div>
            <div>
                <Dropdown label="Small dropdown" size="sm">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
        </div>
        
        </div>
   





    )
}

export default SideBar