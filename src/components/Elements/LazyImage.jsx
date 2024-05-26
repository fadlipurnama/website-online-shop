import { useEffect, useRef, useState } from "react";

const LazyImage = ({
  onClick = () => {},
  src,
  alt,
  className,
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
        rootMargin: "50px", // Mulai memuat sebelum elemen benar-benar terlihat
        threshold: 0.1, // Persentase elemen yang harus terlihat sebelum memuat
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
    // Optional: set a default placeholder image if the image fails to load
    event.target.src = placeholder || "path/to/default-placeholder-image.png";
  };

  return (
    <img
      onClick={onClick}
      ref={imgRef}
      src={isIntersecting ? src : undefined}
      alt={alt}
      className={className}
      data-src={src}
      style={style}
      loading="lazy" // Enable native lazy loading
      onError={handleError}
    />
  );
};

export default LazyImage;
