import { Link } from "react-router-dom";

const MenuItem = ({ text, icon, to }) => {
  return (
    <Link className="flex items-center gap-2 hover:text-primaryColor" to={to}>
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default MenuItem;
