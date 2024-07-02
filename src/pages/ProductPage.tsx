import { useEffect, useState } from 'react';
import SideBar from '../components/Product/SideBar';
import ProductList from '../components/Product/ProductList';
import { useAppDispatch } from '../store/store';
import { fetchCategoriesAsync } from '../store/features/categoriesSlice';




const ProductsPage: React.FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState<[number, number] | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [genderFilter, setGenderFilter] = useState<string[]>([]);

  const resetFilters = () => {
    setBrandFilter([]);
    setPriceRangeFilter(null);
    setSizeFilter([]);
    setGenderFilter([]);
  };

  return (
    <div className='flex gap-14 px-12'>
      <SideBar
        setBrandFilter={setBrandFilter}
        setPriceRangeFilter={setPriceRangeFilter}
        setSizeFilter={setSizeFilter}
        setGenderFilter={setGenderFilter}
        resetFilters={resetFilters}
      />
      <ProductList
        brandFilter={brandFilter}
        priceRangeFilter={priceRangeFilter}
        sizeFilter={sizeFilter}
        genderFilter={genderFilter}
      />
    </div>
  );
};

export default ProductsPage;
