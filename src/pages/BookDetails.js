import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookCarousel from "../components/BookCarousel";

// Mock book data
const mockBook = {
  id: 1,
  title: "Atomic Habits",
  author: "James Clear",
  price: 450,
  description:
    "An easy & proven way to build good habits and break bad ones. This book is a must-read for anyone looking to improve their life through small but impactful changes.",
  image: "https://via.placeholder.com/300x400?text=Atomic+Habits",
  publisher: "Penguin Books",
  isbn: "978-0-7352-1141-2",
  language: "English",
  genre: "Self-Help",
  pages: 320,
  format: "Hardcover",
  authorBio:
    "James Clear is a writer and speaker focused on habits, decision-making, and continuous improvement. His work has been featured in The New York Times, Time Magazine, and more.",
  averageRating: 4.7,
  reviews: [
    {
      username: "JohnDoe",
      rating: 5,
      comment: "Incredible book! It changed my life."
    },
    {
      username: "JaneDoe",
      rating: 4,
      comment: "Very helpful, but a bit repetitive in some areas."
    },
    {
      username: "AliceSmith",
      rating: 5,
      comment: "I love how actionable the advice is. Highly recommended!"
    }
  ],
  relatedBooks: [
    {
      id: 2,
      title: "The Power of Habit",
      author: "Charles Duhigg",
      price: 399,
      image: "https://via.placeholder.com/300x400?text=The+Power+of+Habit"
    },
    {
      id: 3,
      title: "Deep Work",
      author: "Cal Newport",
      price: 499,
      image: "https://via.placeholder.com/300x400?text=Deep+Work"
    },
    {
      id: 4,
      title: "Mindset: The New Psychology of Success",
      author: "Carol S. Dweck",
      price: 450,
      image: "https://via.placeholder.com/300x400?text=Mindset"
    }
  ]
};

const BookDetails = () => {
  const book = mockBook;
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between py-10 px-6">
        <div className="w-full md:w-1/3">
          <img
            src={book.image}
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
          <div><strong>Publisher:</strong> {book.publisher}</div>
          <div><strong>ISBN:</strong> {book.isbn}</div>
          <div><strong>Language:</strong> {book.language}</div>
          <div><strong>Genre:</strong> {book.genre}</div>
          <div><strong>Pages:</strong> {book.pages}</div>
          <div><strong>Format:</strong> {book.format}</div>
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
        <div>
          <p className="text-sm">Average Rating: {book.averageRating} / 5</p>
          {/* Loop through reviews */}
          {book.reviews.map((review, index) => (
            <div key={index} className="mt-4 border-t pt-4">
              <p className="text-md font-semibold">{review.username}</p>
              <p className="text-sm">{review.comment}</p>
              <p className="text-sm text-gray-500">Rating: {review.rating} / 5</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Write a Review</h3>
          <textarea
            rows="4"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            placeholder="Your review here..."
          />
          <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Submit Review
          </button>
        </div>
      </section>

      {/* Related Books */}
      <section className="py-10 px-6">
        <h2 className="text-2xl font-bold mb-6">Related Books</h2>
        <BookCarousel title="You Might Also Like" books={book.relatedBooks} />
      </section>
    </div>
  );
};

export default BookDetails;
