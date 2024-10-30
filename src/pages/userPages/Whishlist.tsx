import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { RootState } from '../../Redux/store';
import { getAllWishlistItems } from '../../Api/userApi';

const Wishlist = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const [whishlistProduct, setWhislistProduct] = useState<any>([]);

  useEffect(() => {
    if (userData) {
      const fetch = async () => {
        const response = await getAllWishlistItems(userData?._id);
        if (response.data && response.data.products) {
          setWhislistProduct(response.data.products);
        }
      };
      fetch();
    }
  }, [userData]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Wishlist</h1>
      
      {Array.isArray(whishlistProduct) && whishlistProduct.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whishlistProduct && whishlistProduct.map((item: any) => (
            <div 
              key={item._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-square relative">
                <img 
                  src={item.productId.images && item.productIdimages[0]}
                  alt={item.productId.name || 'Product'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{item.productId.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{item.productId.category}</p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.productId.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
