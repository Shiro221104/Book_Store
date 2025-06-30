import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function BookTable() {
  const [books, setBooks] = useState([]);
  const [selectedBookIds, setSelectedBookIds] = useState([]);
  const { token } = useAuth();
  const [showModal, setShowModal] = useState(false);
const [newBook, setNewBook] = useState({
  title: '',
  author: '',
  price: '',
  description: '',
  category: '',
  genre: '',
  image: '',
  publisher: '',
  quantity: '',
  trending: false
});
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:8082/api/books', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => setBooks(res.data))
    .catch(err => console.error('Failed to fetch books', err));
  };
const handleAddBook = () => {
  console.log("📦 Sending new book:", newBook);
  console.log("🔐 Token being used:", token);

  axios.post('http://localhost:8082/api/books', newBook, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => {
    fetchBooks();
    setShowModal(false);
    setNewBook({
      title: '',
      author: '',
      price: '',
      description: '',
      category: '',
      genre: '',
      image: '',
      publisher: '',
      quantity: '',
      trending: false
    });
  })
  .catch(err => {
    console.error('❌ Failed to add book:', err.response || err.message || err);
  });
};


  const handleDelete = () => {
    selectedBookIds.forEach(id => {
      axios.delete(`http://localhost:8082/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(fetchBooks);
    });
    setSelectedBookIds([]);
  };

  const toggleSelect = (id) => {
    setSelectedBookIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold"> All Books</h2>
        <div className="space-x-2">
          <button
            className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => setShowModal(true)}
          >
            ➕ Add Book
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
            onClick={handleDelete}
            disabled={selectedBookIds.length === 0}
          >
            🗑 Delete Selected
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">
                <input
                  type="checkbox"
                  checked={selectedBookIds.length === books.length}
                  onChange={(e) => {
                    setSelectedBookIds(
                      e.target.checked ? books.map(book => book.id) : []
                    );
                  }}
                />
              </th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Author</th>
              <th className="py-2 px-4 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id} className="border-t">
                <td className="py-2 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedBookIds.includes(book.id)}
                    onChange={() => toggleSelect(book.id)}
                  />
                </td>
                <td className="py-2 px-4">{book.title}</td>
                <td className="py-2 px-4">{book.author}</td>
                <td className="py-2 px-4">${book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-[500px] space-y-4 max-h-screen overflow-y-auto">
      <h3 className="text-xl font-semibold">Add New Book</h3>

      <input
        className="w-full border p-2 rounded"
        type="text"
        placeholder="Title"
        value={newBook.title}
        onChange={e => setNewBook({ ...newBook, title: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        type="text"
        placeholder="Author"
        value={newBook.author}
        onChange={e => setNewBook({ ...newBook, author: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        type="number"
        placeholder="Price"
        value={newBook.price}
        onChange={e => setNewBook({ ...newBook, price: parseFloat(e.target.value) })}
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={newBook.description}
        onChange={e => setNewBook({ ...newBook, description: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        type="text"
        placeholder="Category"
        value={newBook.category}
        onChange={e => setNewBook({ ...newBook, category: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        type="text"
        placeholder="Genre"
        value={newBook.genre}
        onChange={e => setNewBook({ ...newBook, genre: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        type="text"
        placeholder="Image URL"
        value={newBook.image}
        onChange={e => setNewBook({ ...newBook, image: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        type="text"
        placeholder="Publisher"
        value={newBook.publisher}
        onChange={e => setNewBook({ ...newBook, publisher: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        type="number"
        placeholder="Quantity"
        value={newBook.quantity}
        onChange={e => setNewBook({ ...newBook, quantity: parseInt(e.target.value) })}
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={newBook.trending}
          onChange={e => setNewBook({ ...newBook, trending: e.target.checked })}
        />
        <label>Trending</label>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleAddBook}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default BookTable;
