import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8082/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setMessage(errorData.message || 'Invalid credentials');
                return;
            }

            const data = await res.json();
             login(data.token, data.user); 
            if (data.user.role && data.user.role.includes('admin')) {
            navigate('/admin/dashboard');
        } else {
            navigate('/');
        }
        } catch (error) {
            setMessage('Login failed. Please try again.');
        }
    };

    return(
        
        <div>
            <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
                <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <h2 className='text-2xl font-medium text-cyan-600 flex justify-center mb-5'>
                        Login
                    </h2>
                           <form onSubmit={handleLogin}>
                           <div>
                            <label htmlFor='Username' className='block font-semibold mb-2 text-sm'>Username</label>
                            <input type='text' name='Username' placeholder='Enter Username' value={username}
                            onChange={(e) => setUsername(e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'></input>
        
                            </div>
                            <div className='mt-2'>
                            <label htmlFor='Password' className='block font-semibold mb-2 text-sm'>Password</label>
                            <input type='password' name='Password' placeholder='Enter Password'value={password}
                            onChange={(e) => setPassword(e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'></input>
        
                            </div>
                            {
                                message && <p className='text-red-500 text-sm mt-2'>{message}</p>
                            }
                            <div className='flex justify-center py-7'>
                           <button className='bg-cyan-500 hover:bg-cyan-600 text-white font-medium w-1/2 rounded focus:outline-none'>
                            Login
                           </button>
                           </div>

                           </form>
                           <p className='algin-baseline mt-4 text-sm font-medium'>
                            Haven't an account ? Please 
                        <Link to ='/register' className='text-cyan-500 hover:to-cyan-600  '> Register</Link>
                           </p>
                    
                </div>
                
            </div>
        </div>


    )
}
export default Login