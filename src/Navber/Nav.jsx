import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/Context";
import logo from "../assets/logo.jpg";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="sticky top-0 z-50">
      <div className="w-full mx-auto">
        <div className="navbar  bg-white/30 backdrop-blur-md">
          <div className="w-11/12 mx-auto">
            <div className="navbar">
              <div className="navbar-start">
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost lg:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                      <NavLink to="#features">features</NavLink>
                    </li>

                    {user && (
                      <>
                        <li>
                          <Link className="justify-between" to="/profile">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <a href="#tutors"> Tutors</a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <img src={logo} className="w-20 rounded-lg" alt="" />
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <a href="#features"> features</a>
                  </li>
                  {user && (
                    <>
                      <li>
                        <Link className="justify-between" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <a href="#tutors"> Tutors</a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="navbar-end mr-3">
                {user ? (
                  <button onClick={logout} className="btn">
                    Logout
                  </button>
                ) : (
                  <Link className="btn" to="/login">
                    Login
                  </Link>
                )}
              </div>
              {user && (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoURL}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link className="justify-between" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
