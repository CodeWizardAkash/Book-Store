import React, {useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation} from "react-router-dom";
import {AuthContext} from '../context/AuthContext'

function Login({ open, setOpen }) {
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  if (!open) return null;

  const handleLogin = async(e) =>{
    e.preventDefault();
    setError("");

    try{
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {email, password}
      );
      
      login(res.data.token); // Update global auth
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      setOpen(false);
      navigate(from, {replace:true});// no reload

      // window.location.href = "/"; // navigate to home page
    }catch(err){
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-base-100 w-96 p-6 rounded-lg shadow-lg relative bg-white">
        
        {/* Close Button */}
        <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-xl cursor-pointer">✕</button>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="flex justify-center">
          {error && <p className="text-red-600 text-sm mb-3">{error} try again.</p>}
        </div>
        

        <form onSubmit={handleLogin} className="flex flex-col  items-center gap-4">
          <input
            className="input input-bordered w-full outline-none border-1 p-1 rounded-md border-gray-400"
            type="email" placeholder="Email"
            onChange={(e)=> setEmail(e.target.value)}
          />

          <input
            className="input input-bordered w-full outline-none border-1 p-1 rounded-md border-gray-400"
            type="password" placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="btn btn-primary w-1/3 h-9 rounded-md text-white font-semibold cursor-pointer bg-emerald-600"
            type="submit"
          >Login</button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account? 
          <span className="text-primary cursor-pointer text-blue-500 ml-1" href="/signup"
          onClick={()=>{
            setOpen(false);
            navigate("/signup")
          }}>Sign up</span>
        </p>

        
      </div>
    </div>
  );
}

export default Login;
