import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import Profile from './Components/Profile/Profile_Setup'
import { useAuth } from './Components/Context/Authcontext'
import Navbs from './Components/Navbar/Navbs'
import Active from './Components/Order/Active'
import Details from './Components/Order/Details'
import Graph from './Components/Graph/Location'
import Predict from './Components/Predict/Predict'
import Archive from './Components/Order/Archive'
import Suggestloc from './Components/Graph/Suggestloc'
export default function App() {
  const { token,login } = useAuth();

  useEffect(() => {
    const authtoken = localStorage.getItem("auth-token");
    if (authtoken) {
      login(authtoken);
    }
  },[]);
  return (
    <>
      <BrowserRouter>
      {token!=undefined ? 
      <>
      <Navbs></Navbs>
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path ="/home" element={<Active/>} />
        <Route path="/details/:oid" element={<Details />} />
<Route path='/graph' element={<Graph></Graph>} />
<Route path="/predict" element={<Predict />} />
<Route path="/archive" element={<Archive/>} />
<Route path="/location" element={<Suggestloc></Suggestloc>} />
        <Route path="*" element={<h1>Nots Found</h1>} />
      </Routes>
      </>
      :<Login></Login>}
      </BrowserRouter>
    </>
  )
}
