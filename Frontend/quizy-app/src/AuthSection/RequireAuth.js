import React, {useContext} from 'react'
import { UserContext } from '../App/App'
import { Navigate, useLocation } from 'react-router-dom'

export const RequireAuth = ({children}) => {
    const user = useContext(UserContext).user
    const location = useLocation()
    if (!user){
        return <Navigate to = '/login' state ={{ path : location.pathname }}/>
    }
  return children
}
