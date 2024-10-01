import {  useNavigate } from "react-router-dom";
import Footer from "../Fragments/Footer";
import Navbar from "../Fragments/Navbar";
import { Helmet } from "react-helmet-async";
import { IoIosArrowBack } from "react-icons/io";

const DetailTransactionLayout = ({
  children,
  pathLocation,
  transactionId,
  description,
}) => {
  const navigate = useNavigate();

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
            href={`${import.meta.env.VITE_APP_WEBSITE_URL}${pathLocation}`}
        />
      </Helmet>
      <Navbar />
      <main className="lg:pb-20 lg:pt-10">
        <h1 className="invisible absolute">Dertail Transaksi</h1>
        <div className="mx-auto rounded py-4 bg-white px-4 pb-3 shadow md:px-4 lg:max-w-[90%]">
        <button
            onClick={() => navigate("/user-profile/daftar-transaksi")}
            className="flex mb-2 text-xm md:text-base lg:text-lg items-center gap-2 xl:text-xl font-semibold"
          >
            <IoIosArrowBack className="h-7 w-7" />
            Detail Transaksi - {transactionId?.toUpperCase()}
          </button>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DetailTransactionLayout;
