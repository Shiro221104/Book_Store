import React, { useEffect, useState } from 'react'
import BookCard from './BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination, Navigation } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Recommend = () =>{
    const[books,setBooks] = useState([]);
    useEffect(()=>{
   fetch("books.json")
   .then(res => res.json())
   .then((data)=>setBooks(data))
    },[]) 

    
    return (
        <div className='py-10'>
            <h2 className='text-2xl font-semibold mb-6'>Recommend</h2>
            <div className='flex gap-12'>
                
         
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

                
                   
{books.map((book, index) => (
  <SwiperSlide key={index}>
    <BookCard book={book} />
  </SwiperSlide>
))}

            </Swiper>
                
            </div>
        </div>
    )
}
export default Recommend