import React from "react";
import list from "../../public/list.json";
import rupee from "../../public/rupee-sign.svg"

function Freebook() {
  const filterdata = list.filter((data) => data.catagory === "Free");

  return (
    <div className="px-5">
      <h1 className="text-3xl font-bold">Free Books</h1>
      <p className=" text-gray-600 mb-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea fuga qui error minima nemo, optio consequuntur odio quae recusandae molestias.</p>
      
      <div className="md:flex md:gap-5 md:mb-5 md:overflow-x-auto">
        {filterdata.map((book) =>(
            <div className="md:w-110  rounded-md mb-5 border-1 flex flex-col flex-shrink-0  justify-center items-center">
                <div className="">
                    <img className=" h-55 w-80 md:w-105 mt-2 rounded-md md:h-70 object-cover" src={book.img_url} alt="" />
                </div>
                <div className="w-75 md:w-100">
                    <div className=" mt-2 flex items-center">
                        <h1 className="text-2xl font-semibold">{book.name}</h1>
                        <h1 className=" flex items-center justify-center mx-2 text- border-1 rounded-md w-10 bg-amber-500 h-5">{book.catagory}</h1>
                    </div>                
                    <h2>{book.title}</h2>
                    <div className="flex justify-between py-5">
                        <div className="border-1 w-18 rounded-2xl h-7 flex">
                            <img src={rupee} alt="" />
                            <h2 className="" >{book.price}</h2>
                        </div>
                        
                        <button className="border-1 bg-emerald-300 w-21 rounded-md">Read Now</button>
                    </div>
                </div>               
            </div>
        ))}
      </div>
    </div>
  );
}

export default Freebook;
