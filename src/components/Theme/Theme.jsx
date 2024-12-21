import { IoSunnySharp } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";


const ThemeChange = () => {
  const { isDarkMode, setIsDarkMode } = useAuth()
  const htmlBody = document.getElementById("mainBody");
  const darkMode = localStorage.getItem("darkMode");

  useEffect(() => {
    if (darkMode == "true") {
      htmlBody.classList.add("dark")
      setIsDarkMode(true)
    }
  }, [darkMode, htmlBody.classList, setIsDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    htmlBody.classList.toggle("dark")
    localStorage.setItem("darkMode", !isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-end group relative"
      title="Toggle theme (Cmd + / or Ctrl + /)"
    >
      <p className="text-2xl dark:text-white text-gray-500 border-2 rounded-full p-1 border-gray-500 dark:border-none">
        {isDarkMode ? <IoSunnySharp /> : <IoMdMoon />}
      </p>
      <span className="absolute hidden group-hover:block -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
        Toggle theme (⌘ + /)
      </span>
    </button>
  );
};

export default ThemeChange;