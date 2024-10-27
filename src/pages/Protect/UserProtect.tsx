import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../Redux/store'

interface ProtectUserRoutes{
  children:ReactNode
}

const ProtectUserRoutes:React.FC<ProtectUserRoutes> = ({children}) => {
  const navigate = useNavigate()
  const userData = useSelector((prevState:RootState)=> prevState.user.userData)
  
  if(!userData){
    navigate('/')
  }

  return children
}

export default ProtectUserRoutes