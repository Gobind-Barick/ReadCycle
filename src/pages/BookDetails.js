import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import BookCarousel from "../components/BookCarousel";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`https://readcycle-backend-production.up.railway.app/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.error("Failed to load book:", err);
      });
  }, [id]);

  if (!book) return <div className="p-10 text-center">Loading book details...</div>;

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

        {book.authorBio && (
          <>
            <h3 className="text-xl font-semibold mt-6">About the Author</h3>
            <p>{book.authorBio}</p>
          </>
        )}
      </section>
    </div>
  );
};

export default BookDetails;
