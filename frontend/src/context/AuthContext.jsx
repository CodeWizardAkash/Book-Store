import {createContext, useState, useEffect} from "react";
export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(null);
    const [isAuthenticated, setISAuthenticated] = useState(false);

    //Load token on app start
    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setToken(storedToken);
            setISAuthenticated(true);
        }
    }, []);

    //login function
    const login = (newToken)=>{
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setISAuthenticated(true);
    };

    //logout funtion
    const logOut = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setISAuthenticated(false);
    };
    
    return (
        <AuthContext.Provider value={{token, isAuthenticated, login, logOut,}}>
            {children}
        </AuthContext.Provider>
    )
}