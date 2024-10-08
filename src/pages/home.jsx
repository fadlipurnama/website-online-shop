import ProductList from "../components/Fragments/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BestSellerList from "../components/Fragments/BestSellerList";
import { asyncSetProducts } from "../redux/products/action";
import { asyncSetBanners, resetBannerData } from "../redux/banners/action";
import BannerPromotion from "../components/Fragments/BannerPromotion";
import {
  asyncSetCategories,
  resetCategoriesData,
} from "../redux/categories/action";
import CategoriesList from "../components/Fragments/CategoriesList";
import HomeLayout from "../components/Layouts/HomeLayout";
import ContentWrap from "../components/Fragments/ContentWrap";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((states) => states.products);

  useEffect(() => {
    dispatch(asyncSetProducts());
    dispatch(asyncSetBanners());
    dispatch(asyncSetCategories());
    return () => {
      dispatch(resetBannerData())
      dispatch(resetCategoriesData());
    };
  }, [dispatch]);

  return (
    <>
      <HomeLayout>
        <BannerPromotion />
        <ContentWrap title={"Categories"} className="hidden lg:block">
          <CategoriesList />
        </ContentWrap>
        <ContentWrap title={"Best Seller"} route={"products/best-seller"}>
          <BestSellerList
            products={products}
            route={"products/best-seller/"}
            loading={loading}
          />
        </ContentWrap>
        <ContentWrap title={"Product"} route={"products/all-products"}>
          <ProductList
            products={products}
            route={"products/all-products/"}
            loading={loading}
          />
        </ContentWrap>
      </HomeLayout>
    </>
  );
};

export default HomePage;
