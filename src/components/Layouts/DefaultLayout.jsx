import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Fragments/Footer";
import Navbar from "../Fragments/Navbar";

const DefaultLayout = ({ children, label, lastLabel }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  function capitalizeFirstLetter(string) {
    return string
      ?.split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }
  const pathParts = pathname.split("/");
  const remainingPaths = pathParts.slice(3);

  return (
    <>
      <Navbar />
      <main className="lg:pb-20 lg:pt-10">
        <h1 className="invisible absolute">
          {capitalizeFirstLetter(
            label
              ? label
              : pathParts[pathParts.length - 1]?.replace(/[^a-zA-Z\s]/g, " "),
          )}
        </h1>
        <div className="mx-auto rounded shadow bg-white px-2 md:px-4 lg:px-8 pb-3 lg:max-w-[90%]">
          <nav className="flex py-6 flex-wrap items-center gap-2 text-lg">
            <Link
              className="cursor-pointer text-sm hover:text-primaryColor sm:text-base md:text-lg"
              onClick={() => navigate("/")}
            >
              Home
              {" > "}
            </Link>
            <Link
              to={`/${pathParts[1]}/${pathParts[2]}`}
              className="cursor-pointer text-sm hover:text-primaryColor sm:text-base md:text-lg"
            >
              {capitalizeFirstLetter(
                `${pathParts[1]?.replace(/[^a-zA-Z0-9\s/]/g, " ")} - ${
                  label
                    ? label.replace(/[^a-zA-Z0-9\s/]/g, " ")
                    : pathParts[2]?.replace(/%20|-/g, " ")
                }`,
              )}
              {pathParts.length > 3 && " >"}
            </Link>
            {remainingPaths.map((path, index) => {
              return (
                <Link
                  key={index}
                  className="cursor-pointer text-sm hover:text-primaryColor sm:text-base md:text-lg"
                  to={`${remainingPaths[index - 1] ? `${remainingPaths[index - 1]}/${path}` : `${pathname}`}`}
                >
                  {capitalizeFirstLetter(
                    lastLabel
                      ? lastLabel
                      : path.replace(/[^a-zA-Z0-9\s]/g, " "),
                  )}
                  {index !== remainingPaths.length - 1 && " >"}
                </Link>
              );
            })}
          </nav>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
