import React,{useState,useEffect} from "react";
import axios from 'axios';

const Login = ()=>{

    

    const [user,setUser] = useState({
        email: '',
        password: '',
    })

    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    const [token,setToken] = useState("");
    const [zuku,setZuku] = useState("");
    console.log(token);

    useEffect(()=>{
        if(token !== ""){
            axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response => setZuku(response.data.data.message))
        .catch(err=>console.log(err));
        }
    },[token]);
   async function addUser(e){
        e.preventDefault();

        if(!user.password || !user.email){
            setError("Feilds are empty");
            setSuccess("");
        }

        try{
            const response = await axios.post('https://instagram-express-app.vercel.app/api/auth/login',{
                    email: user.email,
                    password : user.password
                })
            setSuccess(response.data.message)
            setToken(response.data.data.token)
            setError("");
        }catch(err){
            setError(err.response.data.message)
            setSuccess("");
        }
    }
    return(
        <div>
            <h1>LogIn</h1>
            {error && <h4 className="errorHeading">{error}</h4>}
            {success && <h4 className="successHeading">{success}</h4>}
            <form className="signup-form" onSubmit={addUser}>
                <input type="email" placeholder="Enter your email" value={user.email}
                     onChange={(e)=>{setUser({...user,email:e.target.value})}}
                />
                <input type="password" placeholder="Enter your password" value={user.password}
                     onChange={(e)=>{setUser({...user,password:e.target.value})}}
                />
                <button type="submit">Signup</button>
            </form>
            <h1>
                {zuku}
            </h1>
        </div>
    );
}

export default Login;