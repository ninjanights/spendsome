import React from "react";
import { useSelector } from "react-redux";
import { AddExpFrom } from "./expense/AddExpForm";

function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return !isAuthenticated ? (
    <div className="">
      <AddExpFrom />
    </div>
  ) : (
    <p>Login</p>
  );
}

export default Home;
