import React, { useState } from "react";

import { useRegister } from "../contexts/RegisterContext.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice.js";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { handleLoginSeperate } = useRegister();

  const [emailInp, setEmailInp] = useState("");
  const [passwordInp, setPasswordInp] = useState("");

  // handle log in here.
  const handleLogInHere = async (e) => {
    e.preventDefault();
    if (!emailInp || !passwordInp) return;
    const res = await handleLoginSeperate(emailInp, passwordInp);
    if (res?.success) {
      localStorage.setItem(
        "auth",
        JSON.stringify({ token: res.data.token, user: res.data.user })
      );
      dispatch(
        setCredentials({
          user: res.data.user,
          isAuthenticated: true,
        })
      );
      navigate("/home");
    }
  };

  return (
    <div>
      <h1>Log in.</h1>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        value={emailInp}
        placeholder="Your email."
        onChange={(e) => setEmailInp(e.target.value)}
      ></input>

      <label htmlFor="pass">Password</label>
      <input
        id="pass"
        type="password"
        value={passwordInp}
        placeholder="Your password."
        onChange={(e) => setPasswordInp(e.target.value)}
      ></input>
      <button onClick={handleLogInHere}>Log in</button>
    </div>
  );
}

export default Login;
