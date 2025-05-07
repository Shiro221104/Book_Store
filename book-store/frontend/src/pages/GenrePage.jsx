import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { useParams } from 'react-router-dom'; 
const Genre = () => {
  const [books, setBooks] = useState([]);
  const { genreName } = useParams(); 

  useEffect(() => {
    fetch('/books.json')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);


  const filteredBooks = genreName ? books.filter((book) => book.genre.toLowerCase() === genreName.toLowerCase()): books;

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-2xl font-bold mb-4'>{genreName}</h2>


      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[2px]'>
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Genre;
