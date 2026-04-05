import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3001/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data?.items || []);
    } catch (err) {
      console.log(err.message, "69");
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3001/api/cart/remove/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuantity = async (bookId, newQty)=>{
    try{
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:3001/api/cart/update",
        {
          bookId,
          quantity: newQty,
        },
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    }catch(err){
      console.log(err);
    }
  };

  // ✅ Total price calculation
  const total = cart.reduce(
    (acc, item) => acc + (item.book?.price || 0) * item.quantity,
  0
  );

  // ✅ Loading UI
  if (loading) {
    return <p className="p-6">Loading cart...</p>;
  }

  // ✅ Error UI
  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty 🛒</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.book._id}
              className="flex items-center justify-between border rounded-lg p-4 mb-4 w-130 shadow-sm hover:shadow-md transition"
            >
              {/* Book Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.book.img_url}
                  alt=""
                  className="w-16 h-20 object-cover rounded"
                />

                <div>
                  <h2 className="font-semibold text-lg">
                    {item.book.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    ₹ {item.book.price}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={()=> updateQuantity(item.book._id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                > -
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={()=> updateQuantity(item.book._id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                > +
                </button>
                
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.book._id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Section */}
          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Total: ₹ {total}
            </h2>

            <Link to={"/checkout"}>
              <button className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700">
                Checkout
              </button>
            </Link>

            
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;