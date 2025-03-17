import React from "react";
import { FloatingNav } from "./ui/FloatingNav";
import { 
  HomeIcon, 
  UserIcon,
  PlusCircleIcon,
  LogOutIcon,
  Utensils
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";

export const NavbarDemo = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Removed Search option from navigation items
  const publicNavItems = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    }
  ];

  const authNavItems = isAuthenticated 
    ? [
        ...publicNavItems,
        {
          name: "Create Recipe",
          link: "/create-recipe",
          icon: <PlusCircleIcon className="h-5 w-5" />,
        },
        {
          name: "Profile",
          link: "/profile",
          icon: <UserIcon className="h-5 w-5" />,
        },
        {
          name: "Logout",
          onClick: handleLogout,
          icon: <LogOutIcon className="h-5 w-5" />,
        }
      ]
    : [
        ...publicNavItems,
        {
          name: "Login",
          link: "/login",
          icon: <UserIcon className="h-5 w-5" />,
        },
      ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, index) => (
            <div 
              key={index}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(79,70,229,0.2) 0%, rgba(79,70,229,0) 70%)`,
                transform: `translate(-50%, -50%)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative h-[30vh] flex flex-col items-center justify-center px-4 z-10">
        <FloatingNav navItems={authNavItems} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Utensils className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Recipe Sharing App
            </h1>
          </div>
          
          {isAuthenticated ? (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg mt-2 text-gray-600 dark:text-gray-300"
            >
              Welcome, <span className="font-medium text-blue-600">{user?.username}</span>
            </motion.p>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg mt-2 text-gray-600 dark:text-gray-300"
            >
              Discover and share amazing recipes
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NavbarDemo;