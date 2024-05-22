import ProductList from "../components/Fragments/ProductsList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import BestSellerList from "../components/Fragments/BestSellerList";
import { asyncSetProducts } from "../redux/products/action";
import { asyncSetBanners } from "../redux/banners/action";
import BannerPromotion from "../components/Fragments/BannerPromotion";
import { asyncSetCategories } from "../redux/categories/action";
import CategoriesList from "../components/Fragments/CategoriesList";
import DefaultLayoutPage from "../components/Layouts/DefaultLayoutPage";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncSetProducts());
    dispatch(asyncSetBanners());
    dispatch(asyncSetCategories());
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title>
          Anugrah Hadi Electric - Menyediakan Berbagai Barang Elektrik
        </title>
        <meta
          name="description"
          content="Temukan Produk yang anda cari bersama kami. Memberikan pelayanan terbaik, kualitas terbaik dan tentu dengan harga terbaik, "
        />
        <link rel="canonical" href={`http://localhost:5173`} />
        <meta name="keywords" content={`produk, ${name}, deskripsi`} />
        {/* URL kanonikal */}
        {/* <link rel="canonical" href={`https://example.com/product/${'productId'}`} /> */}
        {/* Properti Open Graph */}
        {/* <meta property="og:title" content={'name'} />
        <meta property="og:description" content={'description'} />
        <meta property="og:image" content={'imageUrl'} /> */}
      </Helmet>
      <DefaultLayoutPage>
        <h1 className="invisible absolute">Beranda</h1>
        <BannerPromotion />
        <CategoriesList />
        <BestSellerList />
        <ProductList />
      </DefaultLayoutPage>
    </>
  );
};

export default HomePage;
