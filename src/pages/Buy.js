import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Buy = () => {
  const [books, setBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null); // for modal
  const navigate = useNavigate();

  useEffect(() => {
    const cachedBooks = JSON.parse(localStorage.getItem("booksCache"));
    const now = new Date();

    if (cachedBooks && now.getTime() - cachedBooks.timestamp < 1000 * 60 * 5) {
      setBooks(cachedBooks.data);
    } else {
      axios
        .get("https://readcycle-backend-gyud.onrender.com/api/books")
        .then((response) => {
          setBooks(response.data);
          localStorage.setItem(
            "booksCache",
            JSON.stringify({ data: response.data, timestamp: now.getTime() })
          );
        })
        .catch((error) => {
          console.error("Failed to fetch books:", error);
        });
    }
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const visibleBooks = filteredBooks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBooks.length;

  const handleAddToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${book.title} added to your cart.`);
  };

  const handleCardClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 min-h-screen px-4 md:px-8 py-10 max-w-7xl mx-auto space-y-10">
        {/* Page Heading */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-2">
            Buy Books
          </h1>
          <div className="w-20 h-1 bg-green-500 rounded"></div>
        </div>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => handleCardClick(book.id)}
              className="cursor-pointer transform transition-transform duration-300 hover:scale-105 flex items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg"
            >
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {book.title}
                </h3>
                <p className="text-green-600 font-bold mt-1">
                  Price: ₹{book.price}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering card click
                    handleAddToCart(book);
                  }}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full"
            >
              Load More
            </button>
          </div>
        )}

        {/* No Results */}
        {visibleBooks.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No books found matching your search.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Buy;
