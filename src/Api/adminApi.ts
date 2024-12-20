import Api from "../Services/axios"
import { adminEndpoints } from "../Services/endPoints/adminEndPoints"

export const adminLoginApi = async (data: any) => {
  try {
    return await Api.post(adminEndpoints.signIn, { email: data.email, password: data.password })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getAllUsers = async ()=>{
  try {
    return await Api.get(adminEndpoints.getUsers)
  } catch (error) {
    return Promise.reject()
  }
}

export const getAllCategorys = async ()=>{
  try {
    return await Api.get(adminEndpoints.getCategorys)
  } catch (error) {
    return Promise.reject()
  }
}

export const getAllProducts = async ()=>{
  try {
    return await Api.get(adminEndpoints.getProducts)
  } catch (error) {
    return Promise.reject()
  }
}

export const addProduct = async (data:any,image:any)=>{
  try {
    return await Api.post(adminEndpoints.addProduct,{data,image:image},{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    })
  } catch (error) {
    return Promise.reject()
  }
}

export const editProduct = async (data:any,id:any)=>{
  try {
    return await Api.patch(`${adminEndpoints.products}/${id}`,{data})
  } catch (error) {
    return Promise.reject()
  }
}

export const editCategory = async (data:any,id:any)=>{
  try {
    return await Api.patch(`${adminEndpoints.category}/${id}`,{data})
  } catch (error) {
    return Promise.reject()
  }
}

export const deleteProduct = async (userId : string)=>{
  try {
    return await Api.delete(`${adminEndpoints.products}/${userId}`)
  } catch (error) {
    return Promise.reject()
  }
}

export const addCategory = async (data:any)=>{
  try {
    return await Api.post(adminEndpoints.category,{data})
  } catch (error) {
    return Promise.reject()
  }
}

export const deleteCategory = async (userId:string)=>{
  try {
    return await Api.delete(`${adminEndpoints.category}/${userId}`)
  } catch (error) {
    return Promise.reject()
  }
}

export const logoutApiAdmin = async ()=>{
  try {
    return await Api.post(adminEndpoints.logout)
  } catch (error) {
    return Promise.reject()
  }
}