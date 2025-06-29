import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

const Sell = () => {
  const [books, setBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cachedBooks = JSON.parse(localStorage.getItem("booksCache"));
    const now = new Date();

    if (cachedBooks && now.getTime() - cachedBooks.timestamp < 1000 * 60 * 5) {
      setBooks(cachedBooks.data);
    } else {
      axios
        .get("http://localhost:8080/api/books")
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

  return (
    <>
      <div className="bg-white dark:bg-gray-900 min-h-screen px-4 md:px-8 py-10 max-w-7xl mx-auto space-y-10">
        {/* Page Heading */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-2">
            Sell Your Books
          </h1>
          <div className="w-20 h-1 bg-green-500 rounded"></div>
        </div>

        {/* Steps Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 grid md:grid-cols-3 gap-6 shadow-md">
          {[
            { num: "1", title: "Search", desc: "Find your book to sell." },
            { num: "2", title: "Ship", desc: "Choose free pickup or self-ship." },
            { num: "3", title: "Get Paid", desc: "Receive payment via UPI, Paytm, or Bank." },
          ].map((step) => (
            <div
              key={step.num}
              className="flex flex-col items-center text-center p-4 border border-green-500 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition"
            >
              <div className="text-5xl font-bold text-green-600 mb-2">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
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
              className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition"
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
                <button className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full">
                  SELL NOW
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

        {/* Contact Box */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center shadow-md">
          <p className="mb-3 text-black dark:text-white">
            Can't find your book? Contact us:
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-green-600 font-semibold">
            <a href="https://wa.me/918447466860" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <img src="https://img.icons8.com/ios-filled/20/22c55e/whatsapp.png" alt="WhatsApp" />
              WhatsApp: 98406 32979
            </a>
            <span className="flex items-center gap-2">
              <img src="https://img.icons8.com/ios-filled/20/22c55e/new-post.png" alt="Email" />
              support@booknook.in
            </span>
          </div>
        </div>

        {/* WhatsApp FAB */}
        <a
          href="https://wa.me/918447466860"
          className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-6 h-6"
          />
        </a>
      </div>
      <Footer />
    </>
  );
};

export default Sell;
