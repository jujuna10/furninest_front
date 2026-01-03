
'use client'
import React, { useState } from 'react'
import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
})


function RoomsSetup() {
    const [rooms,setRooms] = useState('Living Room');

    const hotspotsLivingRoom = [
        { id: 1, title: 'Luxury Sofa', price: '$3200', top: '67%', left: '62%', direction: 'right' },
        { id: 2, title: 'Lamp', price: '$500', top: '20%', left: '52%', direction: 'top' },
        { id: 3, title: 'Cushion', price: '$2300', top: '55%', left: '22%', direction: 'left' },
        { id:4, title: 'Table', price: '500$', top: '75%', left: '25%', direction: 'left' },
    ]

    const hotspotsBedroom = [
        { id: 1, title: 'Luxury Sofa', price: '$3200', top: '70%', left: '85%', direction: 'left' },
        { id: 3, title: 'Cushion', price: '$2300', top: '60%', left: '25%', direction: 'left' },
        { id:4, title: 'Table', price: '500$', top: '75%', left: '5%', direction: 'right' },
    ]

    const hotspotsDiningRoom = [
        { id: 1, title: 'Luxury Sofa', price: '$3200', top: '75%', left: '55%', direction: 'left' },
        { id: 2, title: 'Lamp', price: '$500', top: '68%', left: '65%', direction: 'right' },
    ]

  return (
     <div className='2xl:w-[90%] w-full flex flex-col justify-center items-center mt-12 overflow-x-hidden'>
        {/* text and buttons */}
        <div className='flex flex-col justify-start items-start w-full px-5 2xl:px-20'>
            <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col'>
                    <p className={playfair.className + ' text-[25px] md:text-[25px] lg:text-[30px] xl:text-[38px] 2xl:text-[45px] font-bold mb-2'}>Get Inspired by Our Room Setups</p>
                    <p className='max-w-[200px] md:max-w-[300px] xl:max-w-[600px] text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime repellendus minus dolorem.</p>
                </div>
                <div className='flex flex-col md:flex-row gap-2 lg:gap-6'>
                    <button className='bg-[rgb(43,139,136)] text-white text-[22px] hover:translate-y-[-2px] duration-300 hover:cursor-pointer px-2 lg:px-7 py-1 lg:py-3 rounded-[5px]'>See All</button>
                </div>
            </div>
            {/* rooms */}
            <div className='w-full flex justify-start items-start mt-12 gap-5'>
                <button onClick={() => {setRooms('Living Room')}} className={`${rooms == 'Living Room' ? 'bg-[rgb(43,139,136)] text-white' : 'border border-[rgb(43,139,136)] text-[rgb(43,139,136)] rounded-[5px]'} hover:cursor-pointer px-2 lg:px-4 py-1 lg:py-2 rounded-[5px]`}>Living Room</button>
                <button onClick={() => {setRooms('Bedroom')}} className={`${rooms == 'Bedroom' ? 'bg-[rgb(43,139,136)] text-white' : 'border border-[rgb(43,139,136)] text-[rgb(43,139,136)] rounded-[5px]'} hover:cursor-pointer px-2 lg:px-4 py-1 lg:py-2 rounded-[5px]`}>Bedroom</button>
                <button onClick={() => {setRooms('Dining Room')}} className={`${rooms == 'Dining Room' ? 'bg-[rgb(43,139,136)] text-white' : 'border border-[rgb(43,139,136)] text-[rgb(43,139,136)] rounded-[5px]'} hover:cursor-pointer px-2 lg:px-4 py-1 lg:py-2 rounded-[5px]`}>Dining Room</button>
            </div>
        </div>
        {/* cards */}
        <div className='flex flex-col justify-center items-start w-full px-5 2xl:px-20 mt-12 mb-12 relative'>
            {rooms === 'Living Room' && (
                <div className='w-full flex items-center justify-center gap-5'>
                    <div className='w-1/2 rounded-[20px] relative'>
                        <Image src='/livingroom1.jpg' alt='living room' width={500} height={500} className='rounded-[20px] w-full h-[720px] object-cover' />

                        {hotspotsLivingRoom.map(item => (
                            <div key={item.id} className='absolute' style={{ top: item.top, left: item.left }}>
                                <span className='block w-3 h-3 bg-white rounded-full relative z-10'></span>

                                {item.direction === 'right' && (
                                    <>
                                        <div className='absolute left-3 top-1/2 w-10 h-px bg-white'></div>
                                        <div className='absolute left-14 -top-3 bg-gray-600/60 text-white text-sm px-4 py-1 rounded-lg whitespace-nowrap'>
                                            {item.title}
                                            <br />
                                            {item.price}
                                        </div>
                                    </>
                                )}

                                {item.direction === 'left' && (
                                    <>
                                        <div className='absolute right-3 top-1/2 w-10 h-px bg-white'></div>
                                        <div className='absolute right-14 -top-3 bg-gray-600/60 px-4 text-white text-sm py-1 rounded-lg whitespace-nowrap'>
                                            {item.title}
                                            <br />
                                            {item.price}
                                        </div>
                                    </>
                                )}

                                {item.direction === 'top' && (
                                    <>
                                        <div className='absolute left-1/2 bottom-3 h-10 w-px bg-white'></div>
                                        <div className='absolute left-1/2 -top-14 -translate-x-1/2 bg-gray-600/60 px-4 text-white text-sm py-1 rounded-lg whitespace-nowrap'>
                                            {item.title}
                                            <br />
                                            {item.price}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='w-1/2 flex flex-col justify-center items-center gap-5'>
                        <div className='w-full'>
                            <Image src='/livingroom2.jpg' alt='living room' width={500} height={500} className='rounded-[20px] w-full h-[350px] object-cover' />
                        </div>
                        <div className='flex gap-5 w-full'>
                            <Image src='/livingroom4.jpg' alt='living room' width={500} height={500} className='rounded-[20px] w-3/4 h-[350px] object-cover' />
                            <Image src='/livingroom3.jpeg' alt='living room' width={500} height={500} className='rounded-[20px] w-1/4 h-[350px] object-cover' />
                        </div>
                    </div>
                </div>
            )}

            {rooms === 'Bedroom' && (
                <div className='w-full flex items-center justify-center gap-5'>
                    <div className='w-1/2 rounded-[20px] relative'>
                        <Image src='/bedroom1.jpg' alt='bedroom' width={500} height={500} className='rounded-[20px] w-full h-[720px] object-cover' />

                        {hotspotsBedroom.map(item => (
                            <div key={item.id} className='absolute' style={{ top: item.top, left: item.left }}>
                                <span className='block w-3 h-3 bg-white rounded-full relative z-10'></span>

                                {item.direction === 'right' && (
                                    <>
                                        <div className='absolute left-3 top-1/2 w-10 h-px bg-white'></div>
                                        <div className='absolute left-14 -top-3 bg-gray-600/60 text-white text-sm px-4 py-1 rounded-lg whitespace-nowrap'>
                                            {item.title}
                                            <br />
                                            {item.price}
                                        </div>
                                    </>
                                )}

                                {item.direction === 'left' && (
                                    <>
                                        <div className='absolute right-3 top-1/2 w-10 h-px bg-white'></div>
                                        <div className='absolute right-14 -top-3 bg-gray-600/60 px-4 text-white text-sm py-1 rounded-lg whitespace-nowrap'>
                                            {item.title}
                                            <br />
                                            {item.price}
                                        </div>
                                    </>
                                )}

                                {item.direction === 'top' && (
                                    <>
                                        <div className='absolute left-1/2 bottom-3 h-10 w-px bg-white'></div>
                                        <div className='absolute left-1/2 -top-14 -translate-x-1/2 bg-gray-600/60 px-4 text-white text-sm py-1 rounded-lg whitespace-nowrap'>
                                            {item.title}
                                            <br />
                                            {item.price}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='w-1/2 flex flex-col justify-center items-center gap-5'>
                        <div className='w-full'>
                            <Image src='/bedroom2.jpeg' alt='bedroom' width={500} height={500} className='rounded-[20px] w-full h-[350px] object-cover' />
                        </div>
                        <div className='flex gap-5 w-full'>
                            <Image src='/bedroom3.webp' alt='bedroom' width={500} height={500} className='rounded-[20px] w-3/4 h-[350px] object-cover' />
                            <Image src='/bedroom4.jpeg' alt='bedroom' width={500} height={500} className='rounded-[20px] w-1/4 h-[350px] object-cover' />
                        </div>
                    </div>
                </div>
            )}

             {rooms === 'Dining Room' && (
                <div className='w-full flex items-center justify-center gap-5'>
                    <div className='w-1/2 rounded-[20px] relative'>
                        <Image src='/dinningroom1.jpg' alt='bedroom' width={500} height={500} className='rounded-[20px] w-full h-[720px] object-cover' />

                        {hotspotsDiningRoom.map(item => (
                            <div key={item.id} className='absolute' style={{ top: item.top, left: item.left }}>
                                <span className='block w-3 h-3 bg-white rounded-full relative z-10'></span>

                                {item.direction === 'right' && (
                                    <>
                                        <div className='absolute left-3 top-1/2 w-10 h-px bg-white'></div>
                                        <div className='absolute left-14 -top-3 bg-gray-600/60 text-white text-sm px-4 py-1 rounded-lg whitespace-nowrap'>
                                            {item.title}
                                            <br />
                                            {item.price}
                                        </div>
                                    </>
                                )}

                                {item.direction === 'left' && (
                                    <>
                                        <div className='absolute right-3 top-1/2 w-10 h-px bg-white'></div>
                                        <div className='absolute right-14 -top-3 bg-gray-600/60 px-4 text-white text-sm py-1 rounded-lg whitespace-nowrap'>
                                            {item.title}
                                            <br />
                                            {item.price}
                                        </div>
                                    </>
                                )}

                                {item.direction === 'top' && (
                                    <>
                                        <div className='absolute left-1/2 bottom-3 h-10 w-px bg-white'></div>
                                        <div className='absolute left-1/2 -top-14 -translate-x-1/2 bg-gray-600/60 px-4 text-white text-sm py-1 rounded-lg whitespace-nowrap'>
                                            {item.title}
                                            <br />
                                            {item.price}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='w-1/2 flex flex-col justify-center items-center gap-5'>
                        <div className='w-full'>
                            <Image src='/dinningroom2.jpg' alt='bedroom' width={500} height={500} className='rounded-[20px] w-full h-[350px] object-cover' />
                        </div>
                        <div className='flex gap-5 w-full'>
                            <Image src='/dinningroom3.webp' alt='bedroom' width={500} height={500} className='rounded-[20px] w-3/4 h-[350px] object-cover' />
                            <Image src='/dinningroom4.jpg' alt='bedroom' width={500} height={500} className='rounded-[20px] w-1/4 h-[350px] object-cover' />
                        </div>
                    </div>
                </div>
            )}

            <div className='flex justify-center items-center gap-5 absolute left-[50%] bottom-[-45px]'>
                <div onClick={() => setRooms('Living Room')} className={`w-[15px] h-[15px] cursor-pointer bg-[rgb(66,190,186)]  ${rooms === 'Living Room' ? 'rounded-[10px]' : 'rounded-[10px] w-[35px] h-[10px]'}`}></div>
                <div onClick={() => setRooms('Bedroom')} className={`w-[15px] h-[15px] cursor-pointer bg-[rgb(66,190,186)]  ${rooms === 'Bedroom' ? 'rounded-[10px]' : 'rounded-[10px] w-[35px] h-[10px]'}`}></div>
                <div onClick={() => setRooms('Dining Room')} className={`w-[15px] h-[15px] cursor-pointer bg-[rgb(66,190,186)]  ${rooms === 'Dining Room' ? 'rounded-[10px]' : 'rounded-[10px] w-[35px] h-[10px]'}`}></div>
            </div>
        </div>
    </div>
  )
}

export default RoomsSetup