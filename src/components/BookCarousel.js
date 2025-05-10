// src/components/BookCarousel.js
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const BookCarousel = ({ title, books }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="my-10 px-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.id} className="px-2">
            <div className="bg-white rounded-lg shadow hover:shadow-xl p-4 h-full">
              <img src="https://via.placeholder.com/150" alt={book.title} className="w-full h-40 object-cover rounded" />
              <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-green-700 font-bold mt-1">₹{book.price}</p>
              <Link to={`/book/${book.id}`} className="text-blue-500 text-sm mt-2 inline-block">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BookCarousel;
