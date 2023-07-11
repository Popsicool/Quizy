import React, {useContext} from 'react'
import { UserContext } from '../App/App'
import { Navigate, useLocation } from 'react-router-dom'

export const NotAuth = ({children}) => {
    const user = useContext(UserContext).user
    const location = useLocation()
    if (user){
        return <Navigate to = '/' state ={{ path : location.pathname }}/>
    }
  return children
}
