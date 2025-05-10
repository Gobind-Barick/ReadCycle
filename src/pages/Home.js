import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const CATEGORIES = [
  { name: "Fiction", icon: "📖" },
  { name: "Non-Fiction", icon: "📚" },
  { name: "Science", icon: "🔬" },
  { name: "History", icon: "🏛️" },
  { name: "Biographies", icon: "👤" },
  { name: "Children", icon: "🧒" },
  { name: "Education", icon: "🎓" },
  { name: "Comics", icon: "🦸‍♂️" },
  { name: "Fantasy", icon: "🐉" },
  { name: "Self-Help", icon: "💡" },
];

const Home = () => {
  const [books] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      price: 450,
      condition: "Good",
      description: "An easy & proven way to build good habits and break bad ones.",
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 300,
      condition: "Like New",
      description: "A philosophical book about following your dreams.",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: 250,
      condition: "Fair",
      description: "A dystopian social science fiction novel and cautionary tale.",
    },
  ]);

  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = 200;
    if (container) {
      container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative bg-[url('https://via.placeholder.com/1600x500?text=Used+Books+Banner')] bg-cover bg-center h-64 md:h-96 flex items-center justify-center">
        <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Buy & Sell Used Books Easily
          </h1>
          <p className="text-md md:text-lg text-gray-200">
            Save money, declutter your shelf, and find your next favorite read.
          </p>
        </div>
      </section>

      {/* Categories Carousel with Arrows */}
      <section className="py-10 px-4 relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Top Categories</h2>
        <div className="relative flex items-center">
          <button
            onClick={() => scrollCarousel(-1)}
            className="absolute left-0 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
          >
            ◀
          </button>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto space-x-4 px-8 scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="min-w-[120px] bg-white p-4 rounded-lg shadow text-center flex-shrink-0 hover:shadow-md"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="text-sm font-medium">{cat.name}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollCarousel(1)}
            className="absolute right-0 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Books Grid */}
      <section className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Available Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl">
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
      </section>
    </div>
  );
};

export default Home;
