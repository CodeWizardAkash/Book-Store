import React from "react";
import courselist from "../../public/course_list.json"
import Card from "./Card"
function Course() {
    const list = courselist;
  return (
    <>
      <div className="px-5">
        <div className=" flex px-10 flex-col items-center justify-center mb-10">
          <h1 className="text-3xl font-bold">Skills to transform your career and life</h1>
          <p className=" text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea fuga qui
            error minima nemo, optio consequuntur odio quae recusandae molestias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quasi impedit, excepturi molestiae odit totam.
          </p>
          <button className=" border-1 w-20 bg-emerald-600 font-bold h-9 text-white rounded-md" ><a href="/">Back</a></button>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-4 md:mb-5">
          {list.map((book) => (
            <Card key={book.id} book={book} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Course;
