import React from 'react'
import SideBar from '../components/Product/SideBar'
import ProductList from '../components/Product/ProductList'

function ProductPage() {
  return (
    <div className='flex justify-between'>
      <SideBar />
      <ProductList />
    </div>
  )
}

export default ProductPage