import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <header>
      <nav className="p-5">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">.Task Mapper</h1>
          </div>

          <div className="space-x-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "font-semibold border-b-2 border-black" : ""
              }
            >
              Home
            </NavLink>
            {token ? (
              <>
                <button onClick={logout}>Log out</button>
              </>
            ) : (
              <>
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    isActive ? "font-semibold border-b-2 border-black" : ""
                  }
                >
                  Log in
                </NavLink>
                <NavLink
                  to={"/register"}
                  className={({ isActive }) =>
                    isActive ? "font-semibold border-b-2 border-black" : ""
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
