import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="relative bg-white p-4 rounded shadow hover:shadow-lg w-full h-full transform scale-95 hover:scale-100 transition-transform duration-150 ">
      {/* Top Badges */}
      <div className="absolute top-2 left-2 flex space-x-1 z-10">
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">SALE!</span>
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">PRE-OWNED</span>
      </div>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover mb-3 rounded"
      />

      {/* Title */}
      <h3 className="text-sm font-semibold mb-1">{product.title}</h3>

      {/* Pricing */}
      <div className="mb-1">
        <span className="text-gray-400 line-through text-sm mr-2">Rs. {(product.price + 400).toLocaleString()}</span>
        <span className="text-black-600 font-bold text-lg">Rs. {product.price.toLocaleString()}</span>
      </div>

      {/* Stock and Button Row */}
      <div className="flex mt-2 space-x-2">
        <span className="w-1/2 text-green-600 text-sm font-medium flex items-center justify-center border border-green-600 rounded">
          In Stock
        </span>
        <button className="w-1/2 bg-black text-white py-2 text-sm font-semibold rounded hover:bg-gray-800 transition">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
