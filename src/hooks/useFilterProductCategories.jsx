import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncSetProducts } from "../redux/products/action";

export const useFilterProductCategories = () => {
  const { categories } = useParams();
  const dispatch = useDispatch();
  const { products = [], loading } = useSelector((state) => state.products);

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

  useEffect(() => {
    dispatch(asyncSetProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   const prevParams = localStorage.getItem("params");

  //   if (categories !== prevParams) {
  //     localStorage.setItem("params", categories);
  //     setBrandFilter("");
  //     setPriceFilter("");
  //   }
  // }, [categories]);

  return [
    filteredProducts,
    searchTerm,
    loading,
    priceFilter,
    brands,
    brandFilter,
    setSearchTerm,
    setPriceFilter,
    setBrandFilter,
  ];
};
