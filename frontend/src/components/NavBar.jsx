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

  const handleLogOutHere = async () => {
    const res = await handleLogOut();
    if (res?.data?.success) {
      dispatch(logout());
      navigate("/home");
    }
  };

  return (
    <div
      className="w-full bg-neutral-300 dark:bg-neutral-800 text-neutral-900 gap-2
     dark:text-neutral-300 px-6 py-3 flex justify-between items-center text-[10px]
     text-center md:text-small"
    >
      <ul className="flex">
        <li>
          <NavLink
            to="/home"
            end
            className={({ isActive }) => `
                ${isActive ? "text-yellow-500" : ""}`}
          >
            Spend some.
          </NavLink>
        </li>
      </ul>

      <ul className="flex gap-2 md:gap-4 font-bold">
        <li>
          <NavLink
            to="/home"
            end
            className={({ isActive }) => `
                ${isActive ? "text-yellow-500 font-black" : ""}`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => `
                ${isActive ? "text-yellow-500 font-black" : ""}`}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
            end
            className={({ isActive }) => `
                ${isActive ? "text-yellow-500 font-black" : ""}`}
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
              className="w-4 h-4 block"
              src={theme === "dark" ? "/sunyes.svg" : "/moonyes.svg"}
            ></img>
          </button>
        </li>
      </ul>

      <ul className="flex gap-2">
        {!isLoggedIn ? (
          <ul className="flex gap-1 md:gap-4">
            <li>
              <NavLink
                to="/register"
                end
                className={({ isActive }) => `
                ${isActive ? " text-yellow-500" : ""}`}
              >
                Sign up
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                end
                className={({ isActive }) => `
                ${isActive ? "text-yellow-500 " : ""}`}
              >
                Log in
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <button
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
