'use client'
import React, { useState } from 'react'
import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'
import { useEffect } from 'react'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
})

function PopularProdcuts() {
// src/components/PopularProdcuts.jsx
    const [products, setProducts] = useState([]);
    const [paginationPage,setPaginationPage] = useState(1);

    useEffect(() => {
    fetch("http://localhost:999/furninest/public/popular-products")
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                setProducts(response.data);
            }
        })
        .catch(error => console.error("Error:", error));
}, []);

    console.log(products);

    const color = ['rgb(233,247,248)','rgb(248,240,255)','rgb(245,249,234)','rgb(255,244,244)','rgb(240,248,255)','rgb(252,246,238)','rgb(244,250,246)','rgb(250,245,255)','rgb(246,244,250)'];


  return (
    <div>
        <div id='collection' className='2xl:w-[90%] w-full flex flex-col justify-center items-center overflow-x-hidden'>
            {/* text and buttons */}
            <div className='flex justify-between items-center w-full px-5 2xl:px-20'>
                <div className='flex flex-col'>
                    <p className={playfair.className + ' text-[25px] md:text-[25px] lg:text-[30px] xl:text-[38px] 2xl:text-[45px] font-bold mb-2'}>Popular Products</p>
                    <p className='max-w-[200px] md:max-w-[300px] xl:max-w-[600px] text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime repellendus minus dolorem.</p>
                </div>
                <div className='flex flex-col md:flex-row gap-2 lg:gap-6'>
                    <button className='bg-[rgb(43,139,136)] text-white text-[22px] hover:translate-y-[-2px] duration-300 hover:cursor-pointer px-2 lg:px-7 py-1 lg:py-3 rounded-[5px]'>See All Products</button>
                </div>
            </div>   

            {/* products */}

            <div className='flex items-center gap-12 mt-12 2xl:w-[90%] justify-between'>
                <div className='border rounded-[50%] border-gray-300 h-[55px] w-[55px] p-2 hover:cursor-pointer  hover:bg-[rgb(43,139,136)] duration-300' onClick={() => {setPaginationPage(prev => (prev === 1 ? 3 : prev - 1));}}>
                    <Image src='/arrow.png' alt='back arrow' width={35} height={35} className='rounded-[10px] rotate-90' />
                </div>
                <div className='flex gap-12'>
                    <div></div>
                    {products.slice((paginationPage - 1) * 3, paginationPage * 3).map((product,index) => (
                        <div key={product.id} className={` w-[320px] flex flex-col justify-center items-start relative px-5 py-2 hover:cursor-pointer hover:translate-y-[-2px] duration-300`}>
                            <div  style={{ backgroundColor: color[index] }} className='w-full h-[270px] rounded-[10px] absolute bottom-0 left-0 z-[-1]'></div>
                            <div>
                                <Image src='/chairpng.png' alt={product.name} width={350} height={350} className='rounded-[10px]' />
                                <p className='mt-2 text-[22px] text-gray-500'>{product.name}</p>
                                <p className='text-yellow-500 text-[25px]'>{product.price}$</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='border rounded-[50%] border-gray-300 h-[55px] w-[55px] p-2 hover:cursor-pointer hover:invert-100 hover:bg-[rgb(43,139,136)] duration-300' onClick={() => {setPaginationPage(prev => (prev === 3 ? 1 : prev + 1))}}>
                    <Image src='/arrow.png' alt='back arrow' width={35} height={35} className='rounded-[10px] rotate-270 ' />
                </div>
            </div>
            <div className='flex gap-2 mt-5 mb-12 px-22 w-full'>
                <hr className={`w-[33.3%] border-0 border-t-4  rounded-l-[100px] ${paginationPage === 1 ? 'border-[rgb(43,139,136)]' : 'border-gray-300'}`} />
                <hr className={`w-[33.3%] border-0 border-t-4  ${paginationPage === 2 ? 'border-[rgb(43,139,136)]' : 'border-gray-300'}`} />
                <hr className={`w-[33.3%] border-0 border-t-4  rounded-r-[100px] ${paginationPage === 3 ? 'border-[rgb(43,139,136)]' : 'border-gray-300'}`} />
            </div>


        </div>
    </div>
  )
}

export default PopularProdcuts