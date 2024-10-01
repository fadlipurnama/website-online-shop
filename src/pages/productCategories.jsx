import { useEffect, useState } from "react";
import PaginationProducts from "../components/Fragments/PaginationProducts";
import ProductList from "../components/Fragments/ProductsList";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { useFilterProductCategories } from "../hooks/useFilterProductCategories";
import FilterProduct from "../components/Fragments/FilterProduct";
import { useParams } from "react-router-dom";
import DataNotFound from "../components/Fragments/DataNotFound";
import LoadingPage from "./loading";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetProducts } from "../redux/products/action";
const ProductCategoriesPage = () => {
  const dispatch = useDispatch();
  const { products = [], loading } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * 8;

  const [
    filteredProducts,
    searchTerm,
    priceFilter,
    brands,
    brandFilter,
    setSearchTerm,
    setPriceFilter,
    setBrandFilter,
  ] = useFilterProductCategories(products, loading);

  useEffect(() => {
    dispatch(asyncSetProducts());
  }, [dispatch]);

  const selectedProducts = filteredProducts?.slice(startIndex, startIndex + 8);
  const { categories } = useParams();

  return (
    <DefaultLayout
      title={`Tersedia Berbagai Barang Elektrik | ${categories}`}
    >
      {loading ? (
        <LoadingPage />
      ) : products ? (
        filteredProducts && (
          <>
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
            <ProductList products={selectedProducts} loading={loading} />
            <PaginationProducts
              data={filteredProducts}
              currentPage={currentPage}
              pageSize={8}
              setCurrentPage={setCurrentPage}
            />
          </>
        )
      ) : (
        <DataNotFound
          title={"Data tidak ditemukan"}
          description={"Informasi produk yang kamu cari tidak ada."}
        />
      )}
    </DefaultLayout>
  );
};

export default ProductCategoriesPage;
