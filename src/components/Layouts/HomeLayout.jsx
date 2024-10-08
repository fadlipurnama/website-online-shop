import { Helmet } from "react-helmet-async";
import Footer from "../Fragments/Footer";
import Navbar from "../Fragments/Navbar";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>Anugrah Hadi Electric - Tersedia Berbagai Barang Elektrik</title>
        <meta
          name="description"
          content={import.meta.env.VITE_APP_DEFAULT_DESCRIPTION}
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="anugrah hadi electric, general supplier electrical, barang electric, berbagai barang electric, mcb, kontaktor, sensor, kabel, saklar, lampu, staker, power supply"
        />
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_APP_WEBSITE_URL}`}
        />
      </Helmet>
      <Navbar />
      <main>
        <h1 className="invisible absolute">Beranda</h1>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default HomeLayout;
