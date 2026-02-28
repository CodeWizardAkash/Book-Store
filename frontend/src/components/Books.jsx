import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import Navbar from "./navbar";
// import list from "../../public/list.json";
import rupee from "../../public/rupee-sign.svg";
import Card from "./Card";

function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{ 
        axios
        .get("http://localhost:3001/api/books/")
        .then((res)=>{
            setBooks(res.data);
            setLoading(false);
        })
        .catch((err)=>{
            console.log("Error: ", err);
            setLoading(false);
        })
    },[]);

    if(loading){
      return <div className="mt-10">Loading...</div>
    }

  return (
    <>
      <div className="px-5">
        <h1 className="text-3xl font-bold">All Books</h1>
        <p className=" text-gray-600 mb-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea fuga qui
          error minima nemo, optio consequuntur odio quae recusandae molestias.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 md:mb-5 md:overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {books.map((book) => (
            <Card key={book._id} book={book} product="book" />
          ))}
        </div>
      </div>
    </>
  );
}
export default Books;
