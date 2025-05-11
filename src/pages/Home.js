import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookCarousel from "../components/BookCarousel";
import Footer from '../components/Footer';
import SellProcessSection from "../components/ProcessSection";

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

const promotionalBanners = [
  {
    id: 1,
    title: "Big Book Sale",
    subtitle: "Up to 50% off on bestsellers and classics",
    image: "https://via.placeholder.com/1200x400?text=Big+Book+Sale",
    button: "Shop Now",
  },
  {
    id: 2,
    title: "Declutter Your Shelf",  
    subtitle: "Sell your old books easily and earn money",
    image: "https://via.placeholder.com/1200x400?text=Sell+Books",
    button: "Start Selling",
  },
  {
    id: 3,
    title: "Discover New Reads",
    subtitle: "Explore hand-picked recommendations just for you",
    image: "https://via.placeholder.com/1200x400?text=Discover+Books",
    button: "Browse Collection",
  },
];

const Home = () => {
  const [books, setBooks] = useState([]);
  const carouselRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:8080/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch books:", error);
      });
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 200;
      carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
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
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero/Promotional Carousel */}
      <section className="relative">
        <Slider {...carouselSettings}>
          {promotionalBanners.map((banner) => (
            <div key={banner.id} className="relative">
              <img src={banner.image} alt={banner.title} className="w-full h-64 md:h-96 object-cover" />
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

      {/* Book Carousels */}
      <BookCarousel title="📚 Best Sellers" books={books.slice(0, 3)} />
      <BookCarousel title="🔥 Top Deals" books={books.filter((b) => b.price < 400)} />
      <BookCarousel title="💸 Books Under ₹300" books={books.filter((b) => b.price <= 300)} />

      {/* 🛍️ Sell Your Books Section */}
      <section className="bg-white py-16 px-6 md:px-20 mt-10 shadow-inner">
        <SellProcessSection />
      </section>

      <Footer />
    </div>
  );
};

export default Home;