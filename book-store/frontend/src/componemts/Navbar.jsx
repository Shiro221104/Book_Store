import { Link, useNavigate } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useState, useEffect, useContext } from "react";
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/books.json")
      .then(res => res.json())
      .then(data => {
        const uniqueCategories = [...new Set(data.map(book => book.category))];
        const uniqueGenres = [...new Set(data.map(book => book.genre))];
        setCategories(uniqueCategories);
        setGenres(uniqueGenres);
      });
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchTerm.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        setSearchTerm('');
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between">
        {/* Left Side */}
        <div className="flex items-center md:gap-16 gap-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <HiBars3 className="w-6 h-6" />
          </button>

          {isMenuOpen && (
            <div className="absolute top-16 left-4 z-50 w-64 bg-white shadow-lg rounded-lg p-4 space-y-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block hover:bg-gray-100 px-3 py-2 rounded">Home</Link>
              <Link to="/books" onClick={() => setIsMenuOpen(false)} className="block hover:bg-gray-100 px-3 py-2 rounded">All Books</Link>

              {/* Genre Dropdown */}
              <div className="relative group">
                <button className="flex justify-between items-center hover:bg-gray-100 px-3 py-2 rounded w-full">
                  <span>Genre</span>
                </button>
                <div className="absolute left-full top-0 ml-1 w-40 bg-white shadow-md rounded-md hidden group-hover:block z-50">
                  {genres.map((genre, index) => (
                    <Link key={index}
                      onClick={() => setIsMenuOpen(false)}
                      to={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 hover:bg-gray-100">
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="relative group">
                <button className="flex justify-between items-center hover:bg-gray-100 px-3 py-2 rounded w-full">
                  <span>Category</span>
                </button>
                <div className="absolute left-full top-0 ml-1 w-40 bg-white shadow-md rounded-md hidden group-hover:block z-50">
                  {categories.map((category, index) => (
                    <Link key={index}
                      onClick={() => setIsMenuOpen(false)}
                      to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 hover:bg-gray-100">
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Input */}
          <div className="relative sm:w-70 w-40 space-x-2">
            <IoSearch
              onClick={handleSearch}
              className="absolute left-3 inset-y-2 cursor-pointer"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Searching..."
              className="focus-within:outline-none w-full py-1 md:px-8 px-6 rounded-md pl-10 border"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="relative inline-flex items-center md:space-x-2">
          <div>
            {user ? (
              <>
                <button className="flex items-center md:space-x-3" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <FaRegCircleUser className="size-6" />
                  <span>{user.username}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      <li onClick={() => setIsDropdownOpen(false)}>
                        <Link to={`/users/${user.id}`} className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                      </li>
                      <li onClick={() => setIsDropdownOpen(false)}>
                        <Link to="/order" className="block px-4 py-2 text-sm hover:bg-gray-100">Order</Link>
                      </li>
                      {user.role === 'admin' && (
                      <li onClick={() => setIsDropdownOpen(false)}>
                       <Link to="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Dashboard</Link>
                      </li>
                        )}              
                      <li
                        onClick={() => {
                          logout();
                          clearCart();
                          setIsDropdownOpen(false);
                        }}
                      >
                        <Link to="/" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign Out</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <div className="flex items-center space-x-2">
                  <FaUser /><span>Login</span>
                </div>
              </Link>
            )}
          </div>

          <Link to="/cart" className="sm:px-6 py-2 flex items-center rounded-sm">
            <LuShoppingCart />
            <span>{cartItems.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
