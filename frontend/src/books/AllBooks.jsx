import React from "react";
import Navbar from "../components/navbar";
import Books from "../components/Books";
import Footer from "../components/Footer"

function AllBooks(){
    return(
        <>
            <Navbar/>
            <div className="mt-20"><Books/></div>
            
            <Footer/>
        </>
    )
}
export default AllBooks;