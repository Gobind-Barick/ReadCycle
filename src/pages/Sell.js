import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSellCartItemToBackend } from "../redux/sellCartSlice";
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const [books, setBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

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

  const handleSellNow = (book) => {
    setSelectedBook(book);
  };

  const confirmSell = () => {
  if (!user.token) {
    alert("Please login to add items to your sell cart.");
    navigate("/login");
    return;
  }

  dispatch(addSellCartItemToBackend({ bookId: selectedBook.id, token: user.token }))
    .unwrap()
    .then(() => {
      alert(`${selectedBook.title} added to your sell cart.`);
      setSelectedBook(null);
    })
    .catch((error) => {
      console.error("Failed to add to sell cart:", error);
      alert("Failed to add to sell cart.");
    });
};

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
                <p className="text-green-600 font-bold mt-1">
                  Sell Price: ₹{book.sellPrice}
                </p>
                <button
                  onClick={() => handleSellNow(book)}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full"
                >
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

        {/* Modal */}
        {selectedBook && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full text-center shadow-lg border border-gray-300">
              <h2 className="text-xl font-semibold mb-4">
                Sell "{selectedBook.title}" for ₹{selectedBook.sellPrice}?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmSell}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Sell;
