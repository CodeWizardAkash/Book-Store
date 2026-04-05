import { useState } from "react";
import axios from "axios";

function AddBook() {

  const [book, setBook] = useState({
    name:"",
    category:"",
    price:"",
    img_url:"",
    pdf_url:"",
    title:""
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/books`,
      book,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    alert("Book added successfully");
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">Add New Book</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

        <input name="name" placeholder="Book Name" onChange={handleChange} className="border p-2 w-full"/>

        <input name="category" placeholder="Category" onChange={handleChange} className="border p-2 w-full"/>

        <input name="price" placeholder="Price" onChange={handleChange} className="border p-2 w-full"/>

        <input name="img_url" placeholder="Image URL" onChange={handleChange} className="border p-2 w-full"/>

        <input name="pdf_url" placeholder="PDF URL" onChange={handleChange} className="border p-2 w-full"/>

        <textarea name="title" placeholder="Description" onChange={handleChange} className="border p-2 w-full"/>

        <button className="bg-emerald-500 text-white px-4 py-2 rounded">
          Add Book
        </button>

      </form>

    </div>
  );
}

export default AddBook;