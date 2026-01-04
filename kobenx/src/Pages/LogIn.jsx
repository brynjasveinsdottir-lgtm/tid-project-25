import { useState } from "react";
import "./PageStyle.css";

import LogIn from "/src/components/authentication/LoginFlow";
import Signup from "/src/components/authentication/SignupFlow";

export default function Authentication() {
  const [loggingIn, setLoggingIn] = useState(true);

  const handleLogIn = () => setLoggingIn(true);

  const handleSignUp = () => setLoggingIn(false);

  return (
    <div className="welcome-page">
      <div>
        <h1 className="logo-welcome-page">købenx</h1>
      </div>
      <div className="selectButtonBox">
        <div
          className={`backgroundBox ${
            loggingIn ? "loginSelected" : "signupSelected"
          }`}
        />
        <button onClick={handleLogIn} className="selectButton">
          Log in
        </button>
        <button onClick={handleSignUp} className="selectButton">
          Sign up
        </button>
      </div>
      <div>{loggingIn ? <LogIn /> : <Signup />}</div>
    </div>
  );
}
