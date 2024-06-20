import SideBar from '../components/Product/SideBar'
import ProductList from '../components/Product/ProductList'





function ProductPage() {

  return (
    <div className='flex px-12 w-[100%] gap-4 py-8 justify-between'>
      <SideBar />
      <ProductList />
    </div>
  )
}

export default ProductPage