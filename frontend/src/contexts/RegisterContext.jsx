import { createContext, useState, useContext } from "react";
import { signupH, verifyOtpH } from "../services/register.js";

import useTimer from "../services/useTimer.js";

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
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

    await resendOtpH(form?.email);
    reset();
  };

  // handle log in.
  const handleLogin = async (password) => {

  
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
        setStep,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => useContext(RegisterContext);
