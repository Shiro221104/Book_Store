import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
const Register = () =>{
   return(
           
           <div>
               <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
                   <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                       <h2 className='text-2xl font-medium text-cyan-600 flex justify-center mb-5'>
                           Register
                       </h2>
                              <form>
                              <div>
                               <label htmlFor='Username' className='block font-semibold mb-2 text-sm'>Username</label>
                               <input type='text' name='Username' placeholder='Enter Username' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'></input>
           
                               </div>
                               <div className='mt-2'>
                               <label htmlFor='Email' className='block font-semibold mb-2 text-sm'>Email</label>
                               <input type='email' name='Email' placeholder='Enter Email' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'></input>
           
                               </div>
                               <div className='mt-2'>
                               <label htmlFor='Password' className='block font-semibold mb-2 text-sm'>Password</label>
                               <input type='password' name='Password' placeholder='Enter Password' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'></input>
           
                               </div>
                               <div className='flex justify-center py-7'>
                              <button className='bg-cyan-500 hover:bg-cyan-600 text-white font-medium w-1/2 rounded focus:outline-none'>
                               Register
                              </button>
                              </div>
   
                              </form>
                              <p>
                                <Link to ='/login' className='sm:py-2 flex items-center rounded-sm'>
                                <IoIosArrowRoundBack className='size-6' /> <span className='font-semibold text-sm'  >Back</span>
                                </Link>
                              </p>
                    
                       
                       
                   </div>
                   
               </div>
           </div>
   
   
       )
}
export default Register