import { Link } from "react-router-dom";
import Footer from "../Fragments/Footer";
import Navbar from "../Fragments/Navbar";
import { Helmet } from "react-helmet-async";

const DetailTransactionLayout = ({
  children,
  orderId,
  pathLocation,
  description,
}) => {
  return (
    <>
      <Helmet>
        <title>{`Anugrah Hadi Electric - Detail Transaksi`}</title>
        <meta
          name="description"
          content={`${description?.substring(0, 152) || import.meta.env.VITE_APP_DEFAULT_DESCRIPTION}...`}
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="anugrah hadi electric, general supplier electrical, barang electric, berbagai barang electric, mcb, kontaktor, sensor, kabel, saklar, lampu, staker, power supply"
        />
        <link
          rel="canonical"
          //   href={`${import.meta.env.VITE_APP_WEBSITE_URL}${pathname}`}
        />
      </Helmet>
      <Navbar />
      <main className="lg:pb-20 lg:pt-10">
        <h1 className="invisible absolute">Dertail Transaksi</h1>
        <div className="mx-auto rounded bg-white px-4 pb-3 shadow md:px-4 lg:max-w-[90%] lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 py-6 text-lg">
            <Link
              className="cursor-pointer text-sm hover:text-primaryColor sm:text-base md:text-lg"
              to={"/"}
            >
              Home
              {" > "}
            </Link>
            <Link
              to={pathLocation}
              className="cursor-pointer text-sm hover:text-primaryColor sm:text-base md:text-lg"
            >
              Transaksi - {orderId ? orderId?.toUpperCase() : ''}
            </Link>
          </nav>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DetailTransactionLayout;
