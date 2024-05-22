import ProductList from "../components/Fragments/ProductsList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import BestSellerList from "../components/Fragments/BestSellerList";
import { asyncSetProducts } from "../redux/products/action";
import { asyncSetBanners } from "../redux/banners/action";
import BannerPromotion from "../components/Fragments/BannerPromotion";
import { asyncSetCategories } from "../redux/categories/action";
import CategoriesList from "../components/Fragments/CategoriesList";
import HomeLayout from "../components/Layouts/HomeLayout";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncSetProducts());
    dispatch(asyncSetBanners());
    dispatch(asyncSetCategories());
  }, [dispatch]);
  return (
    <HomeLayout>
      <BannerPromotion />
      <CategoriesList />
      <BestSellerList />
      <ProductList />
    </HomeLayout>
  );
};

export default HomePage;
