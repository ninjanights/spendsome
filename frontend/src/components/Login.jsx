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
    <div className="flex flex-col align-start items-center text-neutral-800">
      <h1 className="text-2xl font-extrabold my-6">Log in.</h1>
      <div className="flex-col flex gap-2 items-between">
        <div className="flex gap-2 align-center items-center justify-between">
          <label htmlFor="email" className="text-[12px] font-bold">
            Email
          </label>
          <div className="flex gap-2 align-center items-center">
            <div className="h-15 bg-neutral-600 w-[1px]"></div>
            <input
              id="email"
              type="text"
              value={emailInp}
              placeholder="Your email."
              onChange={(e) => setEmailInp(e.target.value)}
              className=" rounded border-none outline-none focus:outline-none  focus:ring-0 
                          focus:border-none select-none text-black py-1 px-2 text-[12px]"
            ></input>
          </div>
        </div>
        <div className="flex gap-2 align-center items-center justify-between">
          <label htmlFor="pass" className="text-[12px] font-bold">
            Password
          </label>
          <div className="flex gap-2 align-center items-center">
            <div className="h-15 bg-neutral-600 w-[1px]"></div>
            <input
              id="pass"
              type="password"
              value={passwordInp}
              placeholder="Your password."
              onChange={(e) => setPasswordInp(e.target.value)}
              className=" rounded border-none outline-none focus:outline-none  focus:ring-0 
                          focus:border-none select-none text-black py-1 px-2 text-[12px]"
            ></input>
          </div>
        </div>
      </div>
      <button className="" onClick={handleLogInHere}>
        Log in
      </button>
    </div>
  );
}

export default Login;
