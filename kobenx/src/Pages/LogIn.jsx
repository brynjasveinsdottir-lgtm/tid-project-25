import React from "react";
import {useEffect, useState} from 'react'
import Parse from "parse"
import { NavLink } from "react-router";
import LogIn from '/src/components/LoginFlow'
import Signup from '/src/components/SignupFlow'
import './PageStyle.css'

export default function Authentication() {

    const [hasAccount, setHasAccount] = useState(true)

    const handleHasAccount = () => setHasAccount(!hasAccount)

    
    return (
        <div className="welcome-page">
            <div>
                <h1 className="logo-welcome-page">
                    købenx
                </h1>
            </div>
            <div>
                <button onClick={handleHasAccount}>
                    {hasAccount? 'Log in': 'Sign up'}
                </button>
                {hasAccount? <LogIn /> : <Signup />}
            </div>
        </div>
    );
}