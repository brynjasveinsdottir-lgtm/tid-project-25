import Parse from "parse"
import './AuthFlow.css'

export default function LogIn() {

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
                    <input type='username' placeholder="Username" name='username' className="inputfield"/>
                </div>
                <div className="input-column login">
                    <label htmlFor='password'> Password </label>
                    <input type='password' placeholder="Password" name='password' className="inputfield"/>
                </div>
                <button type="submit" value='submit' className="authButton">Log-In</button>
            </form>
        </div>
    );
}