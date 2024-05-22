import Footer from "../Fragments/Footer";
import Navbar from "../Fragments/Navbar";

const DefaultLayoutPage = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayoutPage;
