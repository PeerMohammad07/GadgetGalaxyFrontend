import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  quantity: number;
}

const ProductCard: React.FC<Product & {
  onAddToCart: (id: string) => void;
  onAddToWishlist: (id: string) => void;
  onQuickView: (id: string) => void;
}> = ({
  id,
  name = '',
  price = 0,
  description = '',
  image,
  quantity = 0,
  onAddToCart,
  onAddToWishlist,
  onQuickView
}) => {
  // Ensure price is a number and format it safely
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : '0.00';

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
            onClick={() => onAddToWishlist(id)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Add to wishlist"
          >
            ♡
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
          {quantity > 0 && quantity < 5 && (
            <span className="text-sm text-orange-600">
              Only {quantity} left!
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(id)}
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

export default ProductCard