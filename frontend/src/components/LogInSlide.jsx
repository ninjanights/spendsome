import React, { useState } from "react";
import { useRegister } from "../contexts/RegisterContext.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice.js";

function LogInSlide() {
  const [password, setPassword] = useState("");
  const { handleLogin } = useRegister();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // handle login here.
  const handleLoginHere = async (e) => {
    e.preventDefault();
    const res = await handleLogin(password);
    if (res?.success) {
      console.log(res.data.user, "🍁");
      dispatch(
        setCredentials({
          accessToken: res.data.accessToken,
          user: res.data.user,
        })
      );
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
