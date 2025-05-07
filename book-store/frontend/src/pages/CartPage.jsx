import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { getImgUrl } from '../utils/getImgUrl';
import { useAuth } from '../context/AuthContext'
const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.Price * item.quantity, 0);
 const { CurrentUser } = useAuth();
 const navigate = useNavigate();

 
 useEffect(() => {
  if (!CurrentUser) {
    alert("Please log in.");
    navigate('/login');
  }
}, [CurrentUser, navigate]);
  return (
    <div className='flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl'>
      <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
        <div className='flex items-start justify-between'>
          <div className='text-lg font-semibold text-gray-900'>Shopping cart</div>
          <button onClick={() => clearCart()} className='px-2 bg-red-500 text-white rounded-md hover:bg-red-600'>
            Clear Cart
          </button>
        </div>

        <div className='mt-8'>
          <ul className='-my-6 divide-y divide-gray-200'>
            {cartItems.map((item) => (
              <li key={item.id} className='flex py-6'>
                <div className='h-24 w-24 overflow-hidden rounded-md border'>
                  <img src={`${getImgUrl(item.Image)}`} alt={item.title} className='h-full w-full object-cover' />
                </div>
                <div className='ml-4 flex-1'>
                  <div className='flex justify-between'>
                    <Link to='/' className='font-medium text-gray-900'>{item.title}</Link>
                    <p className='text-gray-900'>${item.Price}</p>
                  </div>
                  <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)} className='text-cyan-600 hover:text-cyan-500 mt-2'>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='border-t mt-6 pt-6'>
          <div className='flex justify-between font-medium text-gray-900'>
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <p className='text-sm text-gray-500 mt-1'>Shipping and taxes calculated at checkout.</p>
          <Link to='/checkout' className='bg-cyan-600 hover:bg-cyan-500 text-white mt-4 block text-center py-3 rounded-md'>
            Checkout
          </Link>
          <div className='mt-4 text-center text-sm'>
            <Link to='/' className='text-cyan-600 hover:text-cyan-500'>
              Continue Shopping →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
