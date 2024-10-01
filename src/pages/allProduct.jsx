import { useEffect, useMemo, useState } from "react";
import DataNotFound from "../components/Fragments/DataNotFound";
import FilterProduct from "../components/Fragments/FilterProduct"; // Perbaikan typo pada import FilterProduct
import PaginationProducts from "../components/Fragments/PaginationProducts";
import ProductList from "../components/Fragments/ProductsList";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "./loading";
import { asyncSetSearchProducts } from "../redux/searchTerm/action";

const AllProductPage = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.products); // Mengambil products dari state.products
  const { loading } = useSelector((state) => state.searchTerm); // Hanya ambil searchTerm dan brands
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");

  const startIndex = (currentPage - 1) * 8;

  // Fungsi untuk memfilter produk berdasarkan search, harga, dan brand

  useEffect(() => {
    if (search) {
      dispatch(asyncSetSearchProducts(search, 0));
    }
  }, [dispatch, search]);

  const filteredProducts = useMemo(() => {
    if (products && !loading) {
      const filteredProductActive = products.filter((item) => {
        return item.isActive === true;
      });
      const filtered = filteredProductActive
        .filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .filter((item) => (brandFilter ? item.brand === brandFilter : true))
        .sort((a, b) => {
          if (priceFilter === "low") {
            return a.price - b.price;
          } else if (priceFilter === "high") {
            return b.price - a.price;
          }
          return 0;
        });
      return filtered;
    }
  }, [products, loading, searchTerm, priceFilter, brandFilter]);

  const selectedProducts = filteredProducts?.slice(startIndex, startIndex + 8);

  const brands = useMemo(
    () => [...new Set(products?.map((product) => product.brand))],
    [products],
  );

  return (
    <DefaultLayout
      label={"Pencarian Prodcut"}
      lastLabel={search}
      noneLink={true}
      title={`Tersedia Berbagai Barang Elektrik | Pencarian ${search}`}
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

export default AllProductPage;
