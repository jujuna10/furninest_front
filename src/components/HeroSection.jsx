import Image from 'next/image'
import React from 'react'

import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const heroImages = [{url:'/nightstand.webp', name:'Nightstand'}, {url:'/loungechair.webp', name:'Lounge Chair'}, {url:'/showrack.webp', name:'Show Rack'}];

function HeroSection() {
  return (
    <div className="relative w-full h-200">
      <Image src="/hero3.webp" alt="Hero Section" fill quality={100} priority className="object-cover" />
      <div className='absolute top-[15%] lg:top-[25%] left-[5%]'>
        <p className={playfair.className + " text-[55px] font-semibold text-white"}>Transform Your Home <br /> into a Cozy Nest</p>
        <p className="text-[20px] text-gray-200 mt-8">Discover modern furniture and timeless designs that bring comfort, <br /> style, and warmth to every corner of your home.</p>
        <div className='flex gap-5 mt-8'>
            <button className='bg-[rgb(43,139,136)] text-white px-4 py-2 rounded-[3px]'>Shop now</button>
            <button className='text-[rgb(43,139,136)] bg-white px-4 py-2 rounded-[3px]'>Explore collection</button>
        </div>
      </div>
      <div className='absolute hidden sm:flex top-[70%] sm:top-[65%] right-5 sm:right-[5%] 2xl:right-[12%] flex gap-5 sm:gap-12'>
        {heroImages.map((item, index) => (
            <div key={index} className='relative p-4 hover:cursor-pointer'>
                <div className='absolute inset-0 bg-white/50 rounded-lg'></div>

            <div className='relative'> 
                <Image src={item.url} alt={item.name} width={144} height={192} className="object-cover rounded-[5px] w-[135px] h-[145px]  sm:w-[144px] sm:h-[165px]" />

                <div className='flex gap-2 items-center mt-2'>
                    <p className='text-white'>{item.name}</p>
                    <Image src="/right-down.png" alt="Arrow" width={24} height={24} className="rotate-270 invert" />
                </div>
            </div>

            </div>
        ))}
        </div>
 
    </div>
  )
}

export default HeroSection
