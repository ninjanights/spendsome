import React from "react";

import SignUpSlide from "./SignUpSlide.jsx";
import OtpVerifySlide from "./OtpVerifySlide.jsx";
import LogInSlide from "./LogInSlide.jsx";

import { useRegister } from "../contexts/RegisterContext.jsx";

function RegisterPage() {
  const { step } = useRegister();



  return (
    <div>
      <p>Register.</p>
      {step === "signuppage" && <SignUpSlide />}
      {step === "otppage" && <OtpVerifySlide />}
      {step === "loginpage" && <LogInSlide />}
    </div>
  );
}

export default RegisterPage;
