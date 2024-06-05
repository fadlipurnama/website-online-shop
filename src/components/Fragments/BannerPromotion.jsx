import { useSelector } from "react-redux";
import { useState, useEffect, useCallback, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import LazyImage from "../Elements/LazyImage";

const BannerPromotion = () => {
  const { loading, banners } = useSelector((state) => state.banners);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners?.length);
    }, 5000);
  }, [banners]);

  useEffect(() => {
    if (banners?.length > 0) {
      startInterval();
    }

    return () => clearInterval(intervalRef.current);
  }, [banners, startInterval]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners?.length);
    startInterval();
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners?.length) % banners?.length,
    );
    startInterval();
  };

  return (
    <div
      className="relative mx-auto mb-10 overflow-hidden sm:max-w-[85%] lg:mb-0"
      onMouseEnter={() => {
        setShowButtons(true);
        clearInterval(intervalRef.current); // Pause the interval when the mouse enters
      }}
      onMouseLeave={() => {
        setShowButtons(false);
        startInterval(); // Restart the interval when the mouse leaves
      }}
    >
      {banners
        ? banners.map((banner, index) => (
            <LazyImage
              key={banner._id}
              onClick={() => {
                localStorage.setItem(
                  "promotionData",
                  JSON.stringify({
                    id: banners[currentIndex]._id,
                    name: banners[currentIndex].name,
                    description: banners[currentIndex].description,
                  }),
                );
                navigate(`promo/${banners[currentIndex].name.toLowerCase()}`);
              }}
              src={banner.imageUrl}
              alt={banner.name}
              className={`left-0 top-0 w-full cursor-pointer bg-white transition-opacity duration-300 ${index === currentIndex ? "relative opacity-100" : "absolute opacity-0"}`}
            />
          ))
        : (!banners || loading) && (
            <div className="h-[175px] w-full animate-pulse bg-slate-200 md:h-[240px] lg:h-[374px]"></div>
          )}

      <div className="absolute bottom-0 right-0 m-4 flex space-x-2">
        {banners &&
          banners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                startInterval();
              }}
              className={`h-3 w-3 rounded-full border border-gray-800 ${index === currentIndex ? "bg-primaryColor" : "bg-thirdColor"}`}
            ></button>
          ))}
      </div>
      {showButtons && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2  -translate-y-1/2 transform rounded-full border bg-white/65 p-2 text-gray-800 outline-none hover:bg-white"
          >
            <IoIosArrowBack className="h-8 w-8 font-bold" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full border bg-white/65 p-2 text-gray-800 outline-none hover:bg-white"
          >
            <IoIosArrowForward className="h-8 w-8 font-bold" />
          </button>
        </>
      )}
    </div>
  );
};

export default BannerPromotion;
