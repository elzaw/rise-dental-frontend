// import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";
// import Sidebar from "./components/Sidebar";

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 md:w-10/12 w-full ">
        {isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />}
      </div>
      <div className=" h-full  w-2/12 hidden md:block">
        <Sidebar />
      </div>
    </div>
  );
};

export default AppLayout;
