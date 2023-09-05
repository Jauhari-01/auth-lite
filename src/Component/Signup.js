import React,{useState} from "react";
import axios from 'axios';
/*
    full syntax of the axios
        axios.post(API_LINK,{
                body:{} // argument in body
            },
            {
                headers : {}, // arguments in header
                params: {} , // arguments in params
            });

    //Using fetch
    fetch("URL",{
        method : "POST", //
        header : {},
        params : {}
        body : JSON.stringify({
            name : user.name,
            email : user.email,
            password : user.password
        })
    })
*/
const Signup = ()=>{
    const [user,setUser] = useState({
        name:'',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    const [token,setToken] = useState("");
    console.log(token);

    function addUser(e){
        e.preventDefault();

        if(user.password !== user.confirmPassword){
            setError("Password and Confirm Password should be same");
            setSuccess("");
        }

        axios.post('https://instagram-express-app.vercel.app/api/auth/signup',{
                name : user.name,
                email: user.email,
                password : user.password
            })
            .then(response => {
                setSuccess(response.data.message)
                setToken(response.data.data.token)
                setError("");
            })
            .catch(err => {
                setError(err.response.data.message)
                setSuccess("");
            });
    }
    return(
        <div>
            <h1>Signup</h1>
            {error && <h4 className="errorHeading">{error}</h4>}
            {success && <h4 className="successHeading">{success}</h4>}
            <form className="signup-form" onSubmit={addUser}>
                <input type="text" placeholder="Enter your name" value={user.name}
                    onChange={(e)=>{setUser({...user,name:e.target.value})}}
                />
                <input type="email" placeholder="Enter your email" value={user.email}
                     onChange={(e)=>{setUser({...user,email:e.target.value})}}
                />
                <input type="password" placeholder="Enter your password" value={user.password}
                     onChange={(e)=>{setUser({...user,password:e.target.value})}}
                />
                <input type="password" placeholder="confirm your password" value={user.confirmPassword}
                     onChange={(e)=>{setUser({...user,confirmPassword:e.target.value})}}
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;