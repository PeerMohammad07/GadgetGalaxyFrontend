import { useSelector } from "react-redux";
import { addToCart, addToWishlist, getAllWishlistItems, removeItemFromWishlist } from "../../Api/userApi";
import ProductCard from "../../components/ProductCard";
import { RootState } from "../../Redux/store";
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";

const ProductListing: React.FC<any> = ({ products }) => {

  const userData = useSelector((state: RootState) => state.user.userData)
  const [whishlistProduct, setWhislistProduct] = useState<any>([])


  useEffect(() => {
    const fetch = async () => {
      if(userData){
        const response = await getAllWishlistItems(userData?._id);
        if (response.data && response.data.products) {
          setWhislistProduct(response.data.products);
        }
      }
    };
    fetch();
  }, [userData]);





  const handleAddToCart = async (productId: string, productQuantity: number, productPrice: number) => {
    try {
      const response = await addToCart(userData?._id, productId, productQuantity, productPrice);
      if (response.data) {
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


  const handleAddToWishlist = async (id: string) => {
    try {
      const response = await addToWishlist(userData?._id, id);
      if (response.data) {
        setWhislistProduct(response.data.products);
        toast.success("Added to wishlist successfully!");
      }
    } catch (error: any) {
      if (error.status == 409) {
        toast.error("Product already exists in the cart")
      } else {
        toast.error("Something went wrong please try again");
      }
    }
  };

  const handleRemoveFromWishlist = async (id: string) => {
    try {
      const response = await removeItemFromWishlist(userData?._id, id);
      if (response.data) {
        setWhislistProduct((prevWishlist: any) =>
          prevWishlist.filter((product: any) => product.productId._id !== id)
        );
        toast.success("Removed from wishlist successfully!");
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const checkIsWishlist = (id: string) => {
    return whishlistProduct && whishlistProduct.some((product: any) => product.productId._id === id);
  };


  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.isArray(products) && products.map((product: any) => (
            <ProductCard
              key={product._id}
              {...product}
              isWishlist={checkIsWishlist(product._id)}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              removeFromWhishlist={handleRemoveFromWishlist}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductListing;