import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:3001/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCart(res.data.items || []);
  };

  // 💰 Calculate total
  const total = cart.reduce(
    (acc, item) => acc + item.book.price * item.quantity,
    0
  );

  // 🚀 Place order
  const handleCheckout = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully 🎉");

      navigate("/order-sucess");
    } catch (err) {
      console.log(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Checkout 🧾
      </h1>

      {/* 🛒 Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.book._id}
            className="flex justify-between items-center border p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.book.img_url}
                className="w-16 h-20 object-cover rounded"
              />

              <div>
                <h2 className="font-semibold">
                  {item.book.name}
                </h2>
                <p className="text-sm text-gray-500">
                  ₹ {item.book.price}
                </p>
              </div>
            </div>

            <p>Qty: {item.quantity}</p>

            <p className="font-semibold">
              ₹ {item.book.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* 💰 Summary */}
      <div className="mt-6 border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹ {total}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="text-green-600">Free</span>
        </div>

        <div className="flex justify-between text-xl font-bold mt-2">
          <span>Total</span>
          <span>₹ {total}</span>
        </div>
      </div>

      {/* 🚀 Button */}
      <button
        onClick={handleCheckout}
        disabled={loading || cart.length === 0}
        className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg text-lg hover:bg-emerald-700"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>

    </div>
  );
}

export default Checkout;
