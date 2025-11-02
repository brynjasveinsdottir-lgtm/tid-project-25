import React from "react";
import {useEffect, useState} from 'react'
import Parse from "parse"

export default function LogIn() {

    async function publish(formData) {
        const username1 = formData.get('username')
        const password1 = formData.get('password')
        const user = await Parse.User.logIn(`${username1}`, `${password1}`)
        window.location.reload()
    }

    return (
        <div>
            <div>
                <h1>
                    Log-in Page
                </h1>
            </div>
            <form className="input-fields" action={publish}>
                <input type='username' placeholder="Username" name='username' />
                <input type='password' placeholder="Password" name='password' />
                <button type="submit" value='submit'>Log-In</button>
            </form>
        </div>
    );
}