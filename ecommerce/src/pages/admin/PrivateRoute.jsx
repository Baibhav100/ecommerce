import React from "react";
import { Navigate,useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {

    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const location = useLocation();
    if(!isAuthenticated) {
        return <Navigate to="/admin" state={{ from: location }} />;
    }   
    return children;
};

export default PrivateRoute;