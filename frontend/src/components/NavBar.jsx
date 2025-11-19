import React from "react";

import { useNavigate, NavLink } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
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
        {!activeUser ? (
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
              <NavLink
                to="/login"
                end
                className={({ isActive }) => {
                  isActive ? "activeNavLink" : "";
                }}
              >
                Log out
              </NavLink>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
