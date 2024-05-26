import {  useParams } from "react-router-dom";
import Footer from "../Fragments/Footer";
import Navbar from "../Fragments/Navbar";

const ProductPromotionLayout = ({ children }) => {
  const { promotionName, promotionId } = useParams();
 

  function capitalizeFirstLetter(string) {
    return string
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  return (
    <>

      <Navbar />
      <main>
        <div className="mx-auto my-10 max-w-[85%]">
          <div className="mb-5 flex gap-2 text-lg">
            <span
              className="cursor-pointer hover:text-primaryColor"
              onClick={() => navigate("/")}
            >
              Home {">"}{" "}
            </span>
            <h1
              className="cursor-pointer hover:text-primaryColor"
              onClick={() =>
                navigate(
                  `/promo/${promotionName.replace(/ /g, "%20")}/${promotionId}`,
                )
              }
            >
              {capitalizeFirstLetter(promotionName)}
            </h1>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductPromotionLayout;
