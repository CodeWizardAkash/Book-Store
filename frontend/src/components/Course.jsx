import React from "react";
import courselist from "../../public/course_list.json"
import Card from "./Card"
import { useEffect, useState } from "react";
import axios from "axios";
function Course() {
    // const list = courselist;
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        axios
        .get("http://localhost:3001/api/courses/")
        .then((res)=>{
          setCourse(res.data);
          setLoading(false);
        })
        .catch((err)=>{
          console.log("Error: ", err);
          setLoading(false);
        })
    })

    if(loading){
      return <div className="text-center mt-10">Loading...</div>
    }

  return (
    <>
      <div className="px-5 -z-10">
        <div className=" flex px-10 flex-col items-center justify-center mb-10">
          <h1 className="text-3xl font-bold">Skills to transform your career and life</h1>
          <p className=" text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea fuga qui
            error minima nemo, optio consequuntur odio quae recusandae molestias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quasi impedit, excepturi molestiae odit totam.
          </p>
          <button className=" border-1 w-20 bg-emerald-600 font-bold h-9 text-white rounded-md" ><a href="/">Back</a></button>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-4 md:mb-5">
          {course.map((book) => (
            <Card key={book._id} book={book} product="course" />
          ))}
        </div>
      </div>
    </>
  );
}
export default Course;
