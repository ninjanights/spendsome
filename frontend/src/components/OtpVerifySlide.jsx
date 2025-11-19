import React, { useEffect, useState } from "react";
import { useRegister } from "../contexts/RegisterContext";

function OtpVerifySlide() {
  const { form, handleVerifyOtp, handleResendOtp, time, formatted, message } =
    useRegister();

  const [otp, setOtp] = useState("");

  // handle otp submit.
  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    await handleVerifyOtp(otp);
  };

  return (
    <div>
      <div>
        <h1>Verify OTP.</h1>
        {time > 0 ? (
          <p> Resend in {formatted}</p>
        ) : (
          <button onClick={handleResendOtp}>Resend OTP</button>
        )}

        <p>{message}</p>

        <form onSubmit={handleOTPSubmit}>
          <input
            value={otp}
            type="text"
            placeholder="Place the OTP"
            onChange={(e) => setOtp(e.target.value)}
          ></input>

          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerifySlide;
