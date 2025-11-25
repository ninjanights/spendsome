import React, { useState, useEffect } from "react";
import { useRegister } from "../contexts/RegisterContext.jsx";

import * as Yup from "yup";

function SignUpSlide() {
  const { form, handleInputValue, handleSignup } = useRegister();
  const [sUMessage, setSUMessage] = useState("");

  const emailFormat = Yup.string().email("Invalid email format.");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.username || !form.password) {
      setSUMessage("Some fields may needs to be filled.");
      return;
    }
    const res = await handleSignup();
    console.log(res, "llll");
    setSUMessage(res?.message || res?.data?.message);
  };

  useEffect(() => {
    if (sUMessage) {
      const timeout = setTimeout(() => setSUMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [sUMessage]);

  useEffect(() => {
    if (!form?.email) {
      setSUMessage("");
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        await emailFormat.validate(form?.email);
        setSUMessage("");
      } catch (e) {
        setSUMessage(e.message);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [form?.email]);

  return (
    <div className="align-start flex flex-col items-center text-neutral-800 dark:text-neutral-400">
      <p
        className={`mb-10 text-xs transition-opacity duration-700 ease-in-out ${
          sUMessage ? "opacity-100" : "opacity-0"
        }`}
      >
        {sUMessage}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-end gap-2">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-end gap-2">
            <div className="align-center flex items-center justify-between gap-2">
              <label htmlFor="username" className="text-[12px] font-bold">
                Username
              </label>
              <div className="align-center flex items-center gap-2">
                <div className="h-20 w-[1px] bg-neutral-600"></div>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  type="text"
                  placeholder="Username"
                  onChange={handleInputValue}
                  className="text-small h-12 w-50 rounded border-none bg-neutral-400 px-2 py-1 text-black outline-none select-none focus:border-none focus:ring-0 focus:outline-none"
                ></input>
              </div>
            </div>
            <div className="align-center flex items-center justify-between gap-2">
              <label htmlFor="email" className="text-[12px] font-bold">
                Email
              </label>
              <div className="align-center flex items-center gap-2">
                <div className="h-20 w-[1px] bg-neutral-600"></div>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  type="text"
                  placeholder="Email"
                  onChange={handleInputValue}
                  className="text-small h-12 w-50 rounded border-none bg-neutral-400 px-2 py-1 text-black outline-none select-none focus:border-none focus:ring-0 focus:outline-none"
                ></input>
              </div>
            </div>
            <div className="align-center flex items-center justify-between gap-2">
              <label htmlFor="password" className="text-[12px] font-bold">
                Password
              </label>
              <div className="align-center flex items-center gap-2">
                <div className="h-20 w-[1px] bg-neutral-600"></div>
                <input
                  id="password"
                  name="password"
                  value={form.password}
                  type="password"
                  placeholder="Password"
                  onChange={handleInputValue}
                  className="text-small h-12 w-50 rounded border-none bg-neutral-400 px-2 py-1 text-black outline-none select-none focus:border-none focus:ring-0 focus:outline-none"
                ></input>
              </div>
            </div>
          </div>
          <button
            className="m-0 my-8 cursor-pointer rounded border-none bg-blue-900 p-0 px-3 py-2 font-bold text-neutral-300 outline-none hover:bg-blue-800 focus:outline-none"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpSlide;
