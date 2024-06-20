import SideBar from '../components/Product/SideBar'
import ProductList from '../components/Product/ProductList'

interface Perfume {
  id: number;
  name: string;
  brand: string;
  price: number;
  size: string;
  gender: string;
  image: string;
}

const perfumes: Perfume[] = [
  { id: 1, name: "Armaf Passion", brand: "Armaf", price: 51.74, size: "large", gender: "female", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Jo Malone Vetiver", brand: "Jo Malone", price: 75.00, size: "medium", gender: "female", image: "https://via.placeholder.com/150" },

];

function ProductPage() {

  return (
    <div className='flex px-12 w-[100%] gap-4 justify-between'>
      <SideBar />
      <ProductList />
    </div>
  )
}

export default ProductPage