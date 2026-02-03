'use client'
import React, { useEffect, useState } from 'react'
import { User, Lock, LogOut, Eye, EyeOff, Pencil, ClipboardCheck, ClipboardList, MapPinCheck, ClipboardClock, Check } from 'lucide-react';
import Image from 'next/image';


function page() {

    const [userData, setUserData] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordChange, setPasswordChange] = useState({
        oldPassword: '',
        newPassword: '',
    })
    const [info, setInfo] = useState({
        name: '',
        lastname: '',
        email: ''
    })
    const [originalInfo, setOriginalInfo] = useState({
        name: '',
        lastname: '',
        email: ''
    })
    const [activeSection, setActiveSection] = useState('info')
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [orderSearch, setOrderSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('status')
    const [dateFilter, setDateFilter] = useState('date')



    const fetchUser = async () => {
        try {
            const response = await fetch(
                'http://localhost:999/furninest/public/users/check-session',
                {
                    credentials: 'include'
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();
            console.log('User:profile', data);
            setUserData(data.user)
            setInfo({
                name: data.user.name,
                lastname: data.user.lastname,
                email: data.user.email
            })
            setOriginalInfo({
                name: data.user.name,
                lastname: data.user.lastname,
                email: data.user.email
            })
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // useEffect(() => {
    //     if (activeSection === 'orders' && userData?.id) {
    //         ordersList();
    //     }
    // }, [activeSection, userData]);


    // useEffect(() => {
    //      if (orderSearch) {
    //         const filtered = orders.filter(order =>
    //             order.items.some(item =>
    //                 item.product.name.toLowerCase().includes(orderSearch.toLowerCase())
    //             )
    //         )
    //         console.log(filtered,'filtered')
    //         setFilteredOrders(filtered)
    //     }

    // }, [orders, orderSearch])

    useEffect(() => {
        console.log('=== FILTER EFFECT RUNNING ===')
        console.log('orders:', orders)
        console.log('orderSearch:', orderSearch)
        
        let filtered = [...orders]
        
        if (orderSearch) {
            filtered = filtered
                .map(order => ({
                    ...order,
                    items: order.items.filter(item =>
                        item.product.name.toLowerCase().includes(orderSearch.toLowerCase())
                    )
                }))
                .filter(order => order.items.length > 0)
            
            console.log('filtered after search:', filtered)
        }
        
        if (statusFilter && statusFilter !== 'status' && statusFilter !== 'all') {
            filtered = filtered.filter(order => order.status === statusFilter)
            console.log('filtered after status:', filtered)
        }
        
        if (dateFilter === 'asc') {
            filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        } else if (dateFilter === 'desc') {
            filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }
        
        console.log('=== FINAL FILTERED ===', filtered)
        setFilteredOrders(filtered)
    }, [orders, orderSearch, statusFilter, dateFilter])

    const passwordChangeHandler = (e) => {
        e.preventDefault();
        setPasswordChange({ ...passwordChange, [e.target.name]: e.target.value })
    }

    const infoChangeHandler = (e) => {
        e.preventDefault();
        setInfo({ ...info, [e.target.name]: e.target.value })
    }


    const passwordValidation = () => {
        if (passwordChange.newPassword !== passwordChange.confirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        return true;
    }

    const saveInfo = async (field) => {
        try {
            const response = await fetch('http://localhost:999/furninest/public/users/update-info', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    // id: userData.id,
                    [field]: info[field]
                })
            });
            const data = await response.json();
            if (data.success) {
                setOriginalInfo({ ...originalInfo, [field]: info[field] });
                alert('შეინახა წარმატებით!');
            } else {
                alert('შეცდომა: ' + data.message);
            }
        } catch (err) {
            console.error(err);
            alert('შეცდომა მონაცემების შენახვისას');
        }
    }


    const ordersList = async () => {
        try {
            const response = await fetch(`http://localhost:999/furninest/public/users/order/${userData.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                setOrders(data.data)
                setFilteredOrders(data.data)
                // setActiveSection('orders item')
                console.log(data);
            } else {
                alert('შეცდომა: ' + data.message);
            }
        } catch (err) {
            console.error(err);
            alert('შეცდომა მონაცემების შენახვისას');
        }
    }

    const changePassword = async (field) => {
            try {
            const response = await fetch('http://localhost:999/furninest/public/users/change-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    userId: userData.id,
                    oldPassword: passwordChange.oldPassword,
                    newPassword: passwordChange.newPassword
                })
            });
            const data = await response.json();
            if (data.success) {
                alert('შეიცვალა წარმატებით!');
            } else {
                alert('შეცდომა: ' + data.message);
            }
        } catch (err) {
            console.error(err);
            alert('შეცდომა მონაცემების შენახვისას');
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString.replace(' ', 'T'));

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }



    function renderSection() {
        switch (activeSection) {
            case 'info':
                return (
                    <div className='w-[75%] flex flex-col gap-12'>
                        <p className='text-[35px] font-medium text-gray-800'>My info</p>
                        <form className="flex flex-col gap-5">
                            <div className="relative">
                                <input type='text' placeholder=" " onChange={infoChangeHandler} name="name" id="name" value={info.name} className="peer border border-gray-300 rounded-[7px] px-3 py-5 w-full pr-20 focus:outline-none" />
                                <p className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 mt-1 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[rgb(43,139,136)] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs'>Name</p>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <Pencil className="text-gray-500" size={20} />
                                    {info.name !== originalInfo.name && (
                                        <button type="button" onClick={() => saveInfo('name')} className="text-green-500 hover:text-green-600"><Check size={20} /></button>
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <input type='text' placeholder=" " onChange={infoChangeHandler} name="lastname" id="lastname" value={info.lastname} className="peer border border-gray-300 rounded-[7px] px-3 py-5 w-full pr-20 focus:outline-none" />
                                <p className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 mt-1 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[rgb(43,139,136)] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs'>Lastname</p>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <Pencil className="text-gray-500" size={20} />
                                    {info.lastname !== originalInfo.lastname && (
                                        <button type="button" onClick={() => saveInfo('lastname')} className="text-green-500 hover:text-green-600"><Check size={20} /></button>
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <input type='email' placeholder=" " onChange={infoChangeHandler} name="email" id="email" value={info.email} className="peer border border-gray-300 rounded-[7px] px-3 py-5 w-full pr-20 focus:outline-none" />
                                <p className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 mt-1 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[rgb(43,139,136)] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs'>Email</p>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <Pencil className="text-gray-500" size={20} />
                                    {info.email !== originalInfo.email && (
                                        <button type="button" onClick={() => saveInfo('email')} className="text-green-500 hover:text-green-600"><Check size={20} /></button>
                                    )}
                                </div>
                            </div>

                            <button className="bg-[rgb(43,139,136)] text-white px-2 py-4 rounded-[7px] w-full" onClick={passwordValidation}>Change Password</button>
                        </form>
                    </div>
                )
            case 'password':
                return (
                    <div className='w-[75%] flex flex-col gap-12'>
                        <p className='text-[35px] font-medium text-gray-800'>Change Password</p>
                        <form className="flex flex-col gap-5">
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} placeholder=" " onChange={passwordChangeHandler} name="oldPassword" id="oldPassword" value={passwordChange.oldPassword} className="peer border border-gray-300 rounded-[7px] px-3 py-5 w-full pr-12 focus:outline-none" />
                                <p className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[rgb(43,139,136)] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs'>Enter old password</p>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">{showPassword ? <EyeOff /> : <Eye />}</button>
                            </div>

                            <div className="relative">
                                <input type={showConfirmPassword ? 'text' : 'password'} placeholder=" " onChange={passwordChangeHandler} name="newPassword" id="newPassword" value={passwordChange.newPassword} className="peer border border-gray-300 rounded-[7px] px-3 py-5 w-full pr-12 focus:outline-none" />
                                <p className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[rgb(43,139,136)] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs'>Enter new password</p>
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">{showConfirmPassword ? <EyeOff /> : <Eye />}</button>
                            </div>

                            <button type='button' className="bg-[rgb(43,139,136)] text-white px-2 py-4 rounded-[7px] w-full" onClick={changePassword} >Change Password</button>
                        </form>
                    </div>
                )
            case 'orders':
                return (
                    <div className='w-[75%] flex flex-col gap-12'>
                        <p className='text-[35px] font-medium text-gray-800'>My Orders</p>
                        <div className='flex flex-col gap-4'>
                            <div>
                                {orders?.length > 0 ? (
                                    <div className='flex justify-between'>
                                        <div className='flex items-center gap-4'>
                                            <ClipboardList size={22} strokeWidth={1} />
                                            <p className='text-[22px]'>Orders</p>
                                        </div>
                                        <p className='text-[22px]'>{orders.length}</p>
                                    </div>
                                ) : (
                                    <p>No orders found</p>
                                )}
                            </div>
                            <hr className='w-full text-gray-100' />
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <MapPinCheck size={22} strokeWidth={1} />
                                    <p className='text-[22px]'>delivered</p>
                                </div>
                                <p className='text-[22px]'>{orders.filter(order => order.status === 'delivered').length}</p>
                            </div>
                            <hr className='w-full text-gray-100' />
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <ClipboardClock size={22} strokeWidth={1} />
                                    <p className='text-[22px]'>pending</p>
                                </div>
                                <p className='text-[22px]'>{orders.filter(order => order.status === 'pending').length}</p>
                            </div>
                            <hr className='w-full text-gray-100' />
                            <div className='flex items-center justify-between'>
                                <p className='text-blue-500'>View a detailed list of all your orders and track their status</p>
                                <button className='bg-[rgb(43,139,136)] text-white px-2 py-4 rounded-[7px] w-[25%] cursor-pointer' onClick={() => setActiveSection('orders item')}>View Orders</button>
                            </div>
                        </div>
                    </div>
                )
            // case 'orders item':
            //     console.log('Rendering orders item, filteredOrders:', filteredOrders)

            //     return (
            //         <div className='w-[75%] flex flex-col gap-12'>
            //             <div className='w-full flex justify-between gap-12'>
            //                 <input type="text" placeholder="Search order" onChange={(e) => setOrderSearch(e.target.value)} value={orderSearch} className='w-[80%] border border-gray-300 rounded-[7px] px-3 py-2 focus:outline-none' />
            //                 <div className='flex w-[65%] gap-4'>
            //                     <select name="status" id="status" onChange={(e) => setStatusFilter(e.target.value)} className='w-[50%] bg-gray-100 rounded-[7px] px-3 py-2 focus:outline-none'>
            //                         <option value="status">Status</option>
            //                         <option value="delivered">Delivered</option>
            //                         <option value="pending">Pending</option>
            //                     </select>
            //                     <select name="date" id="date" onChange={(e) => setDateFilter(e.target.value)} className='w-[50%] bg-gray-100 rounded-[7px] px-3 py-2 focus:outline-none'>
            //                         <option value="date">Date</option>
            //                         <option value="asc">Ascending</option>
            //                         <option value="desc">Descending</option>
            //                     </select>
            //                 </div>
            //             </div>
            //             <div className='flex flex-col gap-5'>
            //                 {filteredOrders?.map((order) => {
            //                     const date = order.created_at
            //                     const status = order.status
            //                     const id = order.id

            //                     return (
            //                         <div key={order.id} className='flex flex-col gap-5'>
            //                             {order.items.map((item) => (
            //                                 <div key={item.id} className='flex justify-between items-center' >
            //                                     <div className='flex items-center gap-7'>
            //                                         <Image src={`http://localhost:999/furninest/${item.product.image}`} alt={item.product.name} width={100} height={100} unoptimized className='rounded-[10px]' />
            //                                         <div className='flex flex-col'>
            //                                             <p className='text-[20px] text-gray-800 font-medium'>{item.product.name}</p>
            //                                             <p className='text-gray-400 text-[17px] font-medium'>#{id}</p>
            //                                             <p className='text-[18px] text-gray-600'>{formatDate(date)}</p>
            //                                         </div>
            //                                     </div>
            //                                     <p className={`${status === 'pending' ? 'bg-blue-200' : 'bg-green-200'} text-gray-700 text-[18px] font-semibold  px-5 py-2 rounded-[7px]`}>{status}</p>
            //                                     <p className='text-[20px] text-gray-800 font-medium'>${item.price}</p>
            //                                 </div>
            //                             ))}
            //                         </div>
            //                     )
            //                 })}
            //             </div>


            //         </div>
            //     )
            case 'orders item':
    return (
        <div className='w-[75%] flex flex-col gap-12'>
            <div className='w-full flex justify-between gap-12'>
                <input  type="text"  placeholder="Search order"  onChange={(e) => setOrderSearch(e.target.value)}  value={orderSearch} className='w-[80%] border border-gray-300 rounded-[7px] px-3 py-2 focus:outline-none' />
                <div className='flex w-[65%] gap-4'>
                    <select name="status" id="status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className='w-[50%] bg-gray-100 rounded-[7px] px-3 py-2 focus:outline-none'>
                        <option value="status">Status</option>
                        <option value="all">All</option>
                        <option value="delivered">Delivered</option>
                        <option value="pending">Pending</option>
                    </select>
                    <select name="date" id="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className='w-[50%] bg-gray-100 rounded-[7px] px-3 py-2 focus:outline-none'>
                        <option value="date">Date</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            
            {/* აქ დაამატე console.log */}
            <div className='flex flex-col gap-5'>
                {console.log('filteredOrders length:', filteredOrders?.length)}
                {console.log('filteredOrders:', filteredOrders)}
                
                {filteredOrders && filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div key={order.id} className='flex flex-col gap-5'>
                            {order.items.map((item) => (
                                <div key={item.id} className='flex justify-between items-center pb-4'>
                                    <div className='flex items-center gap-7'>
                                        <Image src={`http://localhost:999/furninest/${item.product.image}`} alt={item.product.name} width={100} height={100} unoptimized className='rounded-[10px]' />
                                        <div className='flex flex-col'>
                                            <p className='text-[20px] text-gray-800 font-medium'>{item.product.name}</p>
                                            <p className='text-gray-400 text-[17px] font-medium'>#{order.id}</p>
                                            <p className='text-[18px] text-gray-600'>{formatDate(order.created_at)}</p>
                                        </div>
                                    </div>
                                    <p className={`${order.status === 'pending' ? 'bg-blue-200' : 'bg-green-200'} text-gray-700 text-[18px] font-semibold px-5 py-2 rounded-[7px]`}>
                                        {order.status}
                                    </p>
                                    <p className='text-[20px] text-gray-800 font-medium'>${item.price}</p>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className='text-center py-10'>
                        <p className='text-gray-500 text-xl'>
                            {orderSearch ? `order not found "${orderSearch}"` : 'order not found'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
            default:
                return null;
        }
    }

    return (
        <div className='w-full h-screen flex pt-[10%] justify-center'>
            <div className='w-[60%] h-12'>
                {/* top div */}
                <div className='flex items-center gap-8'>
                    <div className='w-[65px] h-[65px] rounded-full flex justify-center items-center bg-gray-400'>
                        <p className='text-white font-medium text-xl'>{userData?.name?.[0]}{userData?.lastname?.[0]}</p>
                    </div>
                    <div>
                        <p className='text-[27px] font-medium'>{userData?.name} {userData?.lastname}</p>
                        <p className='text-[18px] text-gray-500'>My Profile</p>
                    </div>
                </div>
                <hr className='text-gray-200  w-full my-5' />
                {/* functional div */}
                <div className='w-full flex gap-12'>
                    {/* navbar */}
                    <div className='w-[35%]'>
                        <p className='text-[22px] font-medium'>Settings</p>
                        <div className='mt-5 flex flex-col gap-8'>
                            <div className={`flex items-center gap-5 px-5 py-2 cursor-pointer ${activeSection === 'info' ? 'bg-gray-100 rounded-[10px]' : ''}`} onClick={() => setActiveSection('info')}>
                                <User size={27} strokeWidth={1} />
                                <p className='text-[20px] text-gray-500'>My Info</p>
                            </div>
                            <div className={`flex items-center gap-5 px-5 py-2 cursor-pointer ${activeSection === 'password' ? 'bg-gray-100 rounded-[10px]' : ''}`} onClick={() => setActiveSection('password')}>
                                <Lock size={27} strokeWidth={1} />
                                <p className='text-[20px] text-gray-500'>Change Password</p>
                            </div>
                            <div className={`flex items-center gap-5 px-5 py-2 cursor-pointer ${activeSection === 'contact' ? 'bg-gray-100 rounded-[10px]' : ''}`} onClick={() => setActiveSection('contact')}>
                                <LogOut size={27} strokeWidth={1} />
                                <p className='text-[20px] text-gray-500'>Logout</p>
                            </div>
                        </div>
                        <p className='text-[22px] font-medium mt-12'>Orders</p>
                        <div className='mt-5 flex flex-col gap-8'>
                            <div className={`flex items-center gap-5 px-5 py-2 cursor-pointer ${activeSection === 'orders' ? 'bg-gray-100 rounded-[10px]' : ''}`} onClick={() => {if (orders.length === 0) { ordersList(); } setActiveSection('orders'); }}>
                                <ClipboardList size={27} strokeWidth={1} />
                                <p className='text-[20px] text-gray-500'>orders</p>
                            </div>
                        </div>

                    </div>
                    {/* content */}
                    {renderSection()}
                </div>
            </div>
        </div>
    )
}


export default page