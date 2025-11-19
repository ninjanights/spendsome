import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterPage from "./components/RegisterPage.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
