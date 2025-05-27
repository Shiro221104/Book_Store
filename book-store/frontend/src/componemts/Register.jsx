import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8082/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setMessage(errorData.message || 'Registration failed');
                return;
            }

            setMessage('Registration successful!');
            setTimeout(() => navigate('/login'), 1500);
        } catch (error) {
            setMessage('Error during registration. Please try again.');
        }
    };

    return (
        <div>
            <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
                <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <h2 className='text-2xl font-medium text-cyan-600 flex justify-center mb-5'>Register</h2>
                    <form onSubmit={handleRegister}>
                        <div>
                            <label htmlFor='username' className='block font-semibold mb-2 text-sm'>Username</label>
                            <input
                                type='text'
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Enter Username'
                                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                                required
                            />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor='email' className='block font-semibold mb-2 text-sm'>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter Email'
                                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                                required
                            />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor='password' className='block font-semibold mb-2 text-sm'>Password</label>
                            <input
                                type='password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter Password'
                                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                                required
                            />
                        </div>
                        {message && <p className='text-red-500 text-sm mt-2'>{message}</p>}
                        <div className='flex justify-center py-7'>
                            <button type='submit' className='bg-cyan-500 hover:bg-cyan-600 text-white font-medium w-1/2 rounded focus:outline-none'>
                                Register
                            </button>
                        </div>
                    </form>
                    <p>
                        <Link to='/login' className='sm:py-2 flex items-center rounded-sm'>
                            <IoIosArrowRoundBack className='size-6' />
                            <span className='font-semibold text-sm'>Back</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
