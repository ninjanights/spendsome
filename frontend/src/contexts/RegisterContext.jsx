import { createContext, useState, useContext } from "react";
import { signupH } from "../services/register.js";

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  // change input value.
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle signup.
  const handleSignUp = async () => {
    const res = await signupH(form);
    console.log(res, "🎏");
  };

  return (
    <RegisterContext.Provider
      value={{
        form,
        handleInputValue,
        handleSignUp,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => useContext(RegisterContext);
