import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import the router
import UserContext from "@/contexts/user";
import { removeUser } from "@/utils/user"; // Import your removeUser function

const Header = () => {
  const [user] = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      removeUser();
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(user);

  return (
    <header className="py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-primary text-2xl font-semibold cursor-pointer">
            ShareWish
          </div>
        </Link>
        <nav>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-red hover:underline cursor-pointer"
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
