import React, { useState } from "react";
import { useRegister } from "../contexts/RegisterContext.jsx";
import { useNavigate } from "react-router-dom";

function SignUpSlide() {
  const { form, handleInputValue, handleSignup, message } = useRegister();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignup();
  };

  return (
    <div>
      <div>
        <h1>Create Account.</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            value={form.username}
            type="text"
            placeholder="Username"
            onChange={handleInputValue}
          ></input>

          <input
            name="email"
            value={form.email}
            type="email"
            placeholder="Email"
            onChange={handleInputValue}
          ></input>

          <input
            name="password"
            value={form.password}
            type="password"
            placeholder="Password"
            onChange={handleInputValue}
          ></input>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpSlide;
