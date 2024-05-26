import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetProducts } from "../redux/products/action";
import { useParams } from "react-router-dom";

export const useFilterProductPromotion = () => {
  const { key } = JSON.parse(localStorage.getItem("promotionToken"));
  const dispatch = useDispatch();
  const { promotionName } = useParams();
  const { products = [], loading } = useSelector((state) => state.products);

  const [priceFilter, setPriceFilter] = useState(
    () => localStorage.getItem("priceFilter") || "",
  );
  const [brandFilter, setBrandFilter] = useState(
    () => localStorage.getItem("brandFilter") || "",
  );

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (products && !loading) {
      const filtered = products
        .filter((item) => {
          if (item.promotionId === key) {
            return item.promotionId === key;
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
  }, [products, loading, key, searchTerm, priceFilter, brandFilter]);

  const brands = useMemo(
    () => [...new Set(products?.map((product) => product.brand))],
    [products],
  );

  useEffect(() => {
    dispatch(asyncSetProducts());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("priceFilter", priceFilter);
    localStorage.setItem("brandFilter", brandFilter);
  }, [priceFilter, brandFilter]);

  useEffect(() => {
    const promotionToken = JSON.parse(localStorage.getItem("promotionToken"));

    if (promotionName !== promotionToken.name.toLowerCase()) {
      localStorage.setItem(
        "promotionToken",
        JSON.stringify({ ...promotionToken, key: promotionName }),
      );
      setBrandFilter("");
      setPriceFilter("");
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
