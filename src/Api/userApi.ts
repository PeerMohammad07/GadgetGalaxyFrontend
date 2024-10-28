import Api from "../Services/axios"
import { userEndPoints } from "../Services/endPoints/userEndPoints"


export const loginApi = async (data: any) => {
  try {
    return await Api.post(userEndPoints.signIn, { email: data.email, password: data.password })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const registerApi = async (data: any) => {
  try {
    return await Api.post(userEndPoints.signUp, { name: data.name,email: data.email, password: data.password })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const addToCart  = async (userId:any,productId:string,productQuantity:number,productPrice:number)=>{
  try {
    return await Api.post(`${userEndPoints.cart}/${userId}`,{
      productId,
      quantity:productQuantity,
      productPrice
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getAllCartItems = async (userId:any)=>{
  try {
    return await Api.get(`${userEndPoints.cart}/${userId}`)
  } catch (error) {
    return Promise.reject()
  }
}

export const removeItemFromCart = async (productId: string, cartId: string) => {
  try {
      return await Api.delete(`${userEndPoints.removeItemFromCart}/${cartId}/${productId}`);
  } catch (error) {
      return Promise.reject(error);
  }
};


export const updateQuantity = async (type:string,cartId:string,productId:string)=>{
  try {
    return await Api.patch(userEndPoints.updateQuantity,{
      type ,
      cartId,
      productId
    })
  } catch (error) {
    return Promise.reject()
  }
}

export const logoutApi = async ()=>{
  try {
    return await Api.post(userEndPoints.logout)
  } catch (error) {
    return Promise.reject()
  }
}

export const addToWishlist = async (userId: any, productId: string) => {
  try {
    return await Api.post(`${userEndPoints.wishlist}/${userId}`, {
      productId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllWishlistItems = async (userId: any) => {
  try {
    return await Api.get(`${userEndPoints.wishlist}/${userId}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeItemFromWishlist = async (userId: any, productId: string) => {
  try {
    return await Api.delete(`${userEndPoints.wishlist}/${userId}/${productId}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addAddress = async (userId:any,address:any)=> {
  try {
    return await Api.post(`${userEndPoints.addAddress}/${userId}`,{
      address
    })
  } catch (error) {
    return Promise.reject()
  }
}

export const placeOrderApi = async (orderDetails:any) => {
  try {
    return await Api.post(userEndPoints.placeOrder,{orderDetails});
  } catch (error) {
    return Promise.reject()
  }
};

export const getAllOrders = async (userId:any)=>{
  try {
    return await Api.get(`${userEndPoints.orders}/${userId}`)
  } catch (error) {
    return Promise.reject()
  }
}