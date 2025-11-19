import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterPage from "./components/RegisterPage.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/home" element={<Home/>}></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
