import { useEffect, useState } from 'react';
import { getAllOrders } from '../../Api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

const OrdersList = () => {
  const [orders,setOrders] = useState<any>([])
  const userData = useSelector((state:RootState)=> state.user.userData)

  useEffect(()=>{
    const fetch = async ()=>{
      const response = await getAllOrders(userData?._id)
      if(Array.isArray(response.data)){
        setOrders(response.data)
      }
    }
    fetch()
  },[])

  const formatDate = (dateString:string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
        </div>

        {/* Orders List */}
        <div className="p-6 space-y-4">
          {orders.map((order:any) => (
            <div 
              key={order._id} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    Order #{order._id}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Ordered on {formatDate(order.createdAt)}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <div className="text-sm">
                    <span className="text-gray-500">Payment: </span>
                    <span className="text-gray-700">{order.paymentMethod}</span>
                  </div>
                  
                  <div className="text-lg font-semibold text-orange-500">
                    ₹{order.totalAmount.toLocaleString()}
                  </div>

                  <div 
                    className={`px-3 py-1 rounded-full text-sm inline-block
                      ${order.status === "Delivered" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-orange-100 text-orange-800"
                      }`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {order.products.map((product:any, idx:number) => (
                  <div key={idx} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-800">{product.name}</span>
                      <span className="text-sm text-gray-500">
                        x{product.quantity}
                      </span>
                    </div>
                    <div className="font-medium text-gray-800">
                      ₹{product.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;