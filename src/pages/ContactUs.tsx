import React from 'react'

function ContactUs() {
    return (
        <div>
            <p className='font-extrabold uppercase text-center text-lg my-6'>Let Us Help You</p>
            <div className='bg-gray-100 py-6 flex justify-center items-center'>
                <input className="w-[400px]  h-[45px] border-b-[3px] border-primary   text-primary px-2 text-sm focus:outline-none " placeholder='Enter Your Question' type='text' />
            </div>
            <div className='px-[10rem] mt-8 flex gap-12'>
                <div className='flex flex-col p-4 gap-6 border-[2px] border-gray-100 w-1/3 text-gray-500 font-semibold text-sm'>
                    <div>Contact Us</div>
                    <div>Ordering</div>
                    <div>Shipping Information</div>
                    <div>Returns & Cancellations</div>
                    <div>My Account</div>
                    <div>Update Email Preferences</div>
                    <div>Adding to your Address Book</div>
                    <div>Gift Certificates  </div>
                </div>
                <div>
                    <div className='flex gap-6'>
                        <div className="w-40 h-12 bg-primary font-bold text-white justify-center items-center flex text-sm">LOGIN</div>
                        <div className="w-40 h-12 bg-white font-bold border-[3px] justify-center items-center flex text-sm">ORDER STATUS</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs