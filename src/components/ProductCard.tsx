import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import toast from 'react-hot-toast';
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";


interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  quantity: number;
}

const ProductCard: React.FC<Product & {
  onAddToCart: (id: string, quantity: number, price: number) => void;
  onAddToWishlist: (id: string) => void;
  removeFromWhishlist: (id: string) => void;
  isWishlist: boolean;
}> = ({
  _id,
  name = '',
  price = 0,
  description = '',
  image,
  quantity = 0,
  onAddToCart,
  onAddToWishlist,
  removeFromWhishlist,
  isWishlist,
}) => {

    const formattedPrice = typeof price === 'number' ? price.toFixed(2) : '0.00';
    const userData = useSelector((prevState: RootState) => prevState.user.userData);

    return (
      <div className="group relative w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="relative h-64 overflow-hidden bg-gray-200">
          <img
            src={image || "/api/placeholder/400/320"}
            alt={name || 'Product image'}
            className="w-full h-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => isWishlist ? removeFromWhishlist(_id) : onAddToWishlist(_id)}
              className={`p-2 rounded-full transition-colors duration-200 
      ${isWishlist ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              aria-label="Wishlist"
            >
              {isWishlist ? <FaHeart className="text-xl" />:<FaRegHeart className="text-xl" /> }
            </button>
          </div>

          {quantity === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {name || 'Untitled Product'}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description || 'No description available'}
          </p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-gray-900">
              ₹{formattedPrice}
            </span>
          </div>

          <button
            onClick={() => {
              if (!userData) {
                toast.error("Please login to add to cart");
              } else {
                onAddToCart(_id, 1, price);
              }
            }}
            disabled={quantity === 0}
            className="w-full py-2 px-4 bg-orange-600 text-white rounded-md font-medium flex items-center justify-center gap-2 
            hover:bg-orange-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    );
  };

export default ProductCard;
