import React from "react";

export const ProductCardNarrow = ({ product }) => {
  return (
    <div className="relative bg-gray-900 text-white rounded-lg shadow-lg w-[200px] h-[350px] \
      transform transition-transform duration-200 scale-90 hover:scale-100">
      
      {/* Platform Badge */}
      <div className="absolute top-2 left-2 bg-blue-700 text-white text-xs px-2 py-0.5 rounded z-10">
        SALE!
      </div>

      {/* Pre-Owned Tag */}
      <div className="absolute top-2 right-0 bg-yellow-600 text-white text-xs px-2 py-0.5 rounded-l z-10">
        Pre Owned
      </div>

      {/* Image with padding and rounded corners */}
      <div className="p-2 pt-4 pb-1">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-56 object-cover rounded-md"
        />
      </div>

      {/* Content */}
      <div className="px-3 pb-4 flex flex-col gap-2">
        {/* Title */}
        <h3 className="text-sm font-semibold text-center leading-tight h-[40px]">
          {product.title}
        </h3>

        {/* Price & Button Row */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <div className="text-white font-bold text-base">
              ₹ {product.price.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 line-through">
              ₹ {(product.price + 300).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-6 w-px bg-gray-300"></div>

            <button className="bg-green-500 hover:bg-green-600 w-10 h-10 rounded-md text-white text-xl flex items-center justify-center transition">
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
    <div className="relative bg-white p-4 rounded shadow hover:shadow-lg w-full h-full transform scale-95 hover:scale-100 transition-transform duration-150 ">
      {/* Top Badges */}
      <div className="absolute top-2 left-2 flex space-x-1 z-10">
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">SALE!</span>
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">PRE-OWNED</span>
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
