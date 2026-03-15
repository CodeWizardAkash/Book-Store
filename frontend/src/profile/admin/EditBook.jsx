import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EditBook() {

  const { id } = useParams();

  const [book, setBook] = useState({
    name:"",
    category:"",
    price:"",
    img_url:"",
    pdf_url:"",
    title:""
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/books/${id}`)
      .then(res => setBook(res.data));
  }, [id]);

  const handleChange = (e)=>{
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

const handleUpdate = async (e) => {

  e.preventDefault();

  const token = localStorage.getItem("token");

  await axios.put(
    `http://localhost:3001/api/books/${id}`,
    book,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  alert("Book updated successfully");
};

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Edit Book
      </h1>

      <form onSubmit={handleUpdate} className="space-y-3 max-w-md">

        <input
          name="name"
          value={book.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="category"
          value={book.category}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="price"
          value={book.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="img_url"
          value={book.img_url}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="pdf_url"
          value={book.pdf_url}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="title"
          value={book.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-emerald-500 text-white px-4 py-2 rounded">
          Update Book
        </button>

      </form>

    </div>
  );
}

export default EditBook;