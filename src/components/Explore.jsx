'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
})


function Explore() {

    const [activeButton, setActiveButton] = useState('Living Room')
    const livingRoom = [
        { name: "armchair", image: "/armchair.jpeg" },
        { name: "pouf", image: "/pouf.jpeg" },
        { name: "sofa", image: "/sofa.webp" },
        { name: "sidetable", image: "/sidetable.jpeg" },
        { name: "bookshelf", image: "/bookshelf.webp" },
        { name: "displaycabinet", image: "/displaycabinet.jpeg"},
        { name: "coffe table", image: "/cofetable.jpeg"},
        { name: "wall unit", image: "/wallunit.jpeg"}
    ]

    const bedroom = [
        { name: "bed", image: "/bed.jpg" },
        { name: "kidsbed", image: "/kidsbed.jpeg" },
        { name: "wardrobe", image: "/wardrobe.webp" },
        { name: "nightstand", image: "/nightstand.jpeg" },
        // { name: "wardrobe", image: "/wardrobe.jpeg" },
        { name: "workdesk", image: "/workdesk.jpeg"},
        { name: "dressingtable", image: "/dressingtable.jpeg"},
        { name: "wall unit", image: "/wallunit.jpeg"}
    ]

    const diningRoom = [
        { name: "wall cabinet", image: "/wallcabinet.jpg" },
        { name: "work top", image: "/kitchenworktop.jpeg"},
        { name: "appliances cabinet", image: "/appliancecabinet.jpeg"},
        { name: "dinning chair", image: "/diningchair.jpg" },
        { name: "dinning table", image: "/diningtable.jpeg" },
    ]


    return (
        <div className='2xl:w-[90%] w-full flex flex-col mt-12 overflow-x-hidden'>
            {/* text and buttons */}
            <div className='flex justify-between items-center w-full px-5 2xl:px-20'>
                <div className='flex flex-col'>
                    <p className={playfair.className + ' text-[25px] md:text-[25px] lg:text-[30px] xl:text-[38px] 2xl:text-[45px] font-bold mb-2'}>Explore Our Featured Categories</p>
                    <p className='max-w-[200px] md:max-w-[300px] xl:max-w-[600px] text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime repellendus minus dolorem.</p>
                </div>
                <div className='flex flex-col md:flex-row gap-2 lg:gap-6'>
                    <button className={`${activeButton == 'Living Room' ? 'bg-[rgb(43,139,136)] text-white' : 'border border-[rgb(43,139,136)] text-[rgb(43,139,136)] rounded-[5px]'} hover:cursor-pointer px-2 lg:px-4 py-1 lg:py-2 rounded-[5px]`} onClick={() => setActiveButton('Living Room')}>Living Room</button>
                    <button className={`${activeButton == 'Bedroom' ? 'bg-[rgb(43,139,136)] text-white' : 'border border-[rgb(43,139,136)] text-[rgb(43,139,136)] rounded-[5px]'} hover:cursor-pointer px-2 lg:px-4 py-1 lg:py-2 rounded-[5px]`} onClick={() => setActiveButton('Bedroom')}>Bedroom</button>
                    <button className={`${activeButton == 'Dining Room' ? 'bg-[rgb(43,139,136)] text-white' : 'border border-[rgb(43,139,136)] text-[rgb(43,139,136)] rounded-[5px]'} hover:cursor-pointer px-2 lg:px-4 py-1 lg:py-2 rounded-[5px]`} onClick={() => setActiveButton('Dining Room')}>Dining Room</button>
                </div>
            </div>
            {/* cards */}
            <div className='flex flex-col justify-center items-start w-full'>
                {activeButton === 'Living Room' && (
                    <div className='grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-3 2xl:grid-cols-4 gap-y-12 gap-x-12 lg:gap-x-5 xl:w-full 2xl:w-full mt-22 pl-2 pr-12 md:px-5 2xl:px-20'>
                        {livingRoom.map((item) => (
                            <div key={item.name} className='w-[320px]'>
                                <Image src={item.image} alt={item.name} width={350} height={350} className='rounded-[10px] 2xl:w-[350px] 2xl:h-[350px] lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] sm:w-[180px] sm:h-[180px] w-[120px] h-[120px]' />
                                <p className='mt-2 text-[18px] lg:text-[22px] text-gray-500'>{item.name}</p>
                            </div>
                        ))}
                    </div>
                )}
                {activeButton === 'Bedroom' && (
                    <div className='grid grid-cols-4 gap-y-12 xl:w-[85%] 2xl:w-full mt-22 pl-2 pr-12 md:px-5 2xl:px-20'>
                        {bedroom.map((item) => (
                            <div key={item.name} className='w-[320px]'>
                                <Image src={item.image} alt={item.name} width={350} height={350} className='rounded-[10px]' />
                                <p className='mt-2 text-[22px] text-gray-500'>{item.name}</p>
                            </div>
                        ))}
                    </div>
                )}
                {activeButton === 'Dining Room' && (
                    <div className='grid grid-cols-4 gap-y-12 xl:w-[85%] 2xl:w-full mt-22 pl-2 pr-12 md:px-5 2xl:px-20'>
                        {diningRoom.map((item) => (
                            <div key={item.name} className='w-[320px]'>
                                <Image src={item.image} alt={item.name} width={350} height={350} className='rounded-[10px]' />
                                <p className='mt-2 text-[22px] text-gray-500'>{item.name}</p>
                            </div>
                        ))}
                    </div>
                )}
                <div className='flex gap-2 mt-5 mb-12 px-22 w-[100%]'>
                    <hr className={`w-[33.3%] border-0 border-t-4 ${activeButton === 'Living Room' ? 'border-[rgb(144,144,144)] rounded-l-[100px]' : 'border-gray-300'}`} />
                    <hr className={`w-[33.3%] border-0 border-t-4 ${activeButton === 'Bedroom' ? 'border-[rgb(144,144,144)]' : 'border-gray-300'}`} />
                    <hr className={`w-[33.3%] border-0 border-t-4 ${activeButton === 'Dining Room' ? 'border-[rgb(144,144,144)] rounded-r-[100px]' : 'border-gray-300'}`} />
                </div>
            </div>

        </div>
    );
}

export default Explore