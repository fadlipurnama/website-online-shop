import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

export const useFilterProductCategories = (products=[], loading, ) => {
  const { categories } = useParams();

  const [priceFilter, setPriceFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (products && !loading) {
      const filteredProductActive = products.filter((item) => {
        return item.isActive === true;
      });
      const filtered = filteredProductActive
        .filter((item) => {
          if (categories === "best-seller") {
            return item.best === true;
          } else if (categories === "all-products") {
            return true;
          } else {
            return item.category === categories;
          }
        })
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
  }, [products, loading, categories, searchTerm, priceFilter, brandFilter]);

  const brands = useMemo(
    () => [...new Set(products?.map((product) => product.brand))],
    [products],
  );



  return [
    filteredProducts,
    searchTerm,
    // loading,
    priceFilter,
    brands,
    brandFilter,
    setSearchTerm,
    setPriceFilter,
    setBrandFilter,
  ];
};
