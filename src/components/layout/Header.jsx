import { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import the router
import UserContext from "@/contexts/user";
import { removeUser } from "@/utils/user"; // Import your removeUser function

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

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
    <header className="py-4 bg-zinc-300">
      <div className="container mx-auto flex justify-between items-center bg-zinc-300">
        <Link href="/">
          <div className="text-primary text-2xl font-semibold cursor-pointer">
            <span style={{ color: "black" }}>ShareWish</span>
          </div>
        </Link>
        <nav>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-foreground py-2 px-4 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Header;
