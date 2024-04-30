import { useNavigate } from "react-router-dom";

const CardProduct = ({ children, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/category/${id}`)}
      className="flex w-full max-w-min cursor-pointer flex-col rounded-lg border bg-white px-5 py-3 shadow"
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
        className="lg:w-30 lg:h-30 h-44 w-44 rounded-lg bg-black object-cover xl:h-56 xl:w-56"
      />
      <h3 className="mx-auto w-full text-sm font-medium tracking-tight lg:text-base">
        {title}
      </h3>
    </>
  );
};

const Body = ({ children }) => {
  return (
    <div className="mb-2 text-xs font-light lg:text-sm">
      <div className="mb-2 text-slate-600">Category</div>
      {children && <p className="">{`${children.substring(0, 100)}...`}</p>}
    </div>
  );
};

const Footer = ({ price }) => {
  return (
    <p className="text-xs font-medium text-primaryColor lg:text-sm">
      Rp{" "}
      {price.toLocaleString("id-ID", { styles: "currency", currency: "IDR" })}
    </p>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
