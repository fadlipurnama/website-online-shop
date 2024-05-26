import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Fragments/Footer";
import Navbar from "../Fragments/Navbar";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  function capitalizeFirstLetter(string) {
    return string
      .split(" ")
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
      <main>
        <h1 className="invisible">
          {capitalizeFirstLetter(
            pathParts[pathParts.length - 1].replace(/[^a-zA-Z\s]/g, " "),
          )}
        </h1>
        <div className="mx-auto my-10 max-w-[85%]">
          <nav className="mb-5 flex items-center gap-2 text-lg">
            <Link
              className="cursor-pointer hover:text-primaryColor"
              onClick={() => navigate("/")}
            >
              Home
              {" > "}
            </Link>
            <Link
              to={`/${pathParts[1]}/${pathParts[2]}`}
              className="cursor-pointer hover:text-primaryColor"
            >
              {capitalizeFirstLetter(
                `${pathParts[1]} - ${pathParts[2].replace(/[^a-zA-Z\s]/g, " ")}`,
              )}
              {pathParts.length > 3 && " >"}
            </Link>
            {remainingPaths.map((path, index) => {
              return (
                <Link
                  key={index}
                  className="cursor-pointer hover:text-primaryColor"
                  to={`${remainingPaths[index - 1] ? `${remainingPaths[index - 1]}/` : ""}${path}`}
                >
                  {capitalizeFirstLetter(path)}
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
