import React from "react";

export const ProductCardNarrow = ({ product }) => {
  return (
    <div
      className="
        relative 
        bg-white dark:bg-gray-900 
        text-gray-900 dark:text-white 
        rounded-lg shadow-lg 
        w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] 
        h-[300px] sm:h-[320px] md:h-[340px] lg:h-[350px]
        mx-auto
        transform transition-transform duration-200 scale-95 hover:scale-100
      "
    >
      {/* Platform Badge */}
      <div className="absolute top-2 left-2 bg-blue-700 text-white text-xs px-2 py-0.5 rounded z-10">
        SALE!
      </div>

      {/* Image */}
      <div className="p-2 pt-4 pb-1">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-md"
        />
      </div>

      {/* Content */}
      <div className="px-2 sm:px-3 pb-3 flex flex-col gap-2">
        <h3 className="text-xs sm:text-sm font-semibold text-center leading-tight h-[36px] sm:h-[40px] overflow-hidden">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-1">
          <div>
            <div className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
              ₹ {product.price.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 line-through">
              ₹ {(product.price + 300).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-px bg-gray-300 dark:bg-gray-600"></div>

            <button className="bg-green-500 hover:bg-green-600 w-8 h-8 sm:w-10 sm:h-10 rounded-md text-white text-base flex items-center justify-center transition">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
