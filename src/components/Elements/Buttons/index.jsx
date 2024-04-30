import { useState } from "react";

function Button({
  children,
  variant = "btn-1",
  type = "button",
  onClick = () => {},
  className,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getVariant = () => {
    if (isHovered) {
      return variant === "btn-1" ? "btn-2" : "btn-1";
    } else {
      return variant;
    }
  };

  const variantStyles = {
    "btn-1": {
      backgroundColor: "bg-primaryColor",
      textColor: "text-white",
      borderColor: "border border-white",
    },
    "btn-2": {
      backgroundColor: "bg-white",
      textColor: "text-primaryColor",
      borderColor: "border border-primaryColor",
    },
    "btn-3": {
      backgroundColor: "bg-fourthColor",
      textColor: "text-primaryColor",
      borderColor: "border border-primaryColor",
    },
  };

  const { backgroundColor, textColor, borderColor } =
    variantStyles[getVariant()];

  return (
    <button
      className={`w-full text-sm outline-none ${className} ${backgroundColor} ${textColor} ${borderColor}`}
      type={type}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
