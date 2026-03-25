import React, {useEffect, useState} from "react";
import axios from "axios"


function Wishlist() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(()=>{
    // const cached = localStorage.getItem("wishlistBooks");
    // if(cached){
    //   setBooks
    // }

    fetchWishlist();
  }, []);

  const fetchWishlist = async ()=>{
    try{
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3001/api/wishlist",
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setBooks(res.data.books || []);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false)
    }
  };
    
  const removeFromWishlist = async (bookId) => {
    const token = localStorage.getItem("token")
    
    const updated = books.filter((b) => b._id !== bookId);
    setBooks(updated);

    try {
      await axios.post(
        "http://localhost:3001/api/wishlist/toggle",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
      //rollback
      fetchWishlist();
    }
  }  

  if(loading){
    return <p className="p-6">Loading wishlist...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Wishlist ❤️
      </h1>

      {books.length === 0 ? (
        <p className="text-gray-600">
          No items in wishlist 💔
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {books.map((book) => (
            <div
              key={book._id}
              className="border rounded-lg p-3 shadow-sm hover:shadow-md transition relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(book._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
              >
                Remove
              </button>

              {/* Image */}
              <img
                src={book.img_url}
                alt={book.name}
                className="h-40 w-full object-cover rounded"
              />

              {/* Info */}
              <h2 className="font-semibold mt-2 line-clamp-2">
                {book.name}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-2">
                {book.title}
              </p>

              <p className="font-semibold mt-2">
                ₹ {book.price}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Wishlist;