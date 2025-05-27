import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';

const Books = () =>{
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
     useEffect(() => {
      const token = localStorage.getItem("token"); 
    
      fetch("http://localhost:8082/api/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch books");
          return res.json();
        })
        .then((data) => {
          setBooks(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
      if (loading) return <p>Loading books...</p>;
      if (error) return <p className="text-red-500">{error}</p>;

      return (
        <div className='container mx-auto px-4 py-8'>
          <h2 className='text-2xl font-bold mb-8 mt-33'>All Books</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10  '>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      );
      
};

export default Books