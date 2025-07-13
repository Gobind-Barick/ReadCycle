import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookCarousel from "../components/BookCarousel";
import Footer from "../components/Footer";
import SellProcessSection from "../components/ProcessSection";
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
    image: "images/mangaup-1920.png",
    button: "Shop Now",
  },
  {
    id: 4,
    // title: "Find Your Inner Strength",
    // subtitle: "Explore top self‑help books handpicked for personal growth",
    image: "/images/selfhelp-1920.png",
    // button: "Discover Now",
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
    const cachedBooks = JSON.parse(localStorage.getItem("booksCache"));
    const now = new Date();

    if (
      cachedBooks &&
      now.getTime() - cachedBooks.timestamp < 1000 * 60 * 5 // 5 minute cache expiry
    ) {
      setBooks(cachedBooks.data);
    } else {
      axios
        .get("https://readcycle-backend-gyud.onrender.com/api/books")
        .then((response) => {
          setBooks(response.data);
          localStorage.setItem(
            "booksCache",
            JSON.stringify({
              data: response.data,
              timestamp: now.getTime(),
            })
          );
        })
        .catch((error) => {
          console.error("Failed to fetch books:", error);
        });
    }
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
    arrows: true,
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 dark:bg-[#0f1014] text-gray-900 dark:text-white transition-all duration-300">
      {/* Hero/Promotional Carousel */}
      <section className="relative">
        <Slider {...carouselSettings}>
          {promotionalBanners.map((banner) => (
            <div key={banner.id} className="relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-64 md:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 flex flex-col justify-center items-center text-white text-center px-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {banner.title}
                </h2>
                <p className="text-md md:text-lg mb-4 font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] text-white">
                  {banner.subtitle}
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm md:text-base">
                  {banner.button}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Categories Carousel */}
      <section className="py-12 px-6 sm:px-10 relative bg-gray-100 dark:bg-[#1a1a1a]">
        <h2 className="text-2xl font-bold mb-8 text-center">Top Categories</h2>
        <div className="relative flex items-center">
          <button
            onClick={() => scrollCarousel(-1)}
            className="absolute left-2 z-20 bg-white/80 dark:bg-gray-800 backdrop-blur shadow-md p-3 rounded-full hover:bg-white dark:hover:bg-gray-700 transition"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 px-6 sm:px-10 py-4 scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => {
              const slug = cat.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link
                  to={`/product-category/${slug}`}
                  key={cat.name}
                  className="min-w-[140px] bg-gray-900 dark:bg-gray-800 p-5 rounded-xl shadow text-center flex-shrink-0 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <p className="text-sm font-medium text-white">{cat.name}</p>
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => scrollCarousel(1)}
            className="absolute right-2 z-20 bg-white/80 dark:bg-gray-800 backdrop-blur shadow-md p-3 rounded-full hover:bg-white dark:hover:bg-gray-700 transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* Book Carousels */}
      <BookCarousel title="📚 Best Sellers" books={books.slice(1, 10)} />
      <BookCarousel
        title="🔥 Top Deals"
        books={books.filter((b) => b.price < 400)}
      />
      <BookCarousel
        title="💸 Books Under ₹300"
        books={books.filter((b) => b.price <= 300)}
      />

      <Footer />
    </div>
  );
};

export default Home;