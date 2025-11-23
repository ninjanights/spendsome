import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../store/authSlice.js";
import { useRegister } from "../contexts/RegisterContext.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";

function NavBar() {
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();
  const { handleLogOut } = useRegister();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const usernameG = useSelector((state) => state.auth.user?.username);

  const handleLogOutHere = async () => {
    const res = await handleLogOut();
    if (res?.data?.success) {
      dispatch(logout());
      navigate("/home");
    }
  };

  return (
    <div className="md:text-small flex w-full items-center justify-between gap-2 bg-neutral-300 px-6 py-3 text-center text-[10px] text-neutral-900 dark:bg-neutral-800 dark:text-neutral-300">
      <ul className="flex">
        <li>
          <NavLink
            to="/home"
            end
            className={({ isActive }) => ` ${isActive ? "text-blue-900" : ""}`}
          >
            Spend some.
          </NavLink>
        </li>
      </ul>

      <ul className="flex gap-2 font-bold md:gap-4">
        <li>
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              ` ${isActive ? "font-black text-blue-900" : ""}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              ` ${isActive ? "font-black text-blue-900" : ""}`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
            end
            className={({ isActive }) =>
              ` ${isActive ? "font-black text-blue-900" : ""}`
            }
          >
            Events
          </NavLink>
        </li>

        <li className="flex items-center justify-center">
          <button
            className="flex items-center justify-center"
            onClick={toggleTheme}
          >
            <img
              onClick={toggleTheme}
              className="block h-4 w-4"
              src={theme === "dark" ? "/sunyes.svg" : "/moonyes.svg"}
            ></img>
          </button>
        </li>
      </ul>

      <ul className="flex items-center justify-center gap-2 align-middle">
        {!isLoggedIn ? (
          <ul className="flex items-center justify-center gap-2 align-middle">
            <li className="font-bold">
              <NavLink
                to="/register"
                end
                className={({ isActive }) =>
                  ` ${isActive ? " text-blue-900" : ""}`
                }
              >
                Sign up
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/login"
                end
                className={({ isActive }) =>
                  ` ${isActive ? "text-blue-900" : ""}`
                }
              >
                Log in
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center justify-center gap-2 align-middle">
            <li className="text-sm text-neutral-500">{`@${usernameG}`}</li>
            <li>
              <button
                className="m-0 cursor-pointer rounded border-none bg-blue-900 p-0 px-3 py-2 font-bold text-neutral-300 outline-none hover:bg-blue-800 focus:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogOutHere();
                }}
              >
                Log out
              </button>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
