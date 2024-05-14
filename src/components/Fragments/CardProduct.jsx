import { useNavigate } from "react-router-dom";

const CardProduct = ({ children, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        id && navigate(`/category/${id}`);
      }}
      className="flex min-w-60 max-w-72 cursor-pointer flex-col rounded-lg border bg-white px-5 py-3 shadow"
    >
      {children}
    </div>
  );
};

const Header = ({ title, image }) => {
  return (
    <>
      <img
        src={image}
        alt={title}
        className={`${!image && "animate-pulse bg-gray-200"} lg:w-30 lg:h-30 h-44 min-w-full rounded-lg object-cover xl:h-56 xl:w-56`}
      />
      <h3
        className={`mx-auto mt-2 min-w-full text-sm font-medium tracking-tight lg:text-lg ${!title && "animate-pulse bg-gray-200 text-gray-200"}`}
      >
        {title}
        {!title && "Default Title"}
      </h3>
    </>
  );
};

const Body = ({ children, category }) => {
  return (
    <div className="mb-2 min-w-full text-xs font-light lg:text-sm">
      <div className="mb-2 text-wrap text-slate-600">{category}</div>
      <p
        className={`${!children && "animate-pulse bg-gray-200 text-gray-200"}`}
      >
        {`
          ${children ? children.substring(0, 100) : " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha been the "}...`}
      </p>
    </div>
  );
};

const Footer = ({ price }) => {
  return (
    <p
      className={`${!price ? "animate-pulse bg-gray-200 text-gray-200" : "text-primaryColor"} text-xs font-medium lg:text-base`}
    >
      Rp{" "}
      {price
        ? price.toLocaleString("id-ID", { styles: "currency", currency: "IDR" })
        : "000000"}
    </p>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
