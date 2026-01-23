import React from 'react'
import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
})



function Footer() {
    return (
        <div id='footer' className='w-full flex flex-col justify-center items-center overflow-x-hidden gap-24'>
            <div className='max-w-[25%]'>
                <p className={playfair.className + ' text-[25px] md:text-[25px] lg:text-[30px] xl:text-[38px] 2xl:text-[42px] font-bold mb-2 text-center'}>Subscribe To Get The Latest News About Us</p>
                <p className='text-[20px] text-center text-gray-800'>Be part of our community and get the newest updates, exclusive offers, and inspiring stories regularly.</p>
            </div>
            <div className='w-full bg-black relative pt-16'>
                <div className='w-[35%] bg-white absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] rounded-[10px] z-10'>
                    <form className='flex gap-12 justify-between items-center px-5 py-5'>
                        <input type="email" placeholder='Enter your email' />
                        <button className='bg-[rgb(43,139,136)] text-white text-[18px] w-[20%] hover:translate-y-[-2px] duration-300 hover:cursor-pointer px-2 lg:px-7 py-1 lg:py-3 rounded-[5px]'>Subscribe</button>
                    </form>
                </div>
                <div className='flex flex-col gap-12 mt-4'>
                    <div className='flex gap-12 justify-center items-center'>
                        <p className='text-[22px] text-white font-medium'>Home</p>
                        <p className='text-[22px] text-white font-medium'>About Us</p>
                        <p className='text-[22px] text-white font-medium'>Feature</p>
                        <p className='text-[22px] text-white font-medium'>Contact Us</p>
                    </div>
                    <div className='flex gap-12 justify-center items-center'>
                        <Image src='/tw.png' alt='footer' width={35} height={35} className='invert-100' />
                        <Image src='/whatsapp.png' alt='footer' width={45} height={45} className='invert-100' />
                        <Image src='/apple.png' alt='footer' width={75} height={75} className='invert-100' />
                    </div>
                </div>
                <div className='flex justify-center items-center w-full mt-12'>
                <hr className='text-white h-px  w-[70%] text-center' />
                </div>
            </div>
        </div>
    )
}

export default Footer