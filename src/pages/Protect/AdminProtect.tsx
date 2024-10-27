import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../Redux/store'

interface ProtectAdminRoutes{
  children:ReactNode
}

const ProtectAdminRoutes:React.FC<ProtectAdminRoutes> = ({children}) => {
  const navigate = useNavigate()
  const adminData = useSelector((prevState:RootState)=> prevState.admin.adminData)
  
  if(!adminData){
    navigate('/admin/login')
  }

  return children
}

export default ProtectAdminRoutes