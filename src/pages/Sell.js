import Navbar from "../components/Navbar";
import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "../components/Footer";
import { useState } from "react";

const products = [
  {
    id: 1,
    title: "The Last of Us Part I - PS5",
    image: "https://m.media-amazon.com/images/I/71NBQ2a52CL._SL1500_.jpg",
  },
  {
    id: 2,
    title: "Sony PlayStation 4 Pro 1 TB Black - PS4",
    image: "https://m.media-amazon.com/images/I/71NBQ2a52CL._SL1500_.jpg",
  },
  {
    id: 3,
    title: "God of War Ragnarok - PS5",
    image: "https://m.media-amazon.com/images/I/81iVsw3DHwL._SL1500_.jpg",
  },
  {
    id: 4,
    title: "DualSense Wireless Controller - Midnight Black",
    image: "https://m.media-amazon.com/images/I/61k05QXW5xL._SL1500_.jpg",
  },
  {
    id: 5,
    title: "PlayStation 5 Console (Disc Version)",
    image: "https://m.media-amazon.com/images/I/81dQwQlmAXL._SL1500_.jpg",
  },
  {
    id: 6,
    title: "PlayStation 5 HD Camera",
    image: "https://m.media-amazon.com/images/I/61d1I-hM1AL._SL1500_.jpg",
  },
  {
    id: 7,
    title: "Spider-Man: Miles Morales - PS5",
    image: "https://m.media-amazon.com/images/I/81Y7J-bkM-L._SL1500_.jpg",
  },
  {
    id: 8,
    title: "PlayStation VR2 Headset",
    image: "https://m.media-amazon.com/images/I/81B+nfR93EL._SL1500_.jpg",
  },
  {
    id: 9,
    title: "Horizon Forbidden West - PS5",
    image: "https://m.media-amazon.com/images/I/81NeZL8MtrL._SL1500_.jpg",
  },
  {
    id: 10,
    title: "Returnal - PS5",
    image: "https://m.media-amazon.com/images/I/81K4kGcmgNL._SL1500_.jpg",
  },
  {
    id: 11,
    title: "Gran Turismo 7 - PS5",
    image: "https://m.media-amazon.com/images/I/71bUJ4vKH9L._SL1500_.jpg",
  },
  {
    id: 12,
    title: "Ratchet & Clank: Rift Apart - PS5",
    image: "https://m.media-amazon.com/images/I/81xRMaTFFML._SL1500_.jpg",
  },
];

const Sell = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <>
      <Navbar />
      <div className="bg-grey text-white min-h-screen p-6 space-y-6  max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-black">
          Sell <span class="block w-14 h-1 bg-green-500 mt-1 rounded-sm"></span>
        </h1>

        {/* Banner */}
        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border-2 border-green-500 rounded-xl p-8 text-center shadow-lg">
          <p className="text-2xl md:text-3xl font-extrabold text-green-400 mb-1 tracking-wide">
            WANT TO SELL?
          </p>
          <p className="text-lg md:text-xl text-gray-100">FOLLOW THESE</p>
          <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-8">
            3 SIMPLE STEPS TO SELL YOUR PRODUCT
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 px-4 md:px-16">
            {/* Step Box */}
            {[
              {
                num: "1",
                title: "Search",
                desc: "Search and add the products you want to sell",
              },
              {
                num: "2",
                title: "Shipping",
                desc: "Choose free pickup or self ship",
              },
              {
                num: "3",
                title: "Get Paid",
                desc: "via UPI, Paytm, IMPS, Bank",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center bg-[#131313] p-6 rounded-lg hover:bg-[#1f1f1f] transition-all duration-300 shadow-md h-full"
              >
                <div className="text-5xl font-extrabold text-green-500 mb-2">
                  {step.num}
                </div>
                <p className="text-lg font-semibold text-green-300">
                  {step.title}
                </p>
                <p className="text-sm text-gray-400 mt-1 text-center">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div>
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            placeholder="Search Books..."
            fullWidth
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                fontSize: "20px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                fontSize: "20px",
                "& fieldset": {
                  borderColor: "black", // Always black border
                },
                "&:hover fieldset": {
                  borderColor: "black", // Black border on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black", // Black border on focus
                },
              },
            }}
          />
        </div>

        {/* Products */}
        <div className="grid md:grid-cols-2 gap-6">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 rounded-lg p-4 flex items-center gap-4 shadow-md"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  SELL NOW
                </button>
              </div>
            </div>
          ))}
        </div>
        {hasMore ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        ) : null}

        <div className="bg-[#0f0f0f] border-2 border-green-500 rounded-xl p-4 text-center flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 text-white text-sm md:text-base">
          <p className="font-medium">
            If you wish to sell any gaming product not listed above, please
            contact us via
          </p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-white-400 font-semibold">
              <img
                src="https://img.icons8.com/ios-filled/20/22c55e/whatsapp.png"
                alt="WhatsApp"
                className="w-5 h-5"
              />
              98406 32979
            </span>
            <span className="flex items-center gap-1 text-white-400 font-semibold">
              <img
                src="https://img.icons8.com/ios-filled/20/22c55e/new-post.png"
                alt="Email"
                className="w-5 h-5"
              />
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
