import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef } from "react";

const bannerData = [
  {
    title: "Master New Skills",
    subtitle: "Learn from the best instructors around the world.",
    image: "https://i.ibb.co/WNxJw7ZF/https-images-ctfassets.jpg",
  },
  {
    title: "Upgrade Your Career",
    subtitle: "Take courses that help you grow professionally.",
    image: "https://i.ibb.co/gb2Xs71v/career-path-concept-steps-to-grow-business-upgrade-or-development-to-reach-goal-ladder-of-success-pr.jpg",
  },
  {
    title: "Flexible Learning",
    subtitle: "Access our courses anytime, anywhere.",
    image: "https://i.ibb.co/1tkHWQ99/Hybrid-Learning-04.png",
  },
];

const Banner = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-5 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
      >
        <FaArrowLeft className="text-black text-xl" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-5 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
      >
        <FaArrowRight className="text-black text-xl" />
      </button>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {bannerData.map((slide, index) => (
          <div key={index}>
            <div
              className="h-[80vh] w-full bg-center bg-cover relative"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-center text-white px-4 max-w-2xl"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl font-light">
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