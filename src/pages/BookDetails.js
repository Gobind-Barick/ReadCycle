import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockBooks = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    price: 450,
    condition: "Good",
    description: "An easy & proven way to build good habits and break bad ones.",
    image: "https://via.placeholder.com/200x300?text=Atomic+Habits"
  },
  {
    id: "2",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 300,
    condition: "Like New",
    description: "A philosophical story about a boy chasing his dreams.",
    image: "https://via.placeholder.com/200x300?text=The+Alchemist"
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    price: 250,
    condition: "Fair",
    description: "A dystopian novel about totalitarianism and surveillance.",
    image: "https://via.placeholder.com/200x300?text=1984"
  }
];

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = mockBooks.find((book) => book.id === id);

  if (!book) return <div className="p-6 text-xl">Book not found.</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={book.image}
          alt={book.title}
          className="w-64 h-96 object-cover rounded-lg shadow"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-2">by {book.author}</p>
            <p className="text-md text-gray-700 mb-4">{book.description}</p>
            <p className="text-lg font-semibold text-gray-800 mb-1">
              Condition: <span className="text-gray-600">{book.condition}</span>
            </p>
            <p className="text-2xl font-bold mt-4 mb-6">₹{book.price}</p>
          </div>
          <button
            className="w-fit px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => navigate("/buy", { state: { book } })}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
