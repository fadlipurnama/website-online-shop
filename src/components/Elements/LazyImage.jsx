import { useEffect, useRef, useState } from "react";

const LazyImage = ({
  onClick = () => {},
  src,
  alt,
  className,
  loading = false,
  style,
  placeholder,
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", 
        threshold: 0.1,
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
  }, []);

  const handleError = (event) => {
    event.target.src = placeholder || "path/to/default-placeholder-image.png";
  };

  return (
    <img
      onClick={onClick}
      ref={imgRef}
      src={isIntersecting ? src : undefined}
      alt={alt}
      className={`${className} ${loading && "animate-pulse bg-gray-200"}`}
      data-src={src}
      style={style}
      loading="lazy" // Enable native lazy loading
      onError={handleError}
    />
  );
};

export default LazyImage;
