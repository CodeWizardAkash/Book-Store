import { Children } from "react";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute(){
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user && user.role!=admin){
        return<Navigate to="/" replace />
    }
    return Children;
}
export default ProtectedAdminRoute;