import React, { createContext,useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
const Authcontext = createContext();

export const useAuth = () => {
  
    return useContext(Authcontext);
  };

export const AuthProvider = ({ children }) => {
  
  const [token, setToken] = useState(null);

    

  const login = (authtoken) => {
    console.log(authtoken);
    setToken(authtoken);
    localStorage.setItem('auth-token', authtoken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('auth-token');
    // localStorage.removeItem('role');
  };

  

  const value = {
    token,
    login,
    logout,
   
  };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};