import  { useState, useEffect } from 'react';
import { getAllCartItems } from '../../Api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { getAllCategorys, getAllProducts } from '../../Api/adminApi';
import ProductListing from './ProductListing';

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
  const [_, setCartItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

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
    if(userData){
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
    }
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
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 mb-8 shadow-lg">
            <h1 className="text-4xl font-bold text-white mb-2">Gadget Galaxy</h1>
            <p className="text-white/90">Discover the latest in tech innovation</p>
          </div>

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

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading amazing gadgets...</p>
            </div>
          ) : (
            <>

              <ProductListing products={filteredProducts}  />
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
    </>
  );
};

export default Shop;