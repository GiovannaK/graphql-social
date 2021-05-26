import React, { createContext, useReducer } from 'react';

const AuthContext = createContext({
    user: null,
    authenticated: false,
    login: (userData) => {},
    logout: () => {}
})

function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null,
                authenticated: false
            }
        default: 
            return state;
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, {user: null});

    function login(userData) {
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout(){
        dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <AuthContext.Provider value={{user: state.user, login, logout, authenticated: state.authenticated}} {...props} />
    )
}

export {AuthContext, AuthProvider}