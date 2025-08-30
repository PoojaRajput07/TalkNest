import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom"
import { AppLayout } from "./component/AppLayout"
import Home from "./component/Home"
import Login from "./component/Login"
import Logout from "./component/Logout"
import OnBoard from "./component/OnBoard"
import { Signup } from "./component/Signup"
import { Toaster } from "react-hot-toast";


import {  useAuth } from "./AuthContext"
import { useTheme } from "./ThemeContext"
import Notifications from "./component/Notifications"
import Chat from "./component/ChatInfo"
import ChatInfo from "./component/ChatInfo"
import CallPage from "./component/CallPage"





export const App=()=>{
  const{theme}=useTheme();
    const{authuser,isLoading}=useAuth();
    
  if(isLoading){
    return<h2>loading</h2>
  }
  const onboarded=authuser?.isonboarded;
  console.log("app.jsx mai",onboarded);


  return(
    <>
     <Toaster position="top-right" />
    
   <Routes data-theme={theme}>
    <Route path="/signup" element={ !authuser ? <Signup/> : <Navigate to="/"/>}></Route>
    <Route path="/" element={!authuser?(<Navigate to ="/login"/>):!onboarded?(<Navigate to="/onboard"/>):(<AppLayout showSidebar={true}><Home/></AppLayout>)}></Route>

    
    <Route path="/login" element={!authuser ? <Login/> : <Navigate to="/"/>}></Route>

    <Route path="/onboard" element={!authuser?<Navigate to="/login"/>:(onboarded?<Navigate to ="/"/>:<OnBoard/>)}></Route>
    <Route path="/logout" element={authuser?<Logout/>:<Navigate to="/login"/>}></Route>
    <Route path ="/notifications" element={!authuser?<Navigate to ="/signup"/>:<AppLayout showSidebar={true}><Notifications/></AppLayout>}></Route>
    <Route path="/ChatInfo/:id" element={!authuser?<Navigate to ="/login"/>:<AppLayout><ChatInfo/></AppLayout>}></Route>
    <Route path="/call/:id" element={authuser&&onboarded?<CallPage/>:!onboarded?<Navigate to ="/onBoard"/>:<Navigate to ="/"/>}></Route>

   </Routes>
    </>
  )
}