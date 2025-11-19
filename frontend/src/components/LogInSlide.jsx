import React, { useState } from "react";
import { useRegister } from "../contexts/RegisterContext.jsx";
import { useNavigate } from "react-router-dom";

function LogInSlide() {
  const [password, setPassword] = useState("");
  const { handleLogin } = useRegister();

  const navigate = useNavigate();

  // handle login here.
  const handleLoginHere = async (e) => {
    e.preventDefault();
    const res = await handleLogin(password);
    if (res?.success) {
      navigate("/home");
    }
  };

  return (
    <div>
      <h1>Log in.</h1>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        type="password"
      ></input>
      <button onClick={(e) => handleLoginHere(e)}>Log in</button>
    </div>
  );
}

export default LogInSlide;
