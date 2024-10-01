import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Fragments/Footer";
import Navbar from "../Fragments/Navbar";
import { Helmet } from "react-helmet-async";

const DefaultLayout = ({
  children,
  noneLink = false,
  label,
  lastLabel,
  title,
  description,
}) => {
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
      <Helmet>
        <title>{`Anugrah Hadi Electric - ${capitalizeFirstLetter(title)}`}</title>
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
          href={`${import.meta.env.VITE_APP_WEBSITE_URL}${pathname}`}
        />
      </Helmet>
      <Navbar />
      <main className="lg:pb-20 lg:pt-10">
        <h1 className="invisible absolute">
          {capitalizeFirstLetter(
            label
              ? label
              : pathParts[pathParts.length - 1]?.replace(/[^a-zA-Z\s]/g, " "),
          )}
        </h1>
        <div className="mx-auto rounded bg-white px-4 pb-3 shadow md:px-4 lg:max-w-[90%] lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 py-6 text-lg">
            <Link
              className="cursor-pointer text-sm hover:text-primaryColor sm:text-base md:text-lg"
              onClick={() => navigate("/")}
            >
              Home
              {" > "}
            </Link>
            {!noneLink ? (
              <>
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
              </>
            ) : (
              <>
                <div className="cursor-pointer text-sm hover:text-primaryColor sm:text-base md:text-lg">
                  {capitalizeFirstLetter(label)} -{" "}
                  {capitalizeFirstLetter(lastLabel)}
                </div>
              </>
            )}
          </nav>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
