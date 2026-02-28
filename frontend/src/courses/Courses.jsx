import React from "react";
import Navbar from "../components/navbar";
import Course from "../components/course";
import Footer from "../components/Footer"

function Courses(){
    return(
        <>
            <Navbar className=""/>
            <div className="min-h-screen mt-25 -z-1 "><Course/></div>            
            <Footer/>
        </>
    );
}
export default Courses;