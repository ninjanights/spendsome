import React, { useState } from "react";
import { useRegister } from "../contexts/RegisterContext.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice.js";

function LogInSlide() {
  const [password, setPassword] = useState("");
  const { handleLogin, form } = useRegister();
  const [loginSMessage, setLoginSMessage] = useState(second);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginSMessage) {
      const timeout = setTimeout(() => setLoginSMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [loginSMessage]);

  // handle login here.
  const handleLoginHere = async (e) => {
    e.preventDefault();
    const res = await handleLogin(password);
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
          loginSMessage ? "opacity-100" : "opacity-0"
        }`}
      >
        {loginSMessage}
      </p>

      <p>{form && form?.username}</p>
      <p>{form && form?.email}</p>

      <div className="flex flex-col items-end gap-2">
        <div className="align-center flex items-center justify-between gap-2">
          <label htmlFor="pass" className="text-[12px] font-bold">
            Password
          </label>
          <div className="align-center flex items-center gap-2">
            <div className="h-20 w-[1px] bg-neutral-600"></div>
            <input
              id="pass"
              type="password"
              value={password}
              placeholder="Your password."
              onChange={(e) => setPassword(e.target.value)}
              className="text-small h-12 w-50 rounded border-none bg-neutral-400 px-2 py-1 text-black outline-none select-none focus:border-none focus:ring-0 focus:outline-none"
            ></input>
          </div>
        </div>
      </div>
      <button
        className="m-0 my-8 cursor-pointer rounded border-none bg-blue-900 p-0 px-3 py-2 font-bold text-neutral-300 outline-none hover:bg-blue-800 focus:outline-none"
        onClick={handleLoginHere}
      >
        Log in
      </button>
    </div>
  );
}

export default LogInSlide;
