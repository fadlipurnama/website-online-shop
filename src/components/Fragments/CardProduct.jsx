import { useNavigate } from "react-router-dom";

const CardProduct = ({ children, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/category/${id}`)}
      className="w-full flex flex-col border max-w-min cursor-pointer py-3 px-5 bg-white rounded-lg shadow"
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
        alt="product"
        className="w-44 h-44 lg:w-30 lg:h-30 xl:w-56 xl:h-56 bg-black rounded-lg object-cover"
      />
      <h3 className="text-sm w-full mx-auto lg:text-base font-medium tracking-tight">
        {title}
      </h3>
    </>
  );
};

const Body = ({ children }) => {
  return (
    <div className="text-xs font-light lg:text-sm mb-2">
      <div className="mb-2 text-slate-600">Category</div>
      {children && (
        <p className="">{`${children.substring(0, 100)}...`}</p>
      )}
    </div>
  );
};

const Footer = ({ price }) => {
  return (
    <p className="text-xs text-primaryColor font-medium lg:text-sm">
      Rp{" "}
      {price.toLocaleString("id-ID", { styles: "currency", currency: "IDR" })}
    </p>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
