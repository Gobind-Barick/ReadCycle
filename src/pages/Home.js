import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const promotionalBanners = [
  {
    id: 1,
    title: "Big Book Sale",
    subtitle: "Up to 50% off on bestsellers and classics",
    image: "https://via.placeholder.com/1200x400?text=Big+Book+Sale",
    button: "Shop Now"
  },
  {
    id: 2,
    title: "Declutter Your Shelf",
    subtitle: "Sell your old books easily and earn money",
    image: "https://via.placeholder.com/1200x400?text=Sell+Books",
    button: "Start Selling"
  },
  {
    id: 3,
    title: "Discover New Reads",
    subtitle: "Explore hand-picked recommendations just for you",
    image: "https://via.placeholder.com/1200x400?text=Discover+Books",
    button: "Browse Collection"
  }
];

const Home = () => {
  const [books] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      price: 450,
      condition: "Good",
      description: "An easy & proven way to build good habits and break bad ones."
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 300,
      condition: "Like New",
      description: "A philosophical book about following your dreams."
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: 250,
      condition: "Fair",
      description: "A dystopian social science fiction novel and cautionary tale."
    }
  ]);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* 🔄 Promotional Carousel */}
      <section className="relative">
        <Slider {...carouselSettings}>
          {promotionalBanners.map((banner) => (
            <div key={banner.id} className="relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                <p className="text-md md:text-lg mb-4">{banner.subtitle}</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm md:text-base">
                  {banner.button}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* 📚 Available Books Section */}
      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Available Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl"
            >
              <img
                src="https://via.placeholder.com/150"
                alt="book"
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-4">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-lg font-semibold mt-2">₹{book.price}</p>
              <Link to={`/book/${book.id}`} className="text-blue-500 mt-4 inline-block">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
