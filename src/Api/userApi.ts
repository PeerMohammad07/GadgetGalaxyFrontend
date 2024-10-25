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

export const logoutApi = async ()=>{
  try {
    return await Api.post(userEndPoints.logout)
  } catch (error) {
    return Promise.reject()
  }
}