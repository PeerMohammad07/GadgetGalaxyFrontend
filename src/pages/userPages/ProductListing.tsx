import { useSelector } from "react-redux";
import { addToCart } from "../../Api/userApi";
import ProductCard from "../../components/ProductCard";
import { RootState } from "../../Redux/store";
import toast from 'react-hot-toast';

const ProductListing: React.FC<any> = ({products,addCartItems}) => {

  const userData = useSelector((state:RootState)=> state.user.userData)

  const handleAddToCart = async (productId: string, productQuantity: number, productPrice: number) => {
    try {
      const response = await addToCart(userData?._id, productId, productQuantity, productPrice);
      if (response.data) {    
        addCartItems(response.data)    
        toast.success("Added to cart successfully");
      }
    } catch (error: any) {
        if (error.response && error.response.status === 409) {
        toast.error("Product already exists");
      } else {
        toast.error("An error occurred while adding to the cart.");
      }
    }
  };
  

  const handleAddToWishlist = (id: string) => {
    console.log('Adding to wishlist:', id);
    // Implement your wishlist logic here
  };

  const handleQuickView = (id: string) => {
    console.log('Quick view:', id);
    // Implement your quick view logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product:any) => (
          <ProductCard
            key={product._id}
            {...product}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onQuickView={handleQuickView}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;