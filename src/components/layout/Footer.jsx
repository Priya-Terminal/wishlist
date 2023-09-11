import React from "react";
import { useDarkMode } from "@/contexts/DarkModContext";

const Footer = () => {
  const { darkMode } = useDarkMode();
  return (
    <footer className={`py-4 ${darkMode ? 'bg-gray-600' : 'bg-zinc-300'}`}>
      <div className="container mx-auto text-center">
        <p className={`${darkMode ? 'text-white' : 'text-black'}`}>&copy; 2023 ShareWish</p>
      </div>
    </footer>
  );
};

export default Footer;
