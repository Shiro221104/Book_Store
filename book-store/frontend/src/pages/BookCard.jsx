import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from '../context/AuthContext'
const BookCard = ({book}) => {
    if (!book || !book.image) return null; 
    const { addToCart } = useContext(CartContext);
    const { user } = useAuth();
    const handleAddToCart = () => {
        if (!user) {
            alert("Please log in to add to cart.");
            return;
        }
        addToCart(book);
        alert("Add Succesfully");
    };
    return (
        <div className="rounded-lg transition-shadow duration-300 shadow-md p-3 bg-white hover:shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-56 sm:justify-center gap-4">
                <div className="sm:h-56 sm:w-1/3 flex-shrink-0 border rounded-md overflow-hidden">
                <Link to = {`/books/${book.id}`}>
                        <img
                            src={book.image} 
                            alt={book.title}
                            className="w-full h-full object-cover rounded-md cursor-pointer hover:scale-105 transition-transform duration-200"
                        />
                     </Link>
                </div>
                
                <div className="flex-1">
                    <Link to = {`/books/${book.id}`}>
                        <h3 className="text-lg font-semibold hover:text-blue-600 mb-2">
                            {book.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 mb-5">{book?.description.length > 80 ? `${book.description.slice(0, 80)}...` : book?.description}</p>
                    <p className="font-medium mb-3 text-sm text-blue-700">
                        ${book.price}
                    </p>
                    <button onClick={handleAddToCart}  className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 text-sm">
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
