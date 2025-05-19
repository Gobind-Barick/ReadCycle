import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";
import { ProductCardNarrow } from "../components/ProductCard";

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("suggested");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `http://localhost:8080/api/books?genre=${category.replace(/-/g, ' ')}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        const withImages = data.map((p) => ({
          ...p,
          image: p.imageUrl || `https://picsum.photos/200`,
        }));
        setProducts(withImages);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setCurrentPage(1);
  }, [category]);

  // Sorting
  const sorted = [...products].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sorted.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sorted.length / productsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen">
      
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {loading ? (
              <p className="col-span-full text-center text-gray-600">Loading...</p>
            ) : error ? (
              <p className="col-span-full text-center text-red-500">{error}</p>
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Link to={`/book/${product.id}`}>
                  <ProductCardNarrow key={product.id} product={product} />
                </Link>
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
