'use client'
import Image from 'next/image'
import React, { useState } from 'react'

function Header() {

    const [current, setCurrent] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='w-full py-4 px-5 overflow-x-hidden'>
        {/* desktop */}
        <div className='flex w-full justify-between items-center'>
            <div>
                <Image src="/mainlogo.png" alt="Logo" width={100} height={50} />
            </div>
            <div className='lg:flex hidden'>
                <div className='flex gap-7'>
                    <a className={`text-[18px] ${current === "home" ? "text-blue-500" : "text-gray-700"}`} href="#">Home</a>
                    <a className={`text-[18px] ${current === "collection" ? "text-blue-500" : "text-gray-700"}`} href="#">Collection</a>
                    <a className={`text-[18px] ${current === "lookbook" ? "text-blue-500" : "text-gray-700"}`} href="#">Look Book</a>
                    <a className={`text-[18px] ${current === "aboutus" ? "text-blue-500" : "text-gray-700"}`} href="#">About Us</a>
                    <a className={`text-[18px] ${current === "blog" ? "text-blue-500" : "text-gray-700"}`} href="#">Blog</a>
                    <a className={`text-[18px] ${current === "offers" ? "text-blue-500" : "text-gray-700"}`} href="#">Offers</a>
                    <a className={`text-[18px] ${current === "contact" ? "text-blue-500" : "text-gray-700"}`} href="#">Contact</a>
                </div>
            </div>
            <div className='flex items-center justify-center gap-4 z-50'>
                <Image src="/magnifying-glass.png" alt="Search" width={28} height={28}/>
                <Image src="/user.png" alt="Cart" width={28} height={28}/>
                <Image src="/trolley.png" alt="Profile" width={28} height={28}/>
                <Image src={`${isMenuOpen ? "/close.png" : "/menu.png"}`} alt="Menu" width={32} height={32} onClick={() => setIsMenuOpen(!isMenuOpen)} className={`block lg:hidden z-50 ${isMenuOpen ? 'w-5 h-5': 'w-8 h-8'
                }`} />
            </div>
        </div>
        {/* Mobile menu */}
        <div className={`lg:hidden justify-start items-center w-[55%] h-screen z-45 ${isMenuOpen ? 'translate-x-[100%] translate-y-[-10%]' : 'translate-x-[150%] -translate-y-[150%]'} transition-transform duration-300 ease-in-out fixed top-0 right-0 bg-gray-300 p-6`}>

            <div className='flex flex-col gap-7 mt-[45%] justify-start'>
                <a className={`text-[18px] ${current === "home" ? "text-blue-500" : "text-gray-700"}`} href="#">Home</a>
                <a className={`text-[18px] ${current === "collection" ? "text-blue-500" : "text-gray-700"}`} href="#">Collection</a>
                <a className={`text-[18px] ${current === "lookbook" ? "text-blue-500" : "text-gray-700"}`} href="#">Look Book</a>
                <a className={`text-[18px] ${current === "aboutus" ? "text-blue-500" : "text-gray-700"}`} href="#">About Us</a>
                <a className={`text-[18px] ${current === "blog" ? "text-blue-500" : "text-gray-700"}`} href="#">Blog</a>
                <a className={`text-[18px] ${current === "offers" ? "text-blue-500" : "text-gray-700"}`} href="#">Offers</a>
                <a className={`text-[18px] ${current === "contact" ? "text-blue-500" : "text-gray-700"}`} href="#">Contact</a>
            </div>
        </div>
    </div>
  )
}

export default Header