import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";
import { useWindowSize } from "../../hooks/useWindowSize";
import Price from "./Price";

const CardProduct = ({ children, route, id, minWidth }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        id && navigate(`${route ? route : ""}${id}`);
      }}
      className={`
       flex min-h-full cursor-pointer flex-col border bg-white px-2 py-1 shadow sm:py-2 lg:px-5 lg:py-3 ${minWidth}
      `}
    >
      {children}
    </div>
  );
};

const Header = ({ title, category, discount, image, loading }) => {
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
      <div className={`${(!image || loading) && "animate-pulse bg-gray-200"} relative h-20 min-w-full lg:h-40 xl:h-60 sm:h-46`}>
        <LazyImage
          src={image}
          alt={title}
          loading={loading}
          className={`h-full w-full object-cover`}
        />
        {discount !== 0 && (
          <span
            className={`absolute left-0 ${!discount && "hidden"} top-0 bg-red-400 p-1 text-xs text-white sm:text-base`}
          >
            {discount}%
          </span>
        )}
      </div>
      <h3
        className={`mx-auto mt-2 min-w-full text-sm font-medium tracking-tight sm:text-base lg:text-lg ${(!title || loading) && "animate-pulse bg-gray-200 text-gray-200"}`}
      >
        {displayTitle || "Default Title"}
      </h3>
      <div className="mb-2 flex items-center gap-2 text-wrap ">
        <span className="text-xs text-slate-600 sm:text-sm lg:text-base">
          {capitalizeFirstLetter(category)}
        </span>
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
        className={`${(!children || loading) && "animate-pulse bg-gray-200 text-gray-200"} hidden min-h-10 text-sm sm:block sm:text-base md:text-base lg:min-h-20`}
      >
        {`
          ${displayChildren}`}
      </p>
    </div>
  );
};

const Footer = ({ price, loading, discount }) => {
  return (
    <div className="flex flex-col flex-wrap gap-2 sm:flex-row-reverse sm:justify-end">
      <Price
        hiddenTextDiscount={true}
        price={price}
        loading={loading}
        discount={discount}
        sizePrice="text-base md:text-lg lg:text-xl"
        sizePriceDiscount="text-xs md:text-sm lg:text-base"
      />
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
