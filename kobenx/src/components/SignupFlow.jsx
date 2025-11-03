import Parse from "parse"

export default function Signup() {

    async function signup(formData) {
        const username = formData.get('username')
        const password = formData.get('password')
        const user = new Parse.User();
        user.set("username", username);
        user.set("password", password);

        //ACL
        const acl = new Parse.ACL();
        acl.setPublicReadAccess(true);
        acl.setPublicWriteAccess(true);


        user.setACL(acl);

        try {
            await user.signUp();
            console.log("User signed up successfully!");
          } catch (error) {
            console.error("Error signing up user:", error);
          }
        
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
        newUser.save()
        alert ('User successfully created!')
        window.location.reload()
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