import React, { useState, useEffect } from "react"
import Parse from "parse"
import './CardStyle.css'
import { getUserPublic } from "./Services/userService"


export default function EventSignupButton({ event, refreshSignups }) {

    const [isSignedUp, setIsSignedUp] = useState(false)

    async function eventSignup() {
        
        const Signups = Parse.Object.extend('Signups')
        const publicUser = await getUserPublic()

        alert(event)
        
        if (isSignedUp === false) {
            const newSignup = new Signups()
            newSignup.set('user', publicUser)
            newSignup.set('post', event)
            
            await newSignup.save().then(
                (newObj) => {
                    alert("You're signed up for " + newObj.id)
                },
                (error) => {
                    alert(error.message)
                }
            )
            refreshSignups()
            setIsSignedUp(true)
        } else {
            const query = new Parse.Query(Signups)
            query.equalTo('user', publicUser)
            query.equalTo('post', event)
            const signupItem = await query.find()
            await signupItem.destroy({}).then(
                (newObj) => {
                    alert("You've removed your sign up for " + newObj.id)
                },
                (error) => {
                    alert(error.message)
                }
            )
            refreshSignups()
            setIsSignedUp(false)
        }
    }


    return (
        <button className={`event-signup-button ${isSignedUp ? 'signed-up' : 'not-signed-up'}`} onClick={eventSignup}>
            Sign up
        </button>
    )
}