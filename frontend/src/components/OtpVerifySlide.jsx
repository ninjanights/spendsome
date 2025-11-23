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
    <div className="flex flex-col items-center justify-center text-neutral-800 dark:text-neutral-400">
      <div className="flex flex-col items-center">
        <h1 className="mt-6 text-2xl font-extrabold">Verify OTP.</h1>
        {time > 0 ? (
          <p className="py-2 text-[12px]"> Resend in {formatted}</p>
        ) : (
          <button
            className="m-0 my-4 cursor-pointer rounded border-none bg-blue-900 p-0 px-3 py-2 font-bold text-neutral-300 outline-none hover:bg-blue-800 focus:outline-none"
            onClick={handleResendOtp}
          >
            Resend OTP
          </button>
        )}

        <p className="mb-6 text-center text-sm">
          {time > 0
            ? message
            : "Time expired now you need to ask for another otp."}
        </p>

        {time > 0 && (
          <form
            className="flex flex-col items-center gap-2"
            onSubmit={handleOTPSubmit}
          >
            <div className="align-center flex items-center justify-between gap-2">
              <label htmlFor="otp" className="text-[12px] font-bold">
                Your OTP
              </label>
              <div className="align-center flex items-center gap-2">
                <div className="h-20 w-[1px] bg-neutral-600"></div>
                <input
                  id="otp"
                  value={otp}
                  type="text"
                  placeholder="Place the OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-small h-12 w-50 rounded border-none bg-neutral-400 px-2 py-1 text-black outline-none select-none focus:border-none focus:ring-0 focus:outline-none"
                ></input>
              </div>
            </div>

            <button
              className="m-0 my-8 cursor-pointer rounded border-none bg-blue-900 p-0 px-3 py-2 font-bold text-neutral-300 outline-none hover:bg-blue-800 focus:outline-none"
              type="submit"
            >
              Verify
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default OtpVerifySlide;
