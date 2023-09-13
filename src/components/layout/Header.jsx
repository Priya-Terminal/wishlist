import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; 
import UserContext from "@/contexts/user";
import { removeUser } from "@/utils/user";
import { useDarkMode } from "@/contexts/DarkModContext"; 
import DarkModeToggle from "@/components/darkmode/DarkModeToggle";

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setShowMobileMenu(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
  
      if (response.ok) {
        removeUser(window);
        setUser(null);
        router.push("/");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className={`py-4 ${darkMode ? 'bg-gray-600' : 'bg-zinc-300'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className={`text-2xl font-semibold cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>
            <span style={{ color: "black" }}>ShareWish</span>
          </div>
        </Link>
        <div className="md:flex hidden"> {/* Show navigation on medium and larger screens */}
          {user ? (
            <>
              <Link href="/myprofile">
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-black'} mr-4 ${router.pathname === '/myprofile' ? 'underline' : ''}`}>
                  My Profile
                </span>
              </Link>
              <Link href="/app">
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-black'} mr-4 ${router.pathname === '/app' ? 'underline' : ''}`}>
                  My Wishlist
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className={`py-2 px-4 rounded-md ${darkMode ? 'bg-red-700 text-white' : 'bg-red-500 text-foreground'} hover:bg-red-600`}
              >
                Logout
              </button>
            </>
          ) : null}
          <DarkModeToggle />
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`text-2xl font-semibold cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}
          >
            ☰
          </button>
          {showMobileMenu && (
            <div className={`absolute top-0 right-0 mt-16 ${darkMode ? 'bg-gray-600' : 'bg-zinc-300'}`}>
              {user ? (
                <>
                  <Link href="/myprofile">
                    <span className={`block py-2 px-4 font-semibold ${darkMode ? 'text-white' : 'text-black'} ${router.pathname === '/myprofile' ? 'underline' : ''}`} onClick={toggleMobileMenu}>
                      My Profile
                    </span>
                  </Link>
                  <Link href="/app">
                    <span className={`block py-2 px-4 font-semibold ${darkMode ? 'text-white' : 'text-black'} ${router.pathname === '/app' ? 'underline' : ''}`} onClick={toggleMobileMenu}>
                      My Wishlist
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`block py-2 px-4 ${darkMode ? 'bg-red-700 text-white' : 'bg-red-500 text-foreground'} hover:bg-red-600`}
                  >
                    Logout
                  </button>
                </>
              ) : null}
              <DarkModeToggle />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;