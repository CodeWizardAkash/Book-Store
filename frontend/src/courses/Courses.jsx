import React from "react";
import Navbar from "../components/navbar";
import Course from "../components/course";
import Footer from "../components/Footer"

function Courses(){
    return(
        <>
            <Navbar/>
            <div className="min-h-screen mt-25"><Course/></div>            
            <Footer/>
        </>
    );
}
export default Courses;