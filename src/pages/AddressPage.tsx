import React from 'react'
import { Link } from 'react-router-dom'

function AddressPage() {
  return (
    <div className=" flex flex-col gap-6 bg-white">
      <div className=' p-4 border border-gray-200 rounded-sm cursor-pointer'>   <div className="flex items-center font-bold py-4 pl-6 rounded-t border border-gray-200 bg-white text-gray-900 text-sm uppercase">
        Shipping Address
      </div>
      </div>
      <Link to='/address/billing-address' className=' p-4 border border-gray-200 rounded-sm cursor-pointer'>   <div className="flex items-center font-bold py-4 pl-6 rounded-t border border-gray-200 bg-white text-gray-900 text-sm uppercase">
        Billing Address
      </div>
      </Link>

    </div>
  )
}

export default AddressPage