import React,{ useState } from "react";
import { authService } from "../fblnstance";

const inputStyles = {}

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword]=useState("");
    const [error, setError] = useState("");
    const [newAccount,setNewAccount]=useState(true);

    const onChange = (event) => {
        console.log(event.target.name)
        const {target : {name,value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name==="password"){
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){//create account
                data = await authService.createUserWithEmailAndPassword(
                    email, 
                    password
                    );//promise가 있어서 await을 써줬대
            } else{//log in
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                    );
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => {
        return !prev; //(prev)=>!prev 랑 같음
        //이전 newAccount값을 가져와서 그것에 반대되는 값을 리턴하겠대 
    });
    return(
        <>
            <form onSubmit={onSubmit} className="container">
                <input 
                name="email"
                type="text" 
                placeholder="Email" 
                required 
                value={email} 
                onChange={onChange}
                className="authInput"
                />
                <input 
                name="password"
                type="password" 
                placeholder="Password" 
                required 
                value={password} 
                onChange={onChange}
                className="authInput"
                />
                <input 
                type="submit" 
                value={newAccount ? "Create Account" : "Sign In"} 
                className="authInput authSubmit"/>
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign in" : "Create Account"}
            </span>
        </>
    )

}
export default AuthForm;