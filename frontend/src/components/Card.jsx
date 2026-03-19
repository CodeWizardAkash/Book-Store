import React, { useState } from "react";
import axios from "axios";
import rupee from "../../public/rupee-sign.svg";

function Card({ book, product }) {
  const [loading, setLoading] = useState(false);

  const addToCart = async (bookId) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3001/api/cart/add",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIXED SPACE
          },
        }
      );

      alert("Book added to cart 🛒");
    } catch (err) {
      console.log(err);
      alert("Login required!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 w-80 overflow-hidden mb-9">

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={book.img_url}
          alt={book.name}
          className="h-56 w-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Title + Category */}
        <div className="flex justify-between items-start gap-2">
          <h1 className="text-lg font-semibold line-clamp-2">
            {book.name}
          </h1>

          <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">
            {book.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {book.title}
        </p>

        {/* Price */}
        <div className="flex items-center gap-1 mt-3 font-semibold">
          <img src={rupee} alt="" className="w-4 h-4" />
          <span>{book.price}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">

          {/* Primary Action */}
          <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md text-sm font-medium">
            {product === "book"
              ? book.price === 0
                ? "Read Now"
                : "Buy Now"
              : "Enroll"}
          </button>

          {/* Add to Cart */}
          {product === "book" && book.price !== 0 && (
            <button
              onClick={() => addToCart(book._id)}
              disabled={loading}
              className="flex-1 border border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white py-2 rounded-md text-sm font-medium transition"
            >
              {loading ? "Adding..." : "Cart"}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default Card;