import Parse from "parse";  
import LogIn from "./Pages/LogIn";
  
export default function RequireAuth({children}) {  
    const currentUser = Parse.User.current();  
    
    if (!currentUser) {  
        return <LogIn />;  
    }  
  
    return children;  
}