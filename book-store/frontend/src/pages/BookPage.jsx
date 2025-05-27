import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]); 
  const { addToCart } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = () => {
    if (!user) {
      alert("You must be logged in to add to cart.")
      navigate('/login')
    } else {
   
      addToCart(book)
    }
  }


 
  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:8082/api/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch book");
      return res.json();
    })
    .then((data) => {
      setBook(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, [id]);
if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!book) return <div>Book not found</div>;
    return(
        <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Left: Book Image */}
        <div className="flex justify-center">
          <img
            src={book.image} // sửa thành đường dẫn ảnh tương ứng
            alt={book.title}
            className="w-full max-w-xs rounded shadow-md -ml-8"
          />
        </div>
  
        {/* Right: Book Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">
           {book.title}
          </h1>
  
        
  
          <div className=" text-2xl font-semibold">${book.price}</div>
  
          <ul className="text-sm space-y-1 text-gray-700">
            <li><strong>Author:</strong> {book.author} </li>
            <li><strong>Publisher:</strong>  {book.publisher}</li>
            <li><strong>Genre:</strong> {book.genre}</li>
            <li><strong>Category:</strong> {book.category}</li>
            <li><strong>Description:</strong> <span className>{book.description}</span></li>
          </ul>
  
          {/* Quantity and Buttons */}
          <div className="flex items-center space-x-3 mt-4">
            <label className="text-sm"><strong>Quantity</strong></label>
            <div className="flex items-center border rounded overflow-hidden">
              <button className="px-2 text-lg">-</button>
              <input type="number" defaultValue={1} className="w-12 text-center border-l border-r outline-none" />
              <button className="px-2 text-lg">+</button>
            </div>
          </div>
  
          <button onClick={handleAddToCart} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                    <FiShoppingCart className="" />
                    <span>Add to Cart</span>

                </button>
  
          <div className="flex space-x-2 mt-3">

          </div>
        </div>
      </div>

    )
}
export default BookPage