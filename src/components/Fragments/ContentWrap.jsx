import { useNavigate } from "react-router-dom";

const ContentWrap = ({ children, className, route, title }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`m-auto mb-10 max-w-[95%] bg-white p-2 sm:max-w-[85%] lg:px-9 lg:py-6 ${className}`}
    >
      <div className="flex items-center mb-2 justify-between lg:mb-4">
        <h2 className="font-semibold text-gray-800 md:text-2xl">
          {title}
        </h2>
        {route && (
          <span
            onClick={() => navigate(`${route}`)}
            className="cursor-pointer text-sm md:text-base lg:text-lg text-primaryColor"
          >
            See All
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default ContentWrap;
