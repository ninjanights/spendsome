import React, { useState } from "react";
import { useRegister } from "../contexts/RegisterContext.jsx";

function Register() {
  const { form, handleInputValue, handleSignUp } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignUp();
  };

  return (
    <div>
      <h1>Sign up</h1>
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
  );
}

export default Register;
