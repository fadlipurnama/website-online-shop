import { Link } from "react-router-dom";

const MenuItem = ({ text, icon, to, bgHover, onClick = () => {} }) => {
  return (
    <Link
      onClick={onClick}
      className={`flex items-center ${bgHover ? "p-4 hover:bg-slate-200 hover:font-medium" : "hover:text-primaryColor"} gap-2 `}
      to={to}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default MenuItem;
