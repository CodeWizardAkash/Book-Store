import React, { useContext, useState } from "react";
import Login from "./Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Signup(){
    const [openLogin, setOpenLogin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {login} = useContext(AuthContext);

    const navigate= useNavigate();

    const handleSignup= async (e)=>{
        e.preventDefault();
        setError("");

        try{
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/register`,
                {name, email, password}
            );

            //Auto login after signup
            login(res.data.token);
            navigate("/", {replace:true});
        }catch(err){
            setError(err.response?.data?.message || "signup failed");
        }
    }
    return(
        <>
        <div className="flex justify-center items-center h-screen">
            <div className="w-100 border-1 relative border-gray-100 rounded-md shadow-xl p-5 relative">

                <button 
                    className="absolute top-3 right-4 text-xl"
                    onClick={()=>navigate("/")}
                >✕</button>
                <h2 className="text-2xl font-bold mb-4 text-center">Sign up</h2>
                
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <h1>Name</h1>
                    <input
                        className="input input-bordered w-full outline-none border-1 p-1 rounded-md border-gray-400"
                        type="text"
                        placeholder="Enter your fullname"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />

                    <h1>Email</h1>
                    <input
                        className="input input-bordered w-full outline-none border-1 p-1 rounded-md border-gray-400"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <h1>Password</h1>
                    <input
                        className="input input-bordered w-full outline-none border-1 p-1 rounded-md border-gray-400"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div className="flex justify-center">
                        <button
                            className="btn btn-primary w-25 h-8  rounded-md text-white font-semibold cursor-pointer bg-emerald-600"
                            type="submit"
                            >Sign up</button>
                    </div>                 
                    
                </form>
                <div className="flex justify-end mt-3">
                    <p>Have account? <button className="text-blue-500 cursor-pointer" onClick={()=>setOpenLogin(true)} >Login</button></p>
                </div>
                
            </div>
        </div>
        <Login open={openLogin} setOpen={setOpenLogin} />
        </>
    )
}
export default Signup;