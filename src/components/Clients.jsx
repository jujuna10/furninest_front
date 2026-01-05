'use client'
import React from 'react'
import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
})



function Clients() {

  const [clients, setClients] = useState([]);
    const [paginationPage,setPaginationPage] = useState(1);

    useEffect(() => {
      fetch("http://localhost:999/furninest/public/clients")
          .then(res => res.json())
          .then(response => {
              if (response.success) {
                  setClients(response.data);
                  console.log(response.data)

              }
          })
          .catch(error => console.error("Error:", error));
    }, []);

    if(clients) console.log(clients.image)


  return (
    <div className='w-full flex flex-col justify-center items-center overflow-x-hidden'>
      <div className='flex flex-col gap-5 text-center'>
        <p className={playfair.className + ' text-[45px] font-medium'}>What Our Customers Say</p>
        <p className='text-gray-500 text-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, asperiores! Veritatis maxime.</p>
      </div>
      {/* client */}

      <div className='flex gap-5 w-[80%] mt-18'>
        {clients.slice((paginationPage - 1) * 3, paginationPage * 3).map((client,index) => (
          <div key={index} className='flex flex-col gap-12 justify-center items-center w-[33%] border border-gray-200 rounded-[10px] px-12 py-5 relative hover:bg-gray-200 cursor-pointer duration-300'>
            <Image src={client.image_url} alt={client.fullname} width={100} height={100} unoptimized className='rounded-[50%] w-[70px] h-[70px] object-cover absolute top-0 -translate-y-1/2' />
            <div className='flex flex-col gap-8 mt-12 items-center'>
              <p className='text-[25px] font-medium'>{client.fullname}</p>
              <p className='text-gray-500 text-[20px]'>{client.text}</p>
            </div>
            <div className='flex gap-2'>
              {Array.from({ length: client.star }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
          </div>  
        ))}
      </div>
      <div className='flex justify-center items-center gap-5 mt-12'>
        <div onClick={() => setPaginationPage(1)} className={`w-[15px] h-[15px] cursor-pointer bg-[rgb(66,190,186)]  ${paginationPage === 1 ? 'rounded-[10px]' : 'rounded-[10px] w-[35px] h-[10px]'}`}></div>
        <div onClick={() => setPaginationPage(2)} className={`w-[15px] h-[15px] cursor-pointer bg-[rgb(66,190,186)]  ${paginationPage === 2 ? 'rounded-[10px]' : 'rounded-[10px] w-[35px] h-[10px]'}`}></div>
        <div onClick={() => setPaginationPage(3)} className={`w-[15px] h-[15px] cursor-pointer bg-[rgb(66,190,186)]  ${paginationPage === 3 ? 'rounded-[10px]' : 'rounded-[10px] w-[35px] h-[10px]'}`}></div>
      </div>

    </div>
  )
}

export default Clients