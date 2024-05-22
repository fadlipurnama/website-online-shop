import Footer from "../Fragments/Footer";
import Navbar from "../Fragments/Navbar";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
