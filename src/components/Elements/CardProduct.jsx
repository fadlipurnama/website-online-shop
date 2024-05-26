import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";
import { useWindowSize } from "../../hooks/useWindowSize";

const CardProduct = ({ children, id, minWidth }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        id && navigate(`${id}`);
      }}
      className={`
       flex min-h-full cursor-pointer flex-col border bg-white px-2 py-1 shadow sm:py-2 lg:px-5 lg:py-3 ${minWidth}
      `}
    >
      {children}
    </div>
  );
};

const Header = ({ title, category, best, image, loading }) => {
  const { width } = useWindowSize();

  let titleLength = 26; // Default title length
  if (width >= 640 && width < 768) {
    titleLength = 35;
  } else if (width >= 768 && width < 1024) {
    titleLength = 45;
  } else if (width >= 1280) {
    titleLength = 50;
  }

  let displayTitle = title;
  if (title && title?.length > titleLength) {
    displayTitle = `${title.substring(0, titleLength)}...`;
  }

  function capitalizeFirstLetter(string) {
    return string
      ?.split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word?.slice(1).toLowerCase();
      })
      .join(" ");
  }
  return (
    <div className="w-full">
      <LazyImage
        src={image}
        alt={title}
        className={`${(!image || loading) && "animate-pulse bg-gray-200"} h-32 min-w-full object-cover lg:h-40 xl:h-60`}
      />
      <h3
        className={`md:text-md mx-auto mt-2 min-w-full text-sm font-medium tracking-tight sm:text-base lg:text-lg ${(!title || loading) && "animate-pulse bg-gray-200 text-gray-200"}`}
      >
        {displayTitle || "Default Title"}
      </h3>
      <div className="mb-2 flex items-center gap-2 text-wrap ">
        <span className="text-sm text-slate-600 lg:text-base">
          {capitalizeFirstLetter(category)}
        </span>
        {best && (
          <span className=" rounded-full bg-primaryColor p-1 px-2 text-xs font-semibold text-white lg:text-xs">
            {best && "Best Seller"}
          </span>
        )}
      </div>
    </div>
  );
};

const Body = ({ children, loading }) => {
  const { width } = useWindowSize();

  let childrenLength = 40; // Default title length
  if (width >= 640 && width < 768) {
    childrenLength = 60;
  } else if (width >= 768 && width < 1024) {
    childrenLength = 70;
  } else if (width >= 1280) {
    childrenLength = 80;
  }

  let displayChildren = children;
  if (children && children.length > childrenLength) {
    displayChildren = `${children.substring(0, childrenLength)}...`;
  }

  return (
    <div className="mb-2 min-w-full font-light ">
      <p
        className={`${(!children || loading) && "animate-pulse bg-gray-200 text-gray-200"} md:text-md hidden min-h-10 text-sm sm:block sm:text-base lg:min-h-20`}
      >
        {`
          ${displayChildren}`}
      </p>
    </div>
  );
};

const Footer = ({ price, loading, discount }) => {
  const promoPrice = price - (price * discount) / 100;
  return (
    <div className="flex flex-col flex-wrap gap-2 sm:flex-row-reverse sm:justify-end">
      <div className="flex gap-1">
        <span
          className={`${!price || loading ? "animate-pulse bg-gray-200 text-gray-200" : discount ? " text-xs text-gray-500 line-through sm:text-sm lg:text-base" : "text-base font-medium text-primaryColor md:text-lg lg:text-xl "} font-medium `}
        >
          {price
            ?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })
            .replace(/,00$/, "")}
        </span>
        {discount !== 0 && (
          <span
            className={`${discount ? "block" : "hidden"} text-xs font-semibold text-red-500 sm:text-sm lg:text-base`}
          >
            {`${discount}%`}
          </span>
        )}
      </div>
      <span
        className={` ${!price || loading ? "animate-pulse bg-gray-200 text-gray-200" : "text-primaryColor"}  text-sm font-medium text-primaryColor sm:text-base md:text-lg lg:text-xl ${discount ? "block" : "hidden"}`}
      >
        {promoPrice
          ?.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })
          .replace(/,00$/, "")}
      </span>
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
