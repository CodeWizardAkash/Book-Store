import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

        {/* ✅ Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-4xl text-green-600">✔</span>
          </div>
        </div>

        {/* 🎉 Title */}
        <h1 className="text-2xl font-bold mb-2">
          Order Placed Successfully 🎉
        </h1>

        {/* 📦 Subtitle */}
        <p className="text-gray-600 mb-6">
          Your books are ready to read. You can access them anytime in your library.
        </p>

        {/* 🚀 Buttons */}
        <div className="flex flex-col gap-3">

          <button
            onClick={() => navigate("/profile/my-books")}
            className="bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            Go to My Books 📚
          </button>

          <button
            onClick={() => navigate("/books")}
            className="border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Continue Shopping 🛍️
          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;