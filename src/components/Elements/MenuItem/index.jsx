import { Link } from "react-router-dom";

const MenuItem = ({ text, icon, to, bgHover }) => {
  return (
    <Link
      className={`flex items-center ${bgHover ? "hover:bg-slate-200 p-4 hover:font-medium" : "hover:text-primaryColor"} gap-2 `}
      to={to}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default MenuItem;
