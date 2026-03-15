import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");

  const deleteBook = async (id) => {
    await axios.delete(
      `http://localhost:3001/api/books/${id}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
    setBooks(books.filter((book) => book._id !== id));
  };


  useEffect(() => {
    axios
      .get("http://localhost:3001/api/books")
      .then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">All Books</h1>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {books.map((book) => (

            <tr key={book._id} className="text-center">

              <td>
                <img src={book.img_url} className="h-14 mx-auto"/>
              </td>

              <td>{book.name}</td>

              <td>{book.category}</td>

              <td>{book.price}</td>

              <td className="space-x-3">

                <Link to={`/admin/edit-book/${book._id}`}>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => deleteBook(book._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;
