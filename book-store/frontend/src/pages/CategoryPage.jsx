import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import BookCard from './BookCard';

const Category = () => {
  const [books, setBooks] = useState([]);
  const { categoryName } = useParams(); 

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


  const filteredBooks = categoryName ? books.filter((book) => book.category.toLowerCase() === categoryName.toLowerCase()): books;

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-2xl font-bold mb-4'>{categoryName}</h2>


      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[2px]'>
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Category;
