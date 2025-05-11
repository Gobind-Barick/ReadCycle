import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

// Dummy data
const allProducts = [
  { id: 1, title: "Atomic Habits", price: 450, category: "self-help" },
  { id: 2, title: "The Alchemist", price: 300, category: "fiction" },
  { id: 3, title: "1984", price: 250, category: "fiction" },
  { id: 4, title: "Brief History of Time", price: 500, category: "science" },
  { id: 5, title: "Steve Jobs", price: 400, category: "biographies" },
  { id: 6, title: "A Short History of Nearly Everything", price: 350, category: "science" },
  { id: 7, title: "Goodnight Moon", price: 150, category: "children" },
  { id: 8, title: "The Very Hungry Caterpillar", price: 180, category: "children" },
  { id: 9, title: "Sapiens", price: 600, category: "non-fiction" },
  { id: 10, title: "Educated", price: 320, category: "biographies" },
  { id: 11, title: "The Power of Now", price: 270, category: "self-help" },
  { id: 12, title: "Dune", price: 520, category: "fantasy" },
  { id: 13, title: "Harry Potter and the Sorcerer's Stone", price: 400, category: "fantasy" },
  { id: 14, title: "To Kill a Mockingbird", price: 380, category: "fiction" },
  { id: 15, title: "Becoming", price: 390, category: "biographies" },
  { id: 16, title: "The Hobbit", price: 450, category: "fantasy" },
  { id: 17, title: "The Subtle Art of Not Giving a F*ck", price: 300, category: "self-help" },
  { id: 18, title: "Cosmos", price: 480, category: "science" },
  { id: 19, title: "A Brief History of Nearly Everything", price: 360, category: "science" },
  { id: 20, title: "Batman: Year One", price: 250, category: "comics" },
  { id: 21, title: "Spider-Man: Into the Spider-Verse", price: 275, category: "comics" },
  { id: 22, title: "Thinking, Fast and Slow", price: 420, category: "non-fiction" },
  { id: 23, title: "Outliers", price: 310, category: "non-fiction" },
  { id: 24, title: "A People's History of the United States", price: 500, category: "history" },
  { id: 25, title: "Guns, Germs, and Steel", price: 450, category: "history" },
  { id: 26, title: "The Cat in the Hat", price: 200, category: "children" },
  { id: 27, title: "The Diary of a Young Girl", price: 350, category: "biographies" },
  { id: 28, title: "The Art of War", price: 280, category: "history" },
  { id: 29, title: "The Lean Startup", price: 390, category: "education" },
  { id: 30, title: "Deep Work", price: 340, category: "education" },
];

for (let id = 41; id <= 300; id++) {
  allProducts.push({
    id,
    title: `Product No. ${id}`,
    price: Math.floor(Math.random() * (800 - 200 + 1)) + 200,
    category: "education",
  });
}

// Filter products by category
const normalize = (str) => str.toLowerCase().replace(/\s+/g, '-');

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL
  const [sort, setSort] = useState("suggested");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const filtered = allProducts
    .filter((p) => normalize(p.category) === category)
    .map((p) => ({
      ...p,
      image: `https://picsum.photos/200`,
    }));

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sorted.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sorted.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on category change
  }, [category]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 capitalize text-center">
          {category.replace(/-/g, " ")}
        </h1>

        {/* Sorting Dropdown */}
        <div className="flex justify-end mb-6">
          <select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className="border p-2 rounded"
          >
            <option value="suggested">Suggested</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No products found in this category.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-1 flex-wrap">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-2 rounded bg-white border text-gray-700 hover:bg-gray-100"
            >
              Prev
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
            )
            .map((page, index, arr) => {
              const prevPage = arr[index - 1];
              const showEllipsis = prevPage && page - prevPage > 1;

              return (
                <React.Fragment key={page}>
                  {showEllipsis && (
                    <span className="px-2 py-2 text-gray-500 select-none">
                      ...
                    </span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "bg-white border text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              );
            })}

          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-2 rounded bg-white border text-gray-700 hover:bg-gray-100"
            >
              Next
            </button>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
