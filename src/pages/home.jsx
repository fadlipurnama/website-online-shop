import ProductList from "../components/Fragments/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BestSellerList from "../components/Fragments/BestSellerList";
import { asyncSetProducts } from "../redux/products/action";
import { asyncSetBanners } from "../redux/banners/action";
import BannerPromotion from "../components/Fragments/BannerPromotion";
import { asyncSetCategories } from "../redux/categories/action";
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
  }, [dispatch]);

  return (
    <>
      <HomeLayout>
        <BannerPromotion />
        <ContentWrap title={"Categories"} className="hidden lg:block">
          <CategoriesList />
        </ContentWrap>
        <ContentWrap title={"Best Seller"} route={"products/best-seller"}>
          <BestSellerList products={products} loading={loading} />
        </ContentWrap>
        <ContentWrap title={"Product"} route={"products/all-products"}>
          <ProductList products={products} loading={loading} />
        </ContentWrap>
      </HomeLayout>
    </>
  );
};

export default HomePage;
