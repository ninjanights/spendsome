import React from "react";

import SignUpSlide from "./SignUpSlide.jsx";
import OtpVerifySlide from "./OtpVerifySlide.jsx";
import LogInSlide from "./LogInSlide.jsx";

import { useRegister } from "../contexts/RegisterContext.jsx";

function RegisterPage() {
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
    </div>
  );
}

export default RegisterPage;
