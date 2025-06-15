import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import BookCarousel from "../components/BookCarousel";
import { addCartItemToBackend } from "../redux/cartSlice";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookAndReviews = async () => {
      try {
        const res = await axios.get(`https://readcycle-backend-gyud.onrender.com/api/books/${id}`);
        setBook(res.data);

        const reviewRes = await axios.get(`https://readcycle-backend-gyud.onrender.com/api/books/reviews/${id}`);
        setReviews(reviewRes.data);
      } catch (err) {
        console.error("Failed to load book or reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndReviews();
  }, [id]);

  const handleAddToCart = () => {
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    if (book) {
      const item = {
        bookId: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.imageUrl,
        condition: book.condition,
        quantity: 1,
      };

      dispatch(addCartItemToBackend({ item, token }));
      navigate("/cart");
    }
  };

  const handleSellBook = () => {
    if (!token) {
      alert("Please log in to sell your book.");
      return;
    }
    if (book?.id) {
      navigate(`/sell/${book.id}`);
    } else {
      alert("Book information not loaded yet.");
    }
  };

  const handleSubmitReview = async () => {
    if (!token || !user) {
      alert("Please log in to submit a review.");
      return;
    }

    if (newReview.trim() === "" || newRating === 0) {
      alert("Please provide a comment and a rating.");
      return;
    }

    try {
      const reviewPayload = {
        comment: newReview,
        rating: newRating,
      };

      await axios.post(
        `https://readcycle-backend-gyud.onrender.com/api/books/reviews/${id}?userId=${user.id}`,
        reviewPayload
      );

      const reviewRes = await axios.get(`https://readcycle-backend-gyud.onrender.com/api/books/reviews/${id}`);
      setReviews(reviewRes.data);

      const bookRes = await axios.get(`https://readcycle-backend-gyud.onrender.com/api/books/${id}`);
      setBook(bookRes.data);

      setNewReview("");
      setNewRating(0);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  if (loading) return <div className="p-10 text-center dark:text-white">Loading book details...</div>;
  if (!book) return <div className="p-10 text-center text-red-600 dark:text-red-400">Book not found.</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <section className="flex flex-col md:flex-row justify-between py-10 px-6">
        <div className="w-full md:w-1/3">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-2/3 md:pl-6 mt-6 md:mt-0">
          <h1 className="text-3xl font-semibold">{book.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">{book.author}</p>
          <div className="mt-4 flex items-center">
            <p className="text-lg font-bold mr-4">₹{book.price}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">In stock</span>
          </div>
          <div className="mt-4 flex flex-col space-y-2">
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white w-fit px-4 py-1.5 text-sm rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
            {book?.id && (
              <button
  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded mt-4"
  onClick={() => navigate(`/sell/${book.id}`)}
>
  Sell this book for ₹{book.sellPrice}
</button>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 px-6 bg-white dark:bg-gray-800 shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div><strong>Publisher:</strong> {book.publisher}</div>
          <div><strong>ISBN:</strong> {book.isbn}</div>
          <div><strong>Language:</strong> {book.language}</div>
          <div><strong>Genre:</strong> {book.genres?.join(", ")}</div>
          <div><strong>Pages:</strong> {book.pages}</div>
          <div><strong>Format:</strong> {book.format}</div>
        </div>
      </section>

      <section className="py-10 px-6 bg-white dark:bg-gray-800 shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p>{book.description}</p>
        {book.authorBio && (
          <>
            <h3 className="text-xl font-semibold mt-6">About the Author</h3>
            <p>{book.authorBio}</p>
          </>
        )}
      </section>

      <section className="py-10 px-6 bg-white dark:bg-gray-800 shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <p className="text-sm mb-4">Average Rating: {book.averageRating?.toFixed(1) || "0"} / 5</p>

        {reviews.map((review, index) => (
          <div key={index} className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4 flex items-start space-x-4">
            <img
              src={review.user?.avatarUrl || "https://via.placeholder.com/40"}
              alt={review.user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-md font-semibold">{review.user?.name || "Anonymous"}</p>
              <p className="text-sm">{review.comment}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rating: {review.rating} / 5</p>
            </div>
          </div>
        ))}

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Write a Review</h3>
          <div className="flex items-center mt-2 space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setNewRating(star)}
                className={`text-2xl ${
                  newRating >= star ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                } focus:outline-none`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            rows="4"
            className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg"
            placeholder="Your review here..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button
            onClick={handleSubmitReview}
            className="mt-4 bg-green-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-green-700 transition"
          >
            Submit Review
          </button>
        </div>
      </section>
    </div>
  );
};

export default BookDetails;
