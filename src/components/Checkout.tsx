import { useEffect, useState } from 'react';
import AddAddressModal from './AddressModal';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { getAllCartItems, placeOrderApi } from '../Api/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isAddressModal, setIsAddressModal] = useState(false);
  const userData = useSelector((state: RootState) => state.user.userData);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      const response = await getAllCartItems(userData?._id);
      setCartItems(response.data.products);
    };
    fetch();
  }, [userData]);

  // Function to calculate total amount
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select an address to purchase.');
      return;
    }
    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    const orderDetails = {
      userId: userData?._id,
      products: cartItems.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productPrice,
        quantity: item.quantity,
      })),
      totalAmount: calculateTotal(),
      status: 'placed',
      paymentMethod,
      deliveryAddress: selectedAddress,
    };

    try {
      if (paymentMethod == "cash") {
        const response: any = await placeOrderApi(orderDetails);
        if (response.data.data.status =="placed") {
          Swal.fire({
            title: 'Payment Successful!',
            text: 'Your order has been placed successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/orders');
            }
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to place your order. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    } catch (error) {
      toast.error('Something went wrong please try again');
      console.error(error);
    }
  };

  console.log(userData?.addresses, "addresses")

  return (
    <>
      <AddAddressModal
        isOpen={isAddressModal}
        onClose={() => setIsAddressModal(false)}
      />
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Select Your Address</h2>
            <div className="space-y-4">
              {userData && userData.addresses.map((address) => (
                <div key={address._id} className="border p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <input
                      type="radio"
                      id={`address-${address._id}`}
                      name="address"
                      value={address._id} 
                      checked={selectedAddress === address._id} 
                      onChange={(e) => setSelectedAddress(e.target.value)} 
                      className="mt-1"
                    />
                    <label
                      htmlFor={`address-${address._id}`}
                      className="flex flex-col gap-1 text-sm"
                    >
                      <span>{address.name}</span>
                      <span>{address.state}</span>
                      <span>{address.city}</span>
                      <span>{address.pinNo}</span> 
                      <span>{address.phNo}</span>
                    </label>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => setIsAddressModal(true)}
                >
                  Add address
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Your Order</h2>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.productId.name}</span>
                  <span>₹{item.totalPrice}</span>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium mb-2">Payment Method</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="payment-cash"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="payment-cash">Cash on Delivery</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="payment-razorpay"
                      name="payment"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="payment-razorpay">Online Payment</label>
                  </div>
                </div>
              </div>

              <button
                className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 mt-4"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
