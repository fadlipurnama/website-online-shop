import { useState } from "react";

function Button({
  children,
  variant = "btn-1",
  type = "button",
  onClick = () => {},
  disabled = false,
  className,
  hovered = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (hovered) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hovered) {
      setIsHovered(false);
    }
  };

  const getVariant = () => {
    if (isHovered) {
      switch (variant) {
        case "btn-1":
          return "btn-2";
        case "btn-2":
          return "btn-1";
        case "btn-3":
          return "btn-4";
        case "btn-4":
          return "btn-2";
        default:
          return variant;
      }
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
      backgroundColor: "bg-secondaryColor",
      textColor: "text-white",
      borderColor: "border border-white",
    },
    "btn-4": {
      backgroundColor: "bg-white",
      textColor: "text-secondaryColor",
      borderColor: "border border-secondaryColor",
    },
    "btn-5": {
      backgroundColor: "bg-fourthColor",
      textColor: "text-primaryColor",
      borderColor: "border border-primaryColor",
    },
  };

  const { backgroundColor, textColor, borderColor } =
    variantStyles[getVariant()];

  return (
    <button
      className={`w-full outline-none ${className} ${backgroundColor} ${textColor} ${borderColor}`}
      type={type}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
