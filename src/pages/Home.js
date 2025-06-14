// src/pages/Home.js
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookCarousel from "../components/BookCarousel";
import Footer from "../components/Footer";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

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
  { name: "self-help", icon: "💡" },
];

const promotionalBanners = [
  {
    id: 1,
    title: "Explore Iconic Manga",
    subtitle: "Top-selling Manga series for every anime lover",
    image: "images/mangaup.webp",
    button: "Shop Now",
  },
  {
    id: 4,
    title: "Find Your Inner Strength",
    subtitle: "Explore top self‑help books handpicked for personal growth",
    image: "/images/self-help2.jpg",
    button: "Discover Now",
  },
  {
    id: 5,
    title: "Hindi Sahitya Collection",
    subtitle: "Rediscover timeless Hindi literature and classics",
    image: "/images/hindi1.avif",
    button: "Browse Collection",
  },
];

const Home = () => {
  const [books, setBooks] = useState([]);
  const carouselRef = useRef();

  useEffect(() => {
    axios
      .get("https://readcycle-backend-gyud.onrender.com/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Failed to fetch books:", err));
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 200;
      carouselRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1014] text-gray-900 dark:text-white transition-all duration-300 overflow-x-hidden">

      {/* Hero Carousel */}
      <section className="relative">
        <Slider {...carouselSettings}>
          {promotionalBanners.map((banner) => (
            <div key={banner.id} className="relative w-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                <p className="text-sm md:text-lg font-semibold mb-4">{banner.subtitle}</p>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 text-sm md:text-base rounded">
                  {banner.button}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Categories Carousel */}
      <section className="py-10 px-4 sm:px-6 bg-gray-100 dark:bg-[#1a1a1a]">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Top Categories</h2>
        <div className="relative">
          <button
            onClick={() => scrollCarousel(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow"
          >
            <FaChevronLeft />
          </button>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 px-8 py-4 scroll-smooth no-scrollbar"
          >
            {CATEGORIES.map((cat) => {
              const slug = cat.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link
                  key={cat.name}
                  to={`/product-category/${slug}`}
                  className="min-w-[110px] sm:min-w-[130px] bg-gray-900 dark:bg-gray-800 p-4 rounded-xl text-center text-white hover:scale-105 transform transition"
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <p className="text-xs sm:text-sm">{cat.name}</p>
                </Link>
              );
            })}
          </div>
          <button
            onClick={() => scrollCarousel(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow"
          >
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* Book Carousels */}
      <BookCarousel title="📚 Best Sellers" books={books.slice(0, 10)} />
      <BookCarousel title="🔥 Top Deals" books={books.filter((b) => b.price < 400)} />
      <BookCarousel title="💸 Books Under ₹300" books={books.filter((b) => b.price <= 300)} />

      <Footer />
    </div>
  );
};

export default Home;
