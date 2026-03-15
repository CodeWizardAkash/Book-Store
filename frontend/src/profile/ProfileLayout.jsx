import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./user/ProfileSidebar";
import Navbar from "../components/Navbar";
import AdminSidebar from "./admin/AdminSidebar";
function ProfileLayout (){
  const user = JSON.parse(localStorage.getItem("user"));
  
  return(
    <div className="flex min-h-screen bg-gray-50" >
      {/* <Navbar/> */}

      
      {user?.role=== "admin" ? <AdminSidebar/> : <ProfileSidebar/>}
      {console.log({user})};
      
      {/* <ProfileSidebar/> */}
      {/* <AdminSidebar/> */}
      <div className="flex p-10">
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileLayout;