import React from "react";
import {useEffect, useState} from 'react'
import Parse from "parse"
import { NavLink } from "react-router";
import LogIn from '/src/components/LoginFlow'
import Signup from '/src/components/SignupFlow'

export default function Authentication() {

    const [hasAccount, setHasAccount] = useState(true)

    const handleHasAccount = () => setHasAccount(!hasAccount)


    return (
        <div>
            <div>
                <h1>
                    købenx
                </h1>
            </div>
            <button onClick={handleHasAccount}>
                {hasAccount? 'Log-In': 'Sign-Up'}
            </button>
            {hasAccount? <LogIn /> : <Signup />}
        </div>
    );
}