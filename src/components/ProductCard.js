
import React from "react";

export const ProductCardNarrow = ({ product }) => {
  return (
    <div
      className="
        relative 
        bg-white dark:bg-gray-900 
        text-gray-900 dark:text-white 
        rounded-lg shadow-lg 
        w-[200px] sm:w-[180px] xs:w-[140px] min-w-[120px] h-[340px]
        transform transition-transform duration-200 scale-95 hover:scale-100
      "
    >
      {/* SALE Badge */}
      <div className="absolute top-2 left-2 bg-blue-700 text-white text-xs px-2 py-0.5 rounded z-10">
        SALE!
      </div>

      {/* Image */}
      <div className="p-2 pt-4 pb-1">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      {/* Content */}
      <div className="px-3 pb-4 flex flex-col gap-2">
        {/* Title */}
        <h3 className="text-xs font-semibold text-center leading-tight h-[36px] line-clamp-2">
          {product.title}
        </h3>

        {/* Price & Button Row */}
        <div className="flex items-center justify-between mt-1">
          <div>
            <div className="font-bold text-sm text-gray-900 dark:text-white">
              ₹ {product.price.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500 line-through">
              ₹ {(product.price + 300).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-px bg-gray-300 dark:bg-gray-600"></div>
            <button className="bg-green-500 hover:bg-green-600 w-8 h-8 rounded-md text-white text-base flex items-center justify-center transition">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const ProductCard = ({ product }) => {
  return (
    <div
      className="
        relative 
        bg-white dark:bg-gray-900 
        p-4 rounded shadow hover:shadow-lg 
        w-full h-full 
        transform scale-95 hover:scale-100 transition-transform duration-150
        text-gray-900 dark:text-white
      "
    >
      {/* Top Badges */}
      <div className="absolute top-2 left-2 flex space-x-1 z-10">
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          SALE!
        </span>
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          PRE-OWNED
        </span>
      </div>

      {/* Product Image */}
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-40 object-contain mb-3 rounded"
      />

      {/* Title */}
      <h3 className="text-sm font-semibold mb-1">{product.title}</h3>

      {/* Pricing */}
      <div className="mb-1">
        <span className="text-gray-400 dark:text-gray-500 line-through text-sm mr-2">
          Rs. {(product.price + 400).toLocaleString()}
        </span>
        <span className="font-bold text-lg text-gray-900 dark:text-white">
          Rs. {product.price.toLocaleString()}
        </span>
      </div>

      {/* Stock and Button Row */}
      <div className="flex mt-2 space-x-2">
        <span className="w-1/2 text-green-600 dark:text-green-400 text-sm font-medium flex items-center justify-center border border-green-600 dark:border-green-400 rounded">
          In Stock
        </span>
        <button className="w-1/2 bg-black dark:bg-gray-700 text-white py-2 text-sm font-semibold rounded hover:bg-gray-800 dark:hover:bg-gray-600 transition">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
