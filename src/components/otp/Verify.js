
import React from 'react'
import { BsFillShieldLockFill } from 'react-icons/bs'
import OtpInput from "otp-input-react";
import { CgSpinner } from 'react-icons/cg';

function Verify({otp,setOtp,onOTPVerify,resendDisabled,loading,countdown,onResendOTP}) {
  return (
      <>
        <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
          <BsFillShieldLockFill size={30} />
        </div>
        <label
          htmlFor="otp"
          className="font-bold text-xl text-white text-center"
        >
          Enter your OTP
        </label>
        <OtpInput
          value={otp}
          onChange={setOtp}
          OTPLength={6}
          otpType="number"
          disabled={false}
          autoFocus
          className="opt-container "
        ></OtpInput>
        <button
          onClick={onOTPVerify}
          className={`w-full flex gap-1 items-center justify-center py-2.5 rounded ${
            otp.length === 6 && !loading
              ? 'bg-emerald-600 text-white cursor-pointer'
              : 'bg-emerald-400 text-white cursor-not-allowed'
          }`}
          disabled={otp.length !== 6 || loading}
        >
          {loading && (
            <CgSpinner size={20} className="mt-1 animate-spin" />
          )}
          <span>Verify OTP</span>
        </button>
        <button
          onClick={onResendOTP}
          className={`w-full flex gap-1 items-center justify-center py-2.5 rounded ${
            resendDisabled
              ? 'bg-emerald-400 text-white cursor-not-allowed'
              : 'bg-emerald-600 text-white cursor-pointer'
          }`}
          disabled={resendDisabled}
        >
          <span>Resend OTP</span>
          {resendDisabled && (
            <span className="text-sm text-gray-400 ml-2">
              (Wait for {countdown}s)
            </span>
          )}
        </button>
      </>
  )
}

export default Verify
