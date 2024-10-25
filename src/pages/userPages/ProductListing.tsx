import ProductCard from "../../components/ProductCard";
import { Product } from "../../Interfaces/IUserData";

const ProductListing: React.FC<any> = ({products}) => {

  const handleAddToCart = (id: string) => {
    console.log('Adding to cart:', id);
    // Implement your cart logic here
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
        {products.map((product) => (
          <ProductCard
            key={product.id}
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