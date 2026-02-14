import React from "react";
import list from "../../public/list.json";
import rupee from "../../public/rupee-sign.svg"
import Card from "./Card"
import { useEffect, useState } from "react";
import axios from "axios";


function Freebook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const filterdata = list.filter((data) => data.category === "Free");

  useEffect(()=>{
    axios
      .get("http://localhost:3001/api/books/free")
      .then((res)=>{
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err)=>{
        console.log("Error: ", err);
        setLoading(false);
      })
  }, []);

  if(loading){
    return <div className="text-center mt-10">Loading...</div>
  }

  return (
    <div className="px-5">
      <h1 className="text-3xl font-bold">Free Books</h1>
      <p className=" text-gray-600 mb-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea fuga qui error minima nemo, optio consequuntur odio quae recusandae molestias.</p>
      
      <div className="md:flex md:gap-5 md:mb-5 md:overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {books.map((book) =>(
            <Card key={book._id} book={book} product="book"/>
        ))}
      </div>
    </div>
  );
}

export default Freebook;
