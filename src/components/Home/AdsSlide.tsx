import { Carousel } from 'flowbite-react'
import imgHome1 from '../../assets/imageHome/imgHome1.png'



function AdsSlide() {
  return (
    <>
      {/* <div className="bg-[#FFE8F0] h-[2.5rem] flex items-center justify-center gap-16">
      <div className="text-sm font-bold">25% OFF - SITEWIDE <span className="font-semibold">- click here</span> </div>
      <div className="w-8 h-8 rounded-[50%] bg-white flex items-center justify-center text-[0.75rem] font-bold">OR</div>
      <div className="text-sm font-bold">FREE SHIPPING $100 MIN  <span className="font-semibold">- click here</span> </div>
    </div> */}

      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 px-[7rem] mt-[1.13rem]">
        <Carousel className='rounded-none' >
          <img src={imgHome1} alt="..." />
          <img src={imgHome1} alt="..." />
          <img src={imgHome1} alt="..." />
          <img src={imgHome1} alt="..." />
        </Carousel>
      </div>
    </>
  )
}

export default AdsSlide