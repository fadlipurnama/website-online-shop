import { useState } from "react";
import PaginationProducts from "../components/Fragments/PaginationProducts";
import ProductList from "../components/Fragments/ProductsList";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { useFilterProductCategories } from "../hooks/useFilterProductCategories";
import FilterProduct from "../components/Fragments/FIlterProduct";
import {  useParams } from "react-router-dom";
const ProductCategoriesPage = () => {
  const [
    filteredProducts,
    searchTerm,
    loading,
    priceFilter,
    brands,
    brandFilter,
    setSearchTerm,
    setPriceFilter,
    setBrandFilter,
  ] = useFilterProductCategories();
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * 8;
  const selectedProducts = filteredProducts?.slice(startIndex, startIndex + 8);

  const { categories } = useParams();

  return (
    <>
      <DefaultLayout firstTitle={categories} title={`Tersedia Berbagai Barang Elektrik | ${categories}`}>
        <FilterProduct
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priceFilter={priceFilter}
          brandFilter={brandFilter}
          setPriceFilter={setPriceFilter}
          setBrandFilter={setBrandFilter}
          loading={loading}
          brands={brands}
        />
        <ProductList
          products={selectedProducts}
          loading={loading}
        />
        {filteredProducts?.length !== 0 && (
          <PaginationProducts
            data={filteredProducts}
            currentPage={currentPage}
            pageSize={8}
            setCurrentPage={setCurrentPage}
          />
        )}
      </DefaultLayout>
    </>
  );
};

export default ProductCategoriesPage;
