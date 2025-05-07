import React from 'react';
import Slider from 'react-slick';
import Banner1 from "../assets/ms_banner_img1.png";
import Banner2 from "../assets/ms_banner_img2.png";
import Banner3 from "../assets/ms_banner_img3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CustomPrevArrow = ({ onClick }) => {
  return (
    <button
      className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      onClick={onClick}
    >
      ❮
    </button>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      onClick={onClick}
    >
      ❯
    </button>
  );
};

const Banner = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="relative w-full max-w-[1000px] mx-auto">
      <Slider {...settings}>
        {[Banner1, Banner2, Banner3].map((banner, index) => (
          <div key={index} className="h-[280px]">
            <img src={banner} alt={`Banner ${index + 1}`} className="w-[800px] h-[300px] object-center mx-auto"></img>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
