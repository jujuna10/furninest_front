'use client'
import { OrderContext } from '@/context/Order';
import React, { useContext, useState } from 'react'
import {Roboto_Condensed } from "next/font/google";
import Image from 'next/image';

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});


function page() {
    const { order, setOrder, userNameContext } = useContext(OrderContext);
    console.log(order)
    const [userName,setUserName] = useState(null)
    const [formData, setFormData] = useState({ firstName: "", lastName: "", address: "", buildingNumber: "", houseNumber: "", phone: "" });
    const [paymentData, setPaymentData] = useState({ bank: "", cardNumber: "", expiryDate: "", cvv: "" });


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
        console.log('User:order', data);
        console.log(data.user,'user')
        setUserName(data.user.name)

      } catch (err) {
        console.error(err);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    };

    const handlePaymentChange = (e) => {
      const { name, value } = e.target;

      setPaymentData((prev) => ({
        ...prev,
        [name]: value
      }));
    };


  return (
    <div className='p-12'>
      <div className='w-full flex justify-end'>
        <div className='w-14 h-14 rounded-[50%] cursor-pointer bg-linear-to-b from-[rgb(171,120,233)] to-[rgb(255,105,150)] flex items-center justify-cener'>
          <p className='text-white text-[20px] font-bold'>{userNameContext}</p>
        </div>
      </div>
      <div className='w-full flex justify-between items-center'>
        <div>
          {/* order checkout form */}
          {/* addres form */}
          <div className='w-full mb-12 flex flex-col  shadow-md p-5 rounded-[10px]'>
            <h1 className={robotoCondensed.className} style={{fontSize:'35px',fontWeight:'700'}}>address</h1>
            <div className="mt-5">
            <form className="flex flex-col gap-4 w-full">
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm mb-1 text-gray-500">First Name</label>
                  <input type="text" placeholder="Enter first name" className="border border-gray-300 transition-all duration-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm mb-1 text-gray-500">Last Name</label>
                  <input type="text" placeholder="Enter last name" className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" value={formData.lastName} onChange={handleChange} />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-1 text-gray-500">Address</label>
                <input type="text" placeholder="Enter full address" className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" value={formData.address} onChange={handleChange} />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm mb-1 text-gray-500">Building Number</label>
                  <input type="text" placeholder="Building" className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" value={formData.buildingNumber} onChange={handleChange} />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm mb-1 text-gray-500">House Number</label>
                  <input type="text" placeholder="House" className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" value={formData.houseNumber} onChange={handleChange} />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-1 text-gray-500">Phone Number</label>
                <input type="tel" placeholder="Enter phone number" className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" value={formData.phone} onChange={handleChange} />
              </div>
            </form>
          </div>

          </div>
          {/* payment */}
          <div className="w-full flex flex-col justify-start items-start shadow-md p-5 rounded-[10px]">
            <h1 className={robotoCondensed.className} style={{ fontSize: "35px", fontWeight: "700" }}>Payment</h1>

            <div className="mt-5 w-full">
              <form className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="text-sm mb-1 text-gray-500">Payment Method</label>
                  <select name="bank" value={paymentData.bank} onChange={handlePaymentChange} className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)] bg-white">
                    <option value="">Select bank</option>
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm mb-1 text-gray-500">Card Number</label>
                  <input type="text" name="cardNumber" placeholder="1234 5678 9011 1121" value={paymentData.cardNumber} onChange={handlePaymentChange} className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" />
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col w-1/2">
                    <label className="text-sm mb-1 text-gray-500">Expiration Date</label>
                    <input type="text" name="expiryDate" placeholder="MM/YY" value={paymentData.expiryDate} onChange={handlePaymentChange} className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label className="text-sm mb-1 text-gray-500">CVV</label>
                    <input type="password" name="cvv" placeholder="123" value={paymentData.cvv} onChange={handlePaymentChange} className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" />
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
        {/* products */}
        {order && order.map((item,index) => (
          <div key={index}>
            {/* photo and name */}
            <div>
              <Image src={item.image_url} alt={item.name} unoptimized width={100} height={100} />
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default page