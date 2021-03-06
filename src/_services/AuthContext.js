import React from 'react'
const AuthContext=React.createContext({ //context for keeping track on user's logedin status in various components
    isLogedIn:0,
    token:null,
    login:()=>{},
    logout:()=>{}
})
// const AuthContext = React.createContext('name is bharat');

const AuthContextProvider = AuthContext.Provider
const AuthContextConsumer = AuthContext.Consumer
export {AuthContextProvider,AuthContextConsumer}
export default  AuthContext;