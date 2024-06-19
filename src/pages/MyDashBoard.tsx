import React from 'react';


const Dashboard: React.FC = () => {
  return (
    <div className="px-[12rem]">
  <div className="text-2xl  font-bold mt-4 text-center">My Dashboard</div>

      <div className="flex flex-col md:flex-row min-h-screen mr-4">

        <aside className="w-full md:w-2/5 p-6 ">
          <nav >
            <div className='border p-4 bg-white '>
            <h2 className="font-bold text-lg mb-2">Account Dashboard</h2>
            <ul className='text-gray-500 py-2'>
              <li className="py-2 "><a href="#">Account Information</a></li>
              <li className="py-2"><a href="#">Address Book</a></li>
              <li className="py-2"><a href="#">My Orders</a></li>
              <li className="py-2"><a href="#">My Wishlist</a></li>
              <li className="py-2"><a href="#">My Subscriptions</a></li>
              <li className="py-2"><a href="#">Check Gift Certificate Balance</a></li>
            </ul>
            </div>

            <button className="w-full mt-4 p-2 border border-red-500 text-red-500 bg-white text-center">Log Out</button>
            <div className="mt-6 p-4 text-center border p-4 bg-white">
              <h3 className="font-bold">WIN A $250 SHOPPING SPREE!</h3>
              <p>Take Part In Our Monthly Giveaway</p>
              <a href="#" className="text-purple-400 underline">Enter Now</a>
            </div>
          </nav>
        </aside>

        <main className="w-full md:w-3/4 p-6">
  <div className="flex flex-wrap md:flex-nowrap space-y-8 md:space-y-0 md:space-x-8 mb-8">
    <section className="w-full md:w-1/2 ">
      <h2 className='font-extrabold mb-4'>ACCOUNT INFORMATION</h2>
      <div className='text-gray-500 font-normal mb-4 text-sm '>
              <p><strong>Contact Information</strong></p>
                <p>Alex Driver</p>
                <p>exampleaddress@gmail.com</p>
      </div>

      <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Edit</button>
      <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Change Password</button>
    </section>
    <section className="w-full md:w-1/2 flex flex-col">
      <div className="flex-grow mt-10 text-gray-500 font-normal mb-4 text-sm">

        <p><strong>Newletters</strong></p>
        <p>You Don't Subscribe To Our Newsletter.</p>
      </div>
      <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Edit</button>
    </section>

  </div>
  <div className="flex flex-wrap md:flex-nowrap space-y-8 md:space-y-0 md:space-x-8 mb-8">
    <section className="w-full md:w-1/2 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Address Book</h2>
      <div className="flex-grow text-gray-500 font-normal mb-4 text-sm">
        <p><strong>Default Billing Address</strong></p>
        <p>You Have Not Set A Default Billing Address.</p>
      </div>
      <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Edit Address</button>
    </section>
    <section className="w-full md:w-1/2 flex flex-col">
      <div className="flex-grow mt-10 text-gray-500 font-normal mb-4 text-sm">
        <p><strong>Default Shipping Address</strong></p>
        <p>You Have Not Set A Default Shipping Address.</p>
      </div>
      <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Edit Address</button>
    </section>
  </div>
</main>

      </div>
    </div>
  );
}

export default Dashboard;
