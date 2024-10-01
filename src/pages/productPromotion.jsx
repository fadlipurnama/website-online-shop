import { useState } from "react";
import PaginationProducts from "../components/Fragments/PaginationProducts";
import ProductList from "../components/Fragments/ProductsList";
import FilterProduct from "../components/Fragments/FilterProduct";
import { useFilterProductPromotion } from "../hooks/useFilterProductPromotion";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import LoadingPage from "./loading";
import DataNotFound from "../components/Fragments/DataNotFound";
const ProductPromotionPage = () => {
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
  ] = useFilterProductPromotion();
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * 8;
  const selectedProducts = filteredProducts?.slice(startIndex, startIndex + 8);

  const { name, description } = JSON.parse(
    localStorage.getItem("promotionData"),
  );

  return (
    <DefaultLayout pathPartsSlice={4} title={name} description={description}>
      {loading ? (
        <LoadingPage />
      ) : filteredProducts ? (
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
          {filteredProducts?.length !== 0 && (
            <PaginationProducts
              data={filteredProducts}
              currentPage={currentPage}
              pageSize={8}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      ) : (
        <DataNotFound
          title={"Data tidak ditemukan"}
          description={"Informasi produk yang kamu cari tidak ada."}
        />
      )}
    </DefaultLayout>
  );
};

export default ProductPromotionPage;
