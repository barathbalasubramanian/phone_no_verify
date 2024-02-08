
import React, { useState } from 'react'
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import NumberCom from "../components/otp/numberCom";
import Verify from "../components/otp/Verify";


const Authph = () => {

    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(true);
    const [user, setUser] = useState(null);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);
  
    function onCaptchVerify() {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              onSignup();
            },
            "expired-callback": () => {},
          },
          auth
        );
      }
    }
  
    function onSignup() {
      setLoading(true);
      onCaptchVerify();
  
      const appVerifier = window.recaptchaVerifier;
  
      const formatPh = "+" + ph;
  
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sended successfully!");
        })
        .catch((error) => {
          console.log(error.message);
          if (
            error.code === "auth/invalid-phone-number" &&
            error.message.includes("TOO_SHORT")
          ) {
            console.error("Invalid phone number: Too short.");
            toast.error("Invalid Number");
          } else {
            console.error("Firebase authentication error:", error.message);
          }
          setLoading(false);
        });
    }
  
    function onOTPVerify() {
      setLoading(true);
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          console.log(res);
          setUser(res.user);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("Otp verification Failed");
          setLoading(false);
        });
    }
  
    function startResendTimer() {
      setResendDisabled(true);
      let timer = 30;
      const intervalId = setInterval(() => {
        timer -= 1;
        setCountdown(timer);
        if (timer === 0) {
          clearInterval(intervalId);
          setResendDisabled(false);
          setCountdown(30);
        }
      }, 1000);
    }
  
    function onResendOTP() {
      // onCaptchVerify();
      const formatPh = "+" + ph;
      console.log(formatPh);
      signInWithPhoneNumber(auth, formatPh, window.recaptchaVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setShowOTP(true);
          toast.success("OTP resent successfully!");
          startResendTimer();
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("Invalid Phone Number");
        });
    }


    return (
    <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <Verify 
                otp={otp}
                setOtp={setOtp}
                onOTPVerify={onOTPVerify}
                resendDisabled={resendDisabled}
                loading={loading}
                countdown={countdown}
                onResendOTP={onResendOTP}
              />
            ) : (
              <NumberCom
                ph={ph}
                setPh={setPh}
                onSignup={onSignup}
                loading={loading}
              />
            )}
          </div>
        )}
      </div>
  )
}

export default Authph
