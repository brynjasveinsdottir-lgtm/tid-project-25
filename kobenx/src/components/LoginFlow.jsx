import Parse from "parse"
import './AuthFlow.css'
import { useState } from "react"

export default function LogIn() {

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isFilled, setIsFilled] = useState({
        username: false,
        password: false
    })

    function handleFilled(e) {
        const newValue = e.target.value
        const fieldName = e.target.name

        setIsFilled(prev => {
            const updated = {
                ...prev,
                [fieldName]: newValue.length > 0
            }

            if (updated.username && updated.password) {
                setIsButtonDisabled(false)
            } else {
                setIsButtonDisabled(true)
            }

            return updated
        })
    }

    async function login(formData) {
        const username1 = formData.get('username')
        const password1 = formData.get('password')
        const user = await Parse.User.logIn(`${username1}`, `${password1}`)
        window.location.reload()
    }

    return (
        <div>
            <form className="form-box" action={login}>
                <div className="input-column login">
                    <label htmlFor='username'> Username </label>
                    <input type='username' placeholder="Username" name='username' className='inputfield' onInput={handleFilled}/>
                </div>
                <div className="input-column login">
                    <label htmlFor='password'> Password </label>
                    <input type='password' placeholder="Password" name='password' className="inputfield" onInput={handleFilled}/>
                </div>
                <button title={isButtonDisabled ? 'Enter Username & Password first' : 'Click me to log in!'} type="submit" value='submit' className={isButtonDisabled ? 'disabledButton' : 'enabledButton'} disabled={isButtonDisabled}>Log-In</button>
            </form>
        </div>
    );
}