import { useState } from "react";
import PaginationProducts from "../components/Fragments/PaginationProducts";
import ProductList from "../components/Fragments/ProductsList";
import FilterProduct from "../components/Fragments/FIlterProduct";
import { useFilterProductPromotion } from "../hooks/useFilterProductPromotion";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { Helmet } from "react-helmet-async";
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

  const { description, name } = JSON.parse(
    localStorage.getItem("promotionData"),
  );

  function capitalizeFirstLetter(string) {
    return string
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  return (
    <>
      <Helmet>
        <title>Anugrah Hadi Electric - {capitalizeFirstLetter(name)}</title>
        <meta
          name="description"
          content={`${description.substring(0, 152)}...`}
        />
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_APP_WEBSITE_URL}/promo/${name.toLowerCase().replace(/ /g, "%20")}`}
        />
      </Helmet>
      <DefaultLayout pathPartsSlice={4}>
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
      </DefaultLayout>
    </>
  );
};

export default ProductPromotionPage;
