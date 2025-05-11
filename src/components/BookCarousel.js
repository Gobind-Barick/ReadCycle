import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const BookCarousel = ({ title, books }) => {
  const settings = {
    infinite: true,               // enables continuous scroll
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,              // enables auto sliding
    autoplaySpeed: 2500,         // slide every 2.5 seconds
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
            <div className="bg-white rounded-lg shadow hover:shadow-xl p-4 h-full flex flex-col items-center text-center">
              <div className="w-full h-52 flex justify-center items-center overflow-hidden mb-4">
                <img
                  src={book.imageUrl || "https://via.placeholder.com/150"}
                  alt={book.title}
                  className="h-full object-contain"
                />
              </div>
              <h3 className="text-base font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-green-700 font-bold mt-1">₹{book.price}</p>
              <Link
                to={`/book/${book.id}`}
                className="text-blue-500 text-sm mt-2"
              >
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
