import React from 'react'
import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'
// import { useEffect, useState } from 'react'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
})

function Offer() {
  return (
    <div className='2xl:w-[90%] w-full flex flex-col justify-center items-center mt-12 overflow-x-hidden px-5 2xl:px-20'>
        <div className='flex justify-between items-center w-full mb-12'>
            <div className='flex flex-col'>
                <p className={playfair.className + ' text-[25px] md:text-[25px] lg:text-[30px] xl:text-[38px] 2xl:text-[45px] font-bold mb-2'}>Special Ofers & Discounts</p>
                <p className='max-w-[200px] md:max-w-[300px] xl:max-w-[600px] text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime repellendus minus dolorem.</p>
             </div>
            <div className='flex flex-col md:flex-row gap-2 lg:gap-6'>
                <button className='bg-[rgb(43,139,136)] text-white text-[22px] hover:translate-y-[-2px] duration-300 hover:cursor-pointer px-2 lg:px-7 py-1 lg:py-3 rounded-[5px]'>See All</button>
            </div>
        </div>
        <div className='w-full flex gap-12 justify-between'>
            <div className='w-1/2 flex justify-between bg-[rgb(227,247,246)] px-12 py-5 rounded-[10px]'>
                <div className='flex flex-col justify-between'>
                    <div>
                        <p className='text-[35px] font-medium'>40% Off</p>
                        <p className='text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <button className='bg-[rgb(43,139,136)] text-white text-[18px] w-[45%] hover:translate-y-[-2px] duration-300 hover:cursor-pointer px-2 lg:px-7 py-1 lg:py-3 rounded-[5px]'>Shop Now</button>
                </div>
                <Image src='/offered1.png' alt='offeredsofa' width={350} height={350} className='rounded-[10px]' />
            </div>
            <div className='w-1/2 flex justify-between bg-[rgb(254,248,214)] px-12 py-5 rounded-[10px]'>
                <div className='flex flex-col justify-between'>
                    <div>
                        <p className='text-[35px] font-medium'>Save Up to 20%</p>
                        <p className='text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <button className='bg-[rgb(43,139,136)] text-white text-[18px] w-[45%] hover:translate-y-[-2px] duration-300 hover:cursor-pointer px-2 lg:px-7 py-1 lg:py-3 rounded-[5px]'>Shop Now</button>
                </div>
                <Image src='/offeredchair.jpg' alt='offeredsofa' width={350} height={350} className='rounded-[10px]' />
            </div>
        </div>
    </div>
  )
}

export default Offer