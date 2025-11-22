import { createContext, useState, useContext } from "react";
import { signupH, verifyOtpH, loginH, logoutH } from "../services/register.js";

import useTimer from "../services/useTimer.js";

export const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [step, setStep] = useState("signuppage");

  const { time, formatted, start, reset } = useTimer();

  // change input value.
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle signup.
  const handleSignup = async () => {
    const res = await signupH(form);
    setMessage(res?.data?.message);
    if (res.data.success) {
      start();
      setStep("otppage");
    }
  };

  // handle Verify Otp
  const handleVerifyOtp = async (otp) => {
    const res = await verifyOtpH(form.email, otp);

    if (res.data.success) {
      setStep("loginpage");
    } else {
      setMessage(res.data?.message);
    }
  };

  // handle resend otp.
  const handleResendOtp = async () => {
    if (time > 0) return;
    await signupH(form);
    reset();
  };

  // handle log in.
  const handleLogin = async (pass) => {
    const res = await loginH(form.email, pass);
    return res;
  };

  // handle log (in seperate)
  const handleLoginSeperate = async (email, pass) => {
    const res = await loginH(email, pass);
    return res;
  };

  // handle Log out.
  const handleLogOut = async () => {
    const res = await logoutH();
    return res;
  };

  return (
    <RegisterContext.Provider
      value={{
        form,
        step,
        message,
        time,
        formatted,

        handleInputValue,
        handleSignup,
        handleVerifyOtp,
        handleResendOtp,
        handleLogin,
        handleLoginSeperate,
        setStep,
        handleLogOut,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => useContext(RegisterContext);

// Default export for the provider
export default RegisterProvider;
