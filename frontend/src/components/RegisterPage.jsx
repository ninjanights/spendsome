import React from "react";

import SignUpSlide from "./SignUpSlide.jsx";
import OtpVerifySlide from "./OtpVerifySlide.jsx";
import LogInSlide from "./LogInSlide.jsx";

import { useRegister } from "../contexts/RegisterContext.jsx";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const { step, form } = useRegister();

  const tag = {
    signuppage: "Create account.",
    otppage: `OTP sent to ${form.email}.`,
    loginpage: "You're one password away.",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-8 mb-2 text-2xl font-extrabold">Register.</h1>

      <span className="text-[10px] text-neutral-700 dark:text-neutral-300">
        {tag[step]}
      </span>
      {step === "signuppage" && <SignUpSlide />}
      {step === "otppage" && <OtpVerifySlide />}
      {step === "loginpage" && <LogInSlide />}

      <p className="flex items-baseline justify-center gap-2 align-baseline text-[12px]">
        Already have an account?
        <span
          className="cursor-pointer font-bold text-neutral-500 underline"
          onClick={() => navigate("/login")}
        >
          Log in
        </span>
      </p>
    </div>
  );
}

export default RegisterPage;
