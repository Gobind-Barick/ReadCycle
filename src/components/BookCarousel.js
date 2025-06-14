import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ProductCardNarrow } from "./ProductCard";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute -right-4 sm:-right-6 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 p-2 rounded-full cursor-pointer hover:bg-gray-600 dark:hover:bg-gray-400 transition"
    onClick={onClick}
  >
    <FaChevronRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute -left-4 sm:-left-6 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 p-2 rounded-full cursor-pointer hover:bg-gray-600 dark:hover:bg-gray-400 transition"
    onClick={onClick}
  >
    <FaChevronLeft />
  </div>
);

const BookCarousel = ({ title, books }) => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1.4 },
      },
      {
        breakpoint: 360,
        settings: { slidesToShow: 1.2 },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 bg-gray-50 dark:bg-[#0f1014] transition-colors duration-300 overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>
      <Slider className="overflow-visible" {...settings}>
        {books.map((book) => (
          <div key={book.id} className="px-2 overflow-visible">
            <Link className="overflow-visible" to={`/book/${book.id}`}>
              <div className="my-2 sm:my-4">
                <ProductCardNarrow product={book} />
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BookCarousel;
