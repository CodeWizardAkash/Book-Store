import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBooks() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/orders/my`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders(res.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Books</h1>

      {orders.map((order) =>
        order.items.map((item) => (
          <div key={item.book._id} className="border p-3 mb-3">
            <h2>{item.book.name}</h2>

            <a
              href={item.book.pdf_url}
              target="_blank"
              className="text-blue-500"
            >
              Read Now 📖
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBooks;