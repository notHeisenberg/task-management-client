import { DropdownMenuDemo } from "@/components/DropdownDemo/DropdownMenuDemo";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import { NavLink } from "react-router-dom";
import PopOver from "@/components/PopOver/PopOver";
import ThemeChange from "@/components/Theme/Theme";
import logo from "@/assets/taskfyx_logo.png";

export function Navbar() {
  const { user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosCommon.get(`/user/${user.email}`)
        .then((res) => {
          if (res.data) {
            setRole(res.data.role === "general-user" ? "User" : "Admin");
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [user?.email]);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 backdrop-blur-sm shadow-lg dark:shadow-gray-900/30">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <NavLink 
          to={'/'} 
          className="flex items-center space-x-2 transition-transform hover:scale-105"
        >
          <img 
            src={logo} 
            alt="Taskifyx logo" 
            className="h-10 w-10 object-contain" 
          />
          <span className="hidden sm:block font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
            Taskifyx
          </span>
        </NavLink>

        {/* Right Side Items */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Theme Toggle */}
          <div className="hover:scale-105 transition-transform">
            <ThemeChange />
          </div>

          {/* Notifications */}
          <div className="hover:scale-105 transition-transform">
            <PopOver />
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <DropdownMenuDemo />
            <div className="hidden md:flex flex-col items-end">
              <h1 className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                {user?.displayName}
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
