import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { name: "Fiction", icon: "📖" },
  { name: "Non-Fiction", icon: "📚" },
  { name: "Science", icon: "🔬" },
  { name: "History", icon: "🏛️" },
  { name: "Biographies", icon: "👤" },
  { name: "Children", icon: "🧒" },
  { name: "Education", icon: "🎓" },
  { name: "Comics", icon: "🦸‍♂️" },
  { name: "Fantasy", icon: "🐉" },
  { name: "Self-Help", icon: "💡" },
];

const ITEMS_PER_PAGE = 6;

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredCategories = CATEGORIES.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleCategories = filteredCategories.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCategories.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <>
      <Navbar />
      <div className="bg-grey text-white min-h-screen p-6 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-black">
          Categories{" "}
          <span className="block w-40 h-1 bg-green-500 mt-1 rounded-sm"></span>
        </h1>

        {/* Search Bar */}
        <div>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search Categories..."
            fullWidth
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                fontSize: "18px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontSize: "18px",
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {visibleCategories.map((category, index) => {
            const slug = category.name.toLowerCase().replace(/\s+/g, "-");
            return (
              <Link to={`/product-category/${slug}`} key={index}>
                <div
                  key={index}
                  className="bg-gray-900 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-4 
              shadow-md hover:shadow-2xl hover:scale-105 transform transition-all duration-300 min-h-[150px]"
                >
                  <div className="text-6xl">{category.icon}</div>
                  <h3 className="text-2xl font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore ? (
          <div className="flex justify-center">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        ) : null}

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

export default Categories;
