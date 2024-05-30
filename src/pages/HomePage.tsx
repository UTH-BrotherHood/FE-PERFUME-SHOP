import AdsSlide from '../components/Home/AdsSlide'
import Widget from '../components/Home/Widget'
import ShopCollection from '../components/Home/ShopCollection'
import Recommend from '../components/Home/Recommend'
import NewArrival from '../components/Home/NewArrival'
import BestSeller from '../components/Home/BestSeller'

function HomePage() {
  return (
    <div >
      <AdsSlide />
      <Widget />
      <ShopCollection />
      <Recommend />
      <NewArrival />
      <BestSeller />
    </div>
  )
}

export default HomePage