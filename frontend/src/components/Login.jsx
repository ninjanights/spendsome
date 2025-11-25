import React, { useEffect, useState } from "react";

import { useRegister } from "../contexts/RegisterContext.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice.js";

import * as Yup from "yup";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { handleLoginSeperate } = useRegister();
  const [emailInp, setEmailInp] = useState("");
  const [passwordInp, setPasswordInp] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const emailFormat = Yup.string().email("Invalid email format.");

  useEffect(() => {
    if (loginMessage) {
      const timeout = setTimeout(() => setLoginMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [loginMessage]);

  // handle imput change.
  const handleChange = async (e) => {
    e.preventDefault();
    const val = e.target.value;
    setEmailInp(val);
  };

  // debounce for email valid.
  useEffect(() => {
    if (!emailInp) {
      setLoginMessage("");
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        await emailFormat.validate(emailInp);
        setLoginMessage("");
      } catch (e) {
        setLoginMessage(e.message);
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [emailInp]);

  // handle log in here.
  const handleLogInHere = async (e) => {
    e.preventDefault();
    if (!emailInp) {
      setLoginMessage("Please place your email.");
      return;
    } else if (!passwordInp) {
      setLoginMessage("Please place your password.");
      return;
    }

    const res = await handleLoginSeperate(emailInp, passwordInp);
    setLoginMessage(res.message);

    if (res?.success) {
      localStorage.setItem(
        "auth",
        JSON.stringify({ token: res.data.token, user: res.data.user }),
      );
      dispatch(
        setCredentials({
          user: res.data.user,
          isAuthenticated: true,
        }),
      );
      navigate("/home");
    }
  };

  return (
    <div className="align-start flex flex-col items-center text-neutral-800 dark:text-neutral-400">
      <h1 className="my-6 text-2xl font-extrabold">Log in.</h1>

      <p
        className={`mb-10 text-xs transition-opacity duration-700 ease-in-out ${
          loginMessage ? "opacity-100" : "opacity-0"
        }`}
      >
        {loginMessage}
      </p>

      <div className="flex flex-col items-end gap-2">
        <div className="align-center flex items-center justify-between gap-2">
          <label htmlFor="email" className="text-[12px] font-bold">
            Email
          </label>
          <div className="align-center flex items-center gap-2">
            <div className="h-20 w-[1px] bg-neutral-600"></div>
            <input
              id="email"
              type="text"
              value={emailInp}
              placeholder="Your email."
              onChange={handleChange}
              className="text-small h-12 w-50 rounded border-none bg-neutral-400 px-2 py-1 text-black outline-none select-none focus:border-none focus:ring-0 focus:outline-none"
            ></input>
          </div>
        </div>
        <div className="align-center flex items-center justify-between gap-2">
          <label htmlFor="pass" className="text-[12px] font-bold">
            Password
          </label>
          <div className="align-center flex items-center gap-2">
            <div className="h-20 w-[1px] bg-neutral-600"></div>
            <input
              id="pass"
              type="password"
              value={passwordInp}
              placeholder="Your password."
              onChange={(e) => setPasswordInp(e.target.value)}
              className="text-small h-12 w-50 rounded border-none bg-neutral-400 px-2 py-1 text-black outline-none select-none focus:border-none focus:ring-0 focus:outline-none"
            ></input>
          </div>
        </div>
      </div>
      <button
        className="m-0 my-8 cursor-pointer rounded border-none bg-blue-900 p-0 px-3 py-2 font-bold text-neutral-300 outline-none hover:bg-blue-800 focus:outline-none"
        onClick={handleLogInHere}
      >
        Log in
      </button>
      <p className="flex items-baseline justify-center gap-2 align-baseline text-[12px]">
        Don't have an account?
        <span
          className="cursor-pointer font-bold text-neutral-500 underline"
          onClick={() => navigate("/register")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;
