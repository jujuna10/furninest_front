import React from 'react'
import Image from 'next/image'

function Info() {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex items-center justify-center'>
            <p className='text-gray-600 text-[45px] text-center'><b className='text-black'>At Furninest,we blend </b> modern design eith timeless <br /> craftmanshp to reate furniture that brings comfort,stype <br />and warmth to every home</p>
        </div>
        <div className='w-full flex justify-center gap-12 mt-12'>
            <div className='w-[15%]'>
                <Image src='/info1.png' alt='info1' width={700} height={700} className='w-full object-cover rounded-[10px]' />
            </div>
            <div className='w-[35%]'>
                <Image src='/info2.png' alt='info2' width={700} height={700} className='w-full rounded-[10px]' />
            </div>
        </div>
        <button className='bg-[rgb(43,139,136)] text-white text-[22px] hover:translate-y-[-2px] duration-300 hover:cursor-pointer mt-18 px-2 lg:px-7 py-1 lg:py-3 rounded-[5px]'>Learn More</button>
    </div>
  )
}

export default Info