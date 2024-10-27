import React, { useState, useEffect } from 'react';
import { getAllCartItems } from '../../Api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { getAllCategorys, getAllProducts } from '../../Api/adminApi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// TypeScript interfaces
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: string;
  image: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
}

interface UserData {
  _id: string;
}

const Shop = () => {
  const userData = useSelector((state: RootState) => state.user.userData) as UserData | null;
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!userData?._id) return;
        const response = await getAllCartItems(userData._id);
        setCartItems(response.data.products);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [userData?._id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategorys();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with subtle gradient background */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 mb-8 shadow-lg">
            <h1 className="text-4xl font-bold text-white mb-2">Gadget Galaxy</h1>
            <p className="text-white/90">Discover the latest in tech innovation</p>
          </div>
          
          {/* Search and Filter Section with enhanced styling */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for amazing gadgets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="absolute left-4 top-3.5 h-5 w-5 text-orange-400"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              
              <div className="flex items-center gap-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-orange-500"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
                  />
                </svg>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border-2 border-orange-200 rounded-lg p-3 pr-10 focus:outline-none focus:border-orange-500 transition-colors appearance-none bg-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading amazing gadgets...</p>
            </div>
          ) : (
            <>
              {/* Products Grid with enhanced cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div 
                    key={product._id} 
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    onMouseEnter={() => setHoveredProduct(product._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative overflow-hidden group" style={{ height: '260px' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          hoveredProduct === product._id ? 'scale-110' : 'scale-100'
                        }`}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/api/placeholder/400/300";
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                          {product.name}
                        </h3>
                        <span className="text-orange-500 font-bold">
                          ₹{Number(product.price).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Stock: {product.quantity}
                        </span>
                        <button 
                          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors duration-300 transform hover:scale-105"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results Message with better styling */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                  <svg 
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <p className="text-gray-500 text-xl">No products found matching your criteria</p>
                  <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;