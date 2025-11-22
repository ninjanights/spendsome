import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import RegisterPage from "./components/RegisterPage.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NavBar from "./components/NavBar.jsx";

import { useDispatch, useSelector } from "react-redux";
import { setAuthFromLStorage, logout } from "./store/authSlice.js";
import { useContext, useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth) {
      dispatch(logout());
    }
    try {
      dispatch(
        setAuthFromLStorage({
          user: auth.user,
          isAuthenticated: auth?.token ? true : false,
        })
      );
    } catch (e) {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen items-center justify-center 
    bg-neutral-300 dark:bg-neutral-800 text-neutral-200">
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/register"
            element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/home" />}
          ></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/home" />}
          ></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
