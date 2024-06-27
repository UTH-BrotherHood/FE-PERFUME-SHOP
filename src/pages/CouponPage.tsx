import React, { useState, useEffect } from 'react';

type Coupon = {
  id: number;
  discount: string;
  description: string;
  expiryDate: string;
};

const Coupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    fetch('')
      .then(response => response.json())
      .then(data => setCoupons(data))
      .catch(error => console.error('Error fetching coupons:', error));
  }, []);

  return (

    <div className="container mx-auto p-4 text-center">
      <p className='pb-2'>HOME {">"} PerfumeShop Coupons</p>
      <h1 className="text-2xl font-bold mb-4 ">PERFUMESHOP COUPONS*</h1>
      <p className="mb-4">Save BIG On Your Favorite Beauty Products. Check Out Our Exclusive Coupons Below.</p>
      <p className="mb-4 text-gray-500 no-underline">* Coupon valid for online orders only</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map(coupon => (
          <div key={coupon.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{coupon.discount}</h2>
            <p className="mb-2">{coupon.description}</p>
            <p className="mb-4 text-gray-500">Expires: {coupon.expiryDate}</p>
            <a href="/" className="bg-primary text-white px-4 py-2 rounded">
              REDEEM COUPON
            </a>

          </div>

        ))}
      </div>
      <div className="text-xs">Coupon is One-Time Use Only All Sales Subject To Availability Offer Good While Supplies Last Designer Exclusions Mat Apply, Coupon Cannot Be Combined With Any Other, Coupons Or Promotions, Non-Negotiable And Non-Transferable. Coupon Has No Cash Value And Cannot Be Sold Or Bartered. If This Coupon Is Intentionally Misused, it May Result In An Adjustment Or Cancellation Of The Bill Or Order, Void Where Prohibited PerfumeShop.Com Retains The Right To Terminate Or Modify This Offer At Any Time. Additional Restrictions May Apply. See Terms Of Use   </div>
    </div>
  );
};

export default Coupons;
