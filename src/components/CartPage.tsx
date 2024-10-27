import React, { useState, useMemo, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { getAllCartItems, removeItemFromCart, updateQuantity } from '../Api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ShoppingCart:React.FC<any> = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const [cartItems,setCartItems] = useState([])
  const [cart,setCart] = useState<any>([])
  const navigate = useNavigate()

  useEffect(()=> {
    const fetch = async ()=>{
      const response = await getAllCartItems(userData?._id)
      setCartItems(response.data.products)
      setCart(response.data)
    }
    fetch()
  },[])

  const cartTotals = useMemo(() => {
    return cartItems.reduce((acc, item:any) => {
      return {
        subtotal: acc.subtotal + item.totalPrice,
        itemCount: acc.itemCount + item.quantity
      };
    }, { subtotal: 0, itemCount: 0 });
  }, [cartItems]);


  const handleQuantityChange = async (itemId: string, type: string) => {
    try {
      console.log(itemId,"pridct  ")
        const response = await updateQuantity(type, cart._id, itemId);
        if (response.data.status === 200) {
            setCart(response.data)
            toast.success("Quantity updated successfully");
        } else {
            if (response.data?.message) {
                toast.error(response.data.message);
            }
        }
    } catch (error:any) {
        console.error("Error updating quantity:", error);
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("An error occurred while updating quantity");
        }
    }
};


const removeItem = async (itemId: string) => {
  const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
  });

  if (result.isConfirmed) {
      try {
          const response = await removeItemFromCart(itemId, cart._id);
          if (response.status === 200) {
              setCart(response.data); 
              setCartItems(response.data.products)
              console.log(cartItems)
              toast.success("Item removed successfully");
          } else {
              if (response.data?.message) {
                  toast.error(response.data.message);
              }
          }
      } catch (error: any) {
          console.error("Error removing item from cart:", error);
          if (error.response?.data?.message) {
              toast.error(error.response.data.message);
          } else {
              toast.error("An error occurred while removing the item");
          }
      }
  } else {
      toast.error("Item not removed");
  }
};

  const handleCheckout = () => {
    navigate('/checkout')
  };

  return (
    <>
    <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-orange-600">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item:any) => (
                <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 relative flex-shrink-0">
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{item.productId.name}</h3>
                        <p className="text-orange-600 font-medium">
                          ₹{item.productPrice.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.productId._id,"dec")}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
                        >
                          -
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.productId._id, "inc")}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[100px]">
                        <p className="font-semibold">₹{item.totalPrice.toLocaleString()}</p>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId._id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartTotals.itemCount} items)</span>
                  <span className="font-semibold">₹{cartTotals.subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className={`w-full py-2 px-4 rounded-lg text-white ${
                  cartItems.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ShoppingCart;