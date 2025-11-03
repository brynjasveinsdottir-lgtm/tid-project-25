import Parse from "parse"

export default function Signup() {

    async function signup(formData) {
        const username1 = formData.get('username')
        const password1 = formData.get('password')
        await Parse.User.signUp(`${username1}`, `${password1}`)
        await createUser(formData)
        console.log('User created')
    }

    async function createUser(formData) {
        alert('Create user started')
        const UserPublic = Parse.Object.extend('UserPublic')
        const newUser = new UserPublic()
        console.log('After creating new object')
        newUser.set('firstName', formData.get('firstName'))
        newUser.set('lastName', formData.get('lastName'))
        newUser.set('homeCountry', formData.get('homeCountry'))
        newUser.set('occupation', formData.get('occupation'))
        newUser.set('dateMovedToCph', formData.get('dateMovedToCph'))
        console.log('After adding basic info')
        newUser.set('userIdPrivate', Parse.User.current().id)
        console.log('After adding id')
        alert('Create user finished')
    }

    return (
        <div>
            <form className="input-fields" action={signup}>
                <label htmlFor='firstName'> First name </label>
                <input type='text' placeholder="First Name" name='firstName' />
                <label htmlFor='lastName'> Last name </label>
                <input type='text' placeholder="Last Name" name='lastName' />
                <label htmlFor='homeCountry'> What is your home country? </label>
                <input type='text' placeholder="Home Country" name='homeCountry' />
                <label htmlFor='occupation'> What do you do? </label>
                <input type='text' placeholder="Occupation" name='occupation' />
                <label htmlFor='dateMoved'> When did you move to Copenhagen? </label>
                <input type='date' placeholder="When did you move to " name='dateMovedToCph' />
                <input type='username' placeholder="Username" name='username' />
                <input type='password' placeholder="Password" name='password' />
                <button type="submit" value='submit'>Sign-up</button>
            </form>
        </div>
    );
}