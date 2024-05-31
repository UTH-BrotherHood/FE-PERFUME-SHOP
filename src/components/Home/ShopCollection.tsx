
import React from 'react'


const perfumes = [
  { name: "Women’s perfume", bgImage: "https://www.escentual.com/blog/wp-content/uploads/2022/12/What-is-the-most-iconic-perfume_-Iconic-female-fragrances.jpg" },
  { name: "men’s cologne", bgImage: "https://media.allure.com/photos/6478c96e0613ca293624052a/16:9/w_2580,c_limit/FathersDayScents.jpg" },
  { name: "Haircare", bgImage: "https://whiteroombrooklyn.com/cdn/shop/products/sachajuan-hair-care-hair-styling-products-hair-wax-29476197380.jpg?v=1528568589&width=1445" },
  { name: "skincare", bgImage: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/rockcms/2024-01/240117-staff-skin-care-routines-social-2c85d8.jpg" },
  { name: "gift sets", bgImage: "https://m.media-amazon.com/images/I/71LMVSg0+YL._AC_UF894,1000_QL80_.jpg" },
  { name: "best sellers", bgImage: "https://product.hstatic.net/200000455149/product/32a1d7abf1c243f1f4dd258ef6f71eee_3532f75f931e4580b10114a159a6357f_master.jpeg" },
];

function ShopCollection() {
  const firstRow = perfumes.slice(0, 3);
  const secondRow = perfumes.slice(3);

  return (
    <div className="space-y-4  flex flex-col items-center gap-8">

      <div>


        <div className="flex flex-col items-center">

          <p className="font-bold text-3xl uppercase text-center  mb-4">Shop Our COLLECTION</p>
          <p className="capitalize leading-6 text-center mb-6">Our delicious, limited-edition collection</p>
          <div className="w-40 h-[2.8rem] border-[2px] border-[#898989] font-bold  justify-center items-center flex text-sm">LOGIN</div>
        </div>
      </div>
      <div className="flex space-x-4 gap-8 ">
        {firstRow.map((perfume, index) => (
          <div
            key={index}
            className='relative w-[25rem] h-[20rem] flex items-center justify-center bg-cover bg-center'
            style={{ backgroundImage: `url(${perfume.bgImage})` }}
          >
            <div className='absolute inset-0 bg-black bg-opacity-30 backdrop-blur-none'></div>
            <div className='relative z-10 p-4 text-white flex flex-col items-center gap-[1.4rem] '>
              <p className=' text-3xl uppercase  tracking-[0.24rem]'>{perfume.name}</p>
              <p className='font-[450] underline cursor-pointer'>Shop Now</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-4 gap-8">
        {secondRow.map((perfume, index) => (
          <div
            key={index}
            className='relative w-[25rem] h-[20rem] flex items-center justify-center bg-cover bg-center'
            style={{ backgroundImage: `url(${perfume.bgImage})` }}
          >
            <div className='absolute inset-0 bg-black bg-opacity-30 backdrop-blur-none'></div>
            <div className='relative z-10 p-4 text-white flex flex-col items-center gap-[1.4rem] '>
              <p className=' text-3xl uppercase  tracking-[0.24rem]'>{perfume.name}</p>
              <p className='font-[450] underline cursor-pointer'>Shop Now</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopCollection
