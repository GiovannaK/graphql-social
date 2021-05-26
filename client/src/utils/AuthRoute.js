import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext } from '../context/auth'

export const AuthRoute = ({component: Component, ...rest }) => {
    const {user} = useContext(AuthContext)
    return (
       <Route 
        {...rest}
        render={
            props => user ? <Redirect to="/" /> : <Component {...props} /> 
        }
       />
    )
}
