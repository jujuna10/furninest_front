'use client'
import Image from 'next/image'
import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext';


function Header() {

    const [current, setCurrent] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const route = useRouter()
    const { user, logout } = useAuth();


    const scrollToSection = (id) => {
        const el = document.getElementById(id)
        if (!el) return
        el.scrollIntoView({ behavior: 'smooth' })
        setCurrent(id)
        setIsMenuOpen(false)
    }

     const handleUserClick = () => {
        if (user) {
            route.push('/profile');
        } else {
            route.push('/login');
        }
    };

    // const cookies = cookie.parse(document.cookie);
    // const cookieName = cookies.PHPSESSID;

    // console.log(cookieName);

    
    // const login = async () => {
    //     try {
    //         const res = await fetch('http://localhost:999/furninest/api/check-auth.php', {
    //             credentials: 'include'
    //         });

    //     const data = await res.json();

    //     console.log(data);

    //     if (data.authenticated) {
    //         route.push('/profile');
    //     } else {
    //         route.push('/login');
    //     }
    //     } catch (err) {
    //         route.push('/login');
    //     }
    // };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:999/furninest/public/users/check-session', {
                    credentials: 'include'
                });

            const data = await res.json();

            console.log(data);

            if (data.authenticated) {
                // route.push('/profile');
                console.log('yes')
            } else {
                // route.push('/login');
                console.log('no')
            }
            } catch (err) {
                // route.push('/login');
                console.log('nooooooo')
            }
        };

        checkAuth();
    }, []);



  return (
    <div className='w-full py-4 px-5 overflow-x-hidden'>
        {/* desktop */}
        <div className='flex w-full justify-between items-center'>
            <div>
                <Image src="/mainlogo.png" alt="Logo" width={100} height={50} />
            </div>
            <div className='lg:flex hidden'>
                <div className='flex gap-7'>
                    <button onClick={() => scrollToSection('home')} className={`text-[18px] ${current === "home" ? "text-blue-500" : "text-gray-700"} cursor-pointer`}>Home</button>
                    <button onClick={() => scrollToSection('collection')} className={`text-[18px] ${current === "collection" ? "text-blue-500" : "text-gray-700"} cursor-pointer`}>Collection</button>
                    <button onClick={() => scrollToSection('lookbook')} className={`text-[18px] ${current === "lookbook" ? "text-blue-500" : "text-gray-700"} cursor-pointer`}>Look Book</button>
                    <button onClick={() => scrollToSection('aboutus')} className={`text-[18px] ${current === "aboutus" ? "text-blue-500" : "text-gray-700"} cursor-pointer`}>About Us</button>
                    <button onClick={() => scrollToSection('blog')} className={`text-[18px] ${current === "blog" ? "text-blue-500" : "text-gray-700"} cursor-pointer`}>Blog</button>
                    <button onClick={() => scrollToSection('offers')} className={`text-[18px] ${current === "offers" ? "text-blue-500" : "text-gray-700"} cursor-pointer`}>Offers</button>
                    <button onClick={() => scrollToSection('footer')} className={`text-[18px] ${current === "footer" ? "text-blue-500" : "text-gray-700"} cursor-pointer`}>Contact</button>
                </div>
            </div>
            <div className='flex items-center justify-center gap-4 z-50'>
                <Image src="/magnifying-glass.png" alt="Search" width={28} height={28}/>
                <Image src="/user.png" alt="Cart" width={28} height={28} onClick={handleUserClick} />
                <Image src="/trolley.png" alt="Profile" width={28} height={28}/>
                <Image src={`${isMenuOpen ? "/close.png" : "/menu.png"}`} alt="Menu" width={32} height={32} onClick={() => setIsMenuOpen(!isMenuOpen)} className={`block lg:hidden z-50 ${isMenuOpen ? 'w-5 h-5': 'w-8 h-8'
                }`} />
            </div>
        </div>
        {/* Mobile menu */}
        <div className={`lg:hidden justify-start items-center w-[55%] h-screen z-45 ${isMenuOpen ? 'translate-x-full translate-y-[-10%]' : 'translate-x-[150%] -translate-y-[150%]'} transition-transform duration-300 ease-in-out fixed top-0 right-0 bg-gray-300 p-6`}>

            <div className='flex flex-col gap-7 mt-[45%] justify-start'>
                <button onClick={() => scrollToSection('home')}>Home</button>
                <button onClick={() => scrollToSection('collection')}>Collection</button>
                <button onClick={() => scrollToSection('lookbook')}>Look Book</button>
                <button onClick={() => scrollToSection('aboutus')}>About Us</button>
                <button onClick={() => scrollToSection('blog')}>Blog</button>
                <button onClick={() => scrollToSection('offers')}>Offers</button>
                <button onClick={() => scrollToSection('footer')}>Contact</button>
            </div>
        </div>
    </div>
  )
}

export default Header