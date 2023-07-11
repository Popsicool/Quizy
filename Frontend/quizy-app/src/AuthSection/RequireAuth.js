import React, {useContext} from 'react'
import { UserContext } from '../App/App'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

export const RequireAuth = ({children}) => {
    const user = useContext(UserContext).user
    const location = useLocation()
    if (!user){
      toast.error("Login to proceed", {
      position:"top-right"
    })
        return <Navigate to = '/login' state ={{ path : location.pathname }}/>
    }
  return children
}
