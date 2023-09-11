import { useContext, useEffect } from "react";
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

  useEffect(() => {}, [user]);

  const handleLogout = async () => {
    try {
      removeUser(window);
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <header className={`py-4 ${darkMode ? 'bg-gray-600' : 'bg-zinc-300'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className={`text-2xl font-semibold cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>
            <span style={{ color: "black" }}>ShareWish</span>
          </div>
        </Link>
        <nav>
          {user ? (
            <>
              <Link href="/myprofile">
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-black'} mr-4`}>My Profile</span>
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
        </nav>
      </div>
    </header>
  );
};

export default Header;