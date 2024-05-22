// import React, { useState, useEffect } from "react";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
// import Sidebar from "./components/Sidebar";
import RiseDentalLogo from "@/assets/Logo.svg";

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const links = [
    {
      url: "/add-patient",
      title: "اضافة مريض",
      icon: <CalendarIcon className="h-4 w-4" />,
    },
    {
      url: "/#",
      title: "المواعيد",
      icon: <CalendarIcon className="h-4 w-4" />,
    },
    {
      url: "/patients",
      title: "المرضي",
      icon: <UsersIcon className="h-4 w-4" />,
    },
    {
      url: "/#",
      title: "المدفوعات",
      icon: <CreditCardIcon className="h-4 w-4" />,
    },
    {
      url: "/#",
      title: "الاعدادات",
      icon: <SettingsIcon className="h-4 w-4" />,
    },
  ];
  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100 dark:bg-gray-900 md:w-10/12 mt-10 md:mt-0 w-full ">
        {isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />}
      </div>
      <div className=" h-full  w-2/12 hidden md:block">
        <Sidebar />
      </div>
      <div className="md:hidden fixed h-20 w-screen bg-gray-100 "></div>
      <div className="md:hidden fixed -top-16 left-4">
        <Link to={"/"}>
          <img src={RiseDentalLogo} width={200} alt="logo" />
        </Link>
      </div>
      <div className="md:hidden">
        <button
          title="list"
          name=""
          className="fixed top-4 right-4 w-10 h-8 flex flex-col justify-between z-50"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <div className="w-10 h-8 flex justify-center items-center text-white text-3xl">
              X
            </div>
          ) : (
            <>
              <div className="w-10 h-1 bg-[#000080] rounded"></div>
              <div className="w-10 h-1 bg-[#000080] rounded"></div>
              <div className="w-10 h-1 bg-[#000080] rounded"></div>
            </>
          )}
        </button>
        {open && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-[#000080]  text-white flex flex-col items-center justify-center gap-8 text-4xl">
            {links.map((link) => (
              // <a href={link.url} key={link.url}>
              //   {link.title}
              // </a>
              <NavLink to={link.url} key={link.url}>
                {" "}
                {link.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppLayout;

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function CreditCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
