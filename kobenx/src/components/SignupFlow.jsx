import Parse from "parse"
import { useNavigate } from "react-router"
import './AuthFlow.css'

export default function Signup() {

    async function signup(formData) {
        const username = formData.get('username')
        const password = formData.get('password')
        const user = new Parse.User()
        user.set("username", username)
        user.set("password", password)
        await user.signUp()
        await createUser(formData)
    }

    async function createUser(formData) {
        const UserPublic = Parse.Object.extend('UserPublic')
        const newUser = new UserPublic()
        const rawDate = formData.get('dateMovedToCph')
        const dateObj = new Date(rawDate)
        newUser.set('firstName', formData.get('firstName'))
        newUser.set('lastName', formData.get('lastName'))
        newUser.set('homeCountry', formData.get('homeCountry'))
        newUser.set('occupation', formData.get('occupation'))
        newUser.set('dateMovedToCph', dateObj)
        newUser.set('username', formData.get('username'))
        newUser.set('userIdPrivate', Parse.User.current())
        await newUser.save().then(
            (newObj) => {
                alert('User successfully created!' + newObj.id);
                window.location.reload()
            },
            (error) => {
                alert(error.message);
            }
        )
        
    }

    return (
        <div>
            <form className="form-box" action={signup}>
                <div className="input-row">
                    <div className="input-column">
                        <label htmlFor='firstName'> First name </label>
                        <input type='text' placeholder="Johann Friedrich" name='firstName' className="inputfield" autoFocus/>
                    </div>
                    <div className="input-column">
                        <label htmlFor='lastName'> Last name </label>
                        <input type='text' placeholder="Struensee" name='lastName' className="inputfield"/>
                    </div>
                </div>
                <div className="input-column">
                    <label htmlFor='homeCountry'> What is your home country? </label>
                    <input type='text' placeholder="Germany" name='homeCountry' className="inputfield"/>
                </div>
                <div className="input-column">
                    <label htmlFor='occupation'> What do you do? </label>
                    <input type='text' placeholder="Student at ITU" name='occupation' className="inputfield"/>
                </div>
                <div className="input-column">
                    <label htmlFor='dateMoved'> When did you move to Copenhagen? </label>
                    <input type='date' placeholder="When did you move to Copenhagen?" name='dateMovedToCph' className="inputfield"/>
                </div>
                <div className="input-column">
                    <label htmlFor='username'> Username </label>
                    <input type='username' placeholder="johann.struensee" name='username' className="inputfield"/>
                </div>
                <div className="input-column">
                    <label htmlFor='password'> Password </label>
                    <input type='password' placeholder="password" name='password' className="inputfield" autoComplete="new-password"/>
                </div>
                <button type="submit" value='submit' className="authButton">Sign up</button>
            </form>
        </div>
    );
}