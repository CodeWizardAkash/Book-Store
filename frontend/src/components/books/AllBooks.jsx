import React from "react";
import Navbar from "../navbar";
import Books from "../Books";
import Footer from "../Footer";

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