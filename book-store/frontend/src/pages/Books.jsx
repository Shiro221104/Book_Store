import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';

const Books = () =>{
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch('/books.json')
          .then((res) => res.json())
          .then((data) => setBooks(data))
      }, []);
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