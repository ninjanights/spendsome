import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterPage from "./components/RegisterPage.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
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
