import { useNavigate} from "react-router-dom";
import Footer from "../Fragments/Footer";
import Navbar from "../Fragments/Navbar";
import { Helmet } from "react-helmet-async";
import { IoIosArrowBack } from "react-icons/io";

const DetailOrderLayout = ({
  children,
  orderId,
  pathLocation,
  description,
}) => {
    const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>{`Anugrah Hadi Electric - Detail Pesanan`}</title>
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
        <h1 className="invisible absolute">Dertail Pesanan</h1>
        <div className="mx-auto rounded bg-white py-4 px-4 pb-3 shadow md:px-4 lg:max-w-[90%]">
        <button
            onClick={() => navigate(-1)}
            className="flex mb-2 text-xm md:text-base lg:text-lg items-center gap-2 xl:text-xl font-semibold"
          >
            <IoIosArrowBack className="h-7 w-7" />
            Detail Pesanan - {orderId?.toUpperCase()}
          </button>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DetailOrderLayout;
