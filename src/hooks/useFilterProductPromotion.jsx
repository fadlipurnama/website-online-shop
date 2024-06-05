import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetProducts } from "../redux/products/action";
import { useParams } from "react-router-dom";

export const useFilterProductPromotion = () => {
  const { promotionName } = useParams();
  const { products = [], loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

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
          if (
            item.labelPromo?.toLowerCase() === promotionName.toLowerCase()
          ) {
            return (
              item.labelPromo?.toLowerCase() === promotionName.toLowerCase()
            );
          } else {
            return false;
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
  }, [products, loading, promotionName, searchTerm, priceFilter, brandFilter]);

  const brands = useMemo(
    () => [...new Set(products?.map((product) => product.brand))],
    [products],
  );

  useEffect(() => {
    dispatch(asyncSetProducts());
  }, [dispatch]);

  useEffect(() => {
    const prevParams = localStorage.getItem("params");
    const promotionData = JSON.parse(localStorage.getItem("promotionData"));
    if (promotionName !== prevParams) {
      localStorage.setItem("params", promotionName);
      localStorage.setItem(
        "promotionData",
        JSON.stringify({ ...promotionData, name: promotionName }),
      );
    }
  }, [promotionName]);

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
