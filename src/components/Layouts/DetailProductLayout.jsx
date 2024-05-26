import Footer from "../Fragments/Footer";
import Navbar from "../Fragments/Navbar";

const DetailProductLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mx-auto my-10 max-w-[85%]">
        <div className="mb-5 flex gap-2 text-lg">
          <span
            className="cursor-pointer hover:text-primaryColor"
            //   onClick={() => navigate("/")}
          >
            Home {">"}{" "}
          </span>
          <h1
            className="cursor-pointer hover:text-primaryColor"
            //   onClick={() => navigate(`/${categories}`)}
          >
            {/* {capitalizeFirstLetter(categories.replace(/-/g, ' '))} */}
            detail product
          </h1>
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default DetailProductLayout;
