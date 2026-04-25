import React, {useState} from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const ContactHandler= async (e)=>{
    e.preventDefault();
    setError("");
    try{
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact/`,

        {name, email, message}
      )
      alert("message send sucessfully");
    }
    catch(err){
      setError(err.response?.data?.message || "failed to sent message");
    }
  }

  return (
    <>
    <Navbar/>
    <section id="contact" className="py-16 mt-15 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            Have a question, suggestion, or need help? We’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">📚 BookStore</h3>
              <p className="text-gray-600 mt-1">
                Your one-stop destination for books and courses.
              </p>
            </div>

            <div className="space-y-3">
              <p>📍 Jalpaiguri, West Bengal, India</p>
              <p>📧 support@bookstore.com</p>
              <p>📞 +91 98765 43210</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            {error && (
              <p className="text-red-500 text-sm text-center mb-4" >{error}</p>
            )}
            <form onSubmit={ContactHandler} className="space-y-4 flex flex-col items-center">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full outline-none border border-gray-200 rounded-md py-1 px-3"
                value={name}
                onChange={(e)=> setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full outline-none border border-gray-200 rounded-md py-1 px-3"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              
              <textarea
                placeholder="Your Message"
                className="textarea textarea-bordered w-full outline-none border border-gray-200 rounded-md py-1 px-3"
                rows="4"
                value={message}
                onChange={(e)=> setMessage(e.target.value)}
              ></textarea>

              <button type="submit" className="btn btn-primary w-1/3 text-white font-semibold p-1 rounded-md cursor-pointer bg-emerald-500">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}

export default Contact;
