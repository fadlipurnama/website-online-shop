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
        case "btn-cancel":
          return "btn-cancel-hover";
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
    "btn-cancel": {
      backgroundColor: "bg-red-600",
      textColor: "text-white",
      borderColor: "border border-red-600",
    },
    "btn-cancel-hover": {
      backgroundColor: "bg-white",
      textColor: "text-red-600",
      borderColor: "border border-red-600",
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
