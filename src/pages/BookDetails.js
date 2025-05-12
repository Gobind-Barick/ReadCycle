import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import BookCarousel from "../components/BookCarousel";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState(book.reviews);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://readcycle-backend-production.up.railway.app/api/books/${id}`
      )
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.error("Failed to load book:", err);
      });
  }, [id]);

  if (!book)
    return <div className="p-10 text-center">Loading book details...</div>;

  const handleSubmitReview = () => {
    if (newReview.trim() && newRating > 0) {
      const updatedReviews = [...reviews];
      const existingIndex = updatedReviews.findIndex(
        (r) => r.username === "You"
      );

      const newEntry = {
        username: "You",
        rating: newRating,
        comment: newReview,
      };

      if (existingIndex >= 0) {
        // Replace the existing review
        updatedReviews[existingIndex] = newEntry;
      } else {
        // Add new review
        updatedReviews.push(newEntry);
      }

      setReviews(updatedReviews);
      setNewReview("");
      setNewRating(0);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
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
          <p className="text-xl text-gray-600">{book.author}</p>
          <div className="mt-4 flex items-center">
            <p className="text-lg font-bold mr-4">₹{book.price}</p>
            <span className="text-sm text-gray-500">In stock</span>
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate("/cart")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Book Specifications */}
      <section className="py-10 px-6 bg-white shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <strong>Publisher:</strong> {book.publisher}
          </div>
          <div>
            <strong>ISBN:</strong> {book.isbn}
          </div>
          <div>
            <strong>Language:</strong> {book.language}
          </div>
          <div>
            <strong>Genre:</strong> {book.genre}
          </div>
          <div>
            <strong>Pages:</strong> {book.pages}
          </div>
          <div>
            <strong>Format:</strong> {book.format}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-10 px-6 bg-white shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p>{book.description}</p>
        <h3 className="text-xl font-semibold mt-6">About the Author</h3>
        <p>{book.authorBio}</p>
      </section>

      {/* Customer Reviews */}
      <section className="py-10 px-6 bg-white shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <p className="text-sm">Average Rating: {book.averageRating} / 5</p>

        {reviews.map((review, index) => (
          <div key={index} className="mt-4 border-t pt-4">
            <p className="text-md font-semibold">{review.username}</p>
            <p className="text-sm">{review.comment}</p>
            <p className="text-sm text-gray-500">Rating: {review.rating} / 5</p>
          </div>
        ))}

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Write a Review</h3>

          {/* Star Rating Selector */}
          <div className="flex items-center mt-2 space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setNewRating(star)}
                className={`text-2xl ${
                  newRating >= star ? "text-yellow-500" : "text-gray-300"
                } focus:outline-none`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Review Textarea */}
          <textarea
            rows="4"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            placeholder="Your review here..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmitReview}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit Review
          </button>
        </div>
      </section>
      {book.authorBio && (
        <>
          <h3 className="text-xl font-semibold mt-6">About the Author</h3>
          <p>{book.authorBio}</p>
        </>
      )}
    </div>
  );
};

export default BookDetails;
