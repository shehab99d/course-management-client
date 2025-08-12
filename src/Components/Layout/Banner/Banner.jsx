import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef } from "react";

const bannerData = [
  {
    image: "https://i.ibb.co.com/2Q4Jxy0/Blue-Illustrated-Kids-Channel-Kids-You-Tube-Banner.png",
  },
  {
    image: "https://i.ibb.co.com/9H40DjSv/online-learning-Course-Banner-Landscape.png",
  },
  {
    image: "https://i.ibb.co.com/qLxT88fC/Green-White-Orange-Modern-Geometric-Online-Training-Banner.png",
  },
];

const Banner = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="w-full relative overflow-hidden lg:mt-7 md:mt-5 mt-5">
      {/* Left Arrow */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-3 md:left-5 top-1/2 z-20 -translate-y-1/2 
        p-3 rounded-full shadow-lg
        bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500
        animate-pulse hover:scale-110 transition-transform duration-300
        border-2 border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.9)]"
      >
        <FaArrowLeft className="text-white text-lg md:text-2xl drop-shadow-md" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-3 md:right-5 top-1/2 z-20 -translate-y-1/2 
        p-3 rounded-full shadow-lg
        bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500
        animate-pulse hover:scale-110 transition-transform duration-300
        border-2 border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.9)]"
      >
        <FaArrowRight className="text-white text-lg md:text-2xl drop-shadow-md" />
      </button>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {bannerData.map((slide, index) => (
          <div key={index}>
            <div
              className="w-full rounded-2xl bg-center bg-cover relative h-[50vh] md:h-[70vh] lg:h-[80vh]"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 shadow-md rounded-2xl flex items-center justify-center bg-black/20">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-center text-white px-4 max-w-3xl"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg font-light drop-shadow-lg">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
