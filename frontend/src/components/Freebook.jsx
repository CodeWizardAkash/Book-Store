import React from "react";
import list from "../../public/list.json";
import rupee from "../../public/rupee-sign.svg"
import Card from "./Card"

function Freebook() {
  const filterdata = list.filter((data) => data.category === "Free");

  return (
    <div className="px-5">
      <h1 className="text-3xl font-bold">Free Books</h1>
      <p className=" text-gray-600 mb-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea fuga qui error minima nemo, optio consequuntur odio quae recusandae molestias.</p>
      
      <div className="md:flex md:gap-5 md:mb-5 md:overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {filterdata.map((book) =>(
            <Card key={book.id} book={book}/>
        ))}
      </div>
    </div>
  );
}

export default Freebook;
