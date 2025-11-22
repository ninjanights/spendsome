import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../store/authSlice.js";
import { useRegister } from "../contexts/RegisterContext.jsx";

function NavBar() {
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
    <div className="flex bg-gray-500">
      <ul>
        <li>
          <NavLink
            to="/home"
            end
            className={({ isActive }) => {
              isActive ? "activeNavLink" : "";
            }}
          >
            Spend some.
          </NavLink>
        </li>
      </ul>

      <ul>
        <li>
          <NavLink
            to="/home"
            end
            className={({ isActive }) => {
              isActive ? "activeNavLink" : "";
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => {
              isActive ? "activeNavLink" : "";
            }}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
            end
            className={({ isActive }) => {
              isActive ? "activeNavLink" : "";
            }}
          >
            Events
          </NavLink>
        </li>
      </ul>

      <ul>
        {!isLoggedIn ? (
          <ul>
            <li>
              <NavLink
                to="/register"
                end
                className={({ isActive }) => {
                  isActive ? "activeNavLink" : "";
                }}
              >
                Sign up
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                end
                className={({ isActive }) => {
                  isActive ? "activeNavLink" : "";
                }}
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
