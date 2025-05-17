import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ProductCardNarrow } from "./ProductCard";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";


const NextArrow = ({ onClick }) => (
  <div
    className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-600"
    onClick={onClick}
  >
    <FaChevronRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-600"
    onClick={onClick}
  >
    <FaChevronLeft />
  </div>
);

const BookCarousel = ({ title, books }) => {
  const settings = {
    infinite: true,
    slidesToShow: 6,
    speed: 600,
    slidesToScroll: 1,
    autoplay: true,              // enables auto sliding
    autoplaySpeed: 2500,         // slide every 2.5 seconds
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1270, settings: { slidesToShow: 5 } },
      { breakpoint: 1070, settings: { slidesToShow: 4 } },
      { breakpoint:  870, settings: { slidesToShow: 3 } },
      { breakpoint:  670, settings: { slidesToShow: 2 } },
      { breakpoint:  470, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <Slider className="overflow-visible" {...settings}>
        {books.map((book) => (
          <div key={book.id} className="px-2 overflow-visible">
            <Link className="overflow-visible" to={`/book/${book.id}`}>
              <div className="my-4">
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
