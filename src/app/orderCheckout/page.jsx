'use client'
import { OrderContext } from '@/context/Order';
import React, { useContext, useEffect, useState } from 'react'
import { Roboto_Condensed } from "next/font/google";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});


function page() {
  const { order, setOrder, userNameContext } = useContext(OrderContext);
  console.log(order)
  const [userName, setUserName] = useState(null)
  const [formData, setFormData] = useState({ firstName: "", lastName: "", address: "", buildingNumber: "", houseNumber: "", phone: "" });
  const [paymentData, setPaymentData] = useState({ bank: "", cardNumber: "", expiryDate: "", cvv: "" });
  const [error, setError] = useState([])
  const route = useRouter()

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUserName(JSON.parse(storedUsername));
    }
  }, [])

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
      console.log(data.user, 'user')
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

  const getInputErrors = () => {
    setError(prev => {
      let errors = [...prev]
      const handleError = (condition, message) => {
        if (condition && !errors.includes(message[1])) {
          errors.push(message[1])
        }
        if (!condition && errors.includes(message[1])) {
          errors = errors.filter(err => err !== message[1])
        }
      }

      handleError(formData.phone.length !== 9, ['phoneError', "Phone number must be at least 10 characters long"])
      handleError(paymentData.cardNumber.length < 5, ['cardNumberError', "Card number must be at least 5 characters long"])
      handleError(paymentData.cvv.length < 3, ['cvvError', "CVV must be at least 3 characters long"])

      if (paymentData.expiryDate) {
        const [month, year] = paymentData.expiryDate.split('/')
        const expiryDate = new Date(`20${year}`, month)
        handleError(expiryDate <= new Date(), "Expiry date must be in the future")
      }

      return errors
    })
  }


  const placeOrder = async () => {
    getInputErrors();
    if (error.length > 0) {
      alert('Check form errors first!');
      return;
    }

    try {
      const response = await fetch('http://localhost:999/furninest/public/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          user: userName,
          products: order.map(item => ({
            product_id: item.id,
            quantity: item.boughtProduct,
            price: item.price
          })),
          total: order.reduce((sum, item) => sum + item.price * item.boughtProduct, 0) + 5.54
        })
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      localStorage.removeItem('cart');
      route.push('/profile');
      console.log('Order placed:', data);

      alert('Order successfully placed!');
      console.log('yes')

    } catch (err) {
      console.error('Error placing order:', err);
    }
  };


  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    setPaymentData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  console.log(error, 'error')




  return (
    <div className='p-12'>
      <div className='flex items-center justify-between'>
        <Image src='/mainlogo.png' alt='logo' width={125} height={125} />
        <div className='w-full flex justify-end'>
          <div className='w-14 h-14 rounded-[50%] cursor-pointer bg-linear-to-b from-[rgb(171,120,233)] to-[rgb(255,105,150)] flex items-center justify-center'>
            {/* <p className='text-white text-[20px] font-bold'>{userNameContext[0]}</p> */}
            <p className='text-white text-[20px] font-bold'>{userName && userName[0]}</p>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-between items-start mt-12'>
        <div className='w-[50%]'>
          {/* order checkout form */}
          {/* addres form */}

          <div className='w-full mb-12 flex flex-col shadow-md p-5 rounded-[10px]'>
            <h1 className={robotoCondensed.className} style={{ fontSize: '35px', fontWeight: '700' }}>address</h1>
            <div className="mt-5">
              <form className="flex flex-col gap-4 w-full">
                <div className="flex gap-4">
                  <div className="flex flex-col w-1/2">
                    <label className="text-sm mb-1 text-gray-500">First Name</label>
                    <input type="text" name="firstName" placeholder="Enter first name" className="border border-gray-300 transition-all duration-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" value={formData.firstName} onChange={handleChange} />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="text-sm mb-1 text-gray-500">Last Name</label>
                    <input type="text" name="lastName" placeholder="Enter last name" className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" value={formData.lastName} onChange={handleChange} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm mb-1 text-gray-500">Address</label>
                  <input type="text" name="address" placeholder="Enter full address" className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" value={formData.address} onChange={handleChange} />
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col w-1/2">
                    <label className="text-sm mb-1 text-gray-500">Building Number</label>
                    <input type="text" name="buildingNumber" placeholder="Building" className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" value={formData.buildingNumber} onChange={handleChange} />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="text-sm mb-1 text-gray-500">House Number</label>
                    <input type="text" name="houseNumber" placeholder="House" className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" value={formData.houseNumber} onChange={handleChange} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm mb-1 text-gray-500">Phone Number</label>
                  <input type="tel" name="phone" placeholder="Enter phone number" className={`border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)] ${error.includes('Phone number must be at least 10 characters long') ? 'border border-red-500' : 'border border-gray-300'}`} value={formData.phone} onChange={handleChange} />
                  {error.includes('Phone number must be at least 10 characters long') && <div id='phoneError' className='text-white bg-red-500 mt-4 rounded-[4px] px-3 py-2'><p>Phone number must be at least 10 characters long</p></div>}
                </div>
              </form>
            </div>

          </div>
          {/* payment */}

          <div className="w-full flex flex-col justify-start items-start shadow-md p-5 rounded-[10px]">
            <h1 className={robotoCondensed.className} style={{ fontSize: "35px", fontWeight: "700" }}>Payment</h1>

            <div className="mt-5 w-full">
              <form className="flex flex-col gap-4">
                <div className="flex justify-between gap-4 items-center w-full">
                  <div className="flex flex-col justify-between w-[50%]">
                    <label className="text-sm mb-1 text-gray-500">Payment Method</label>
                    <select name="bank" value={paymentData.bank} onChange={handlePaymentChange} className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)] bg-white">
                      <option value="">Select bank</option>
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                      <option value="paypal">PayPal</option>
                    </select>

                  </div>

                  <div className="flex flex-col w-[50%]">
                    <label className="text-sm mb-1 text-gray-500">Card Number</label>
                    <input type="text" name="cardNumber" placeholder="1234 5678 9011 1121" value={paymentData.cardNumber} onChange={handlePaymentChange} className={`border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)] ${error.includes('Card number must be at least 5 characters long') ? 'border border-red-500' : 'border border-gray-300'}`} />
                    {error.includes('Card number must be at least 5 characters long') && <div id='cardNumberError' className='text-white bg-red-500 mt-4 rounded-[4px] px-3 py-2'><p>Card number must be at least 5 characters long</p></div>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col w-1/2">
                    <label className="text-sm mb-1 text-gray-500">Expiration Date</label>
                    <input type="text" name="expiryDate" placeholder="MM/YY" value={paymentData.expiryDate} onChange={handlePaymentChange} className="border border-gray-300 rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)]" />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label className="text-sm mb-1 text-gray-500">CVV</label>
                    <input type="password" name="cvv" placeholder="123" value={paymentData.cvv} onChange={handlePaymentChange} className={`rounded-[5px] px-3 py-2 focus:outline-none focus:border-[rgb(43,139,136)] ${error.includes('CVV must be at least 3 characters long') ? 'border border-red-500' : 'border border-gray-300'}`} />
                    {error.includes('CVV must be at least 3 characters long') && <div id='cvvError' className='text-white bg-red-500 mt-4 rounded-[4px] px-3 py-2'><p>CVV must be at least 3 characters long</p></div>}
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
        {/* products */}

        <div className='shadow-md p-5 rounded-[10px] flex flex-col gap-4 w-[45%]'>
          {order && order.map((item, index) => (
            <div key={index} className='flex justify-between w-full items-center'>
              {/* photo and name */}
              <div className='flex gap-5'>
                <Image src={item.image_url} alt={item.name} unoptimized width={100} height={100} className='rounded-[5px]' />
                <div className='flex flex-col gap-2'>
                  <p className='text-[25px] font-medium'>{item.name}</p>
                  <p className='text-gray-500'>Quantity: {item.boughtProduct}</p>
                </div>
              </div>
              <p className='text-[22px] font-medium text-gray-600'>${item.price * item.boughtProduct}</p>
            </div>
          ))}
          <hr className='border-gray-300' />
          <div className='flex justify-between w-full items-center'>
            <p className='text-gray-500'>Subtotal</p>
            <p className='text-gray-500'>${order.reduce((total, item) => total + item.price * item.boughtProduct, 0)}</p>
          </div>
          <div className='flex justify-between w-full items-center'>
            <p className='text-gray-500'>Shipping</p>
            <p className='text-gray-500'>$5.54</p>
          </div>
          <div className='flex justify-between w-full items-center'>
            <p className='text-[22px] font-medium text-gray-600'>Total</p>
            <p className='text-[22px] font-medium text-gray-600'>${order.reduce((total, item) => total + item.price * item.boughtProduct, 5.54)}</p>
          </div>
          <button className='bg-[rgb(43,139,136)] text-white py-2 px-5 rounded-[5px]' onClick={() => placeOrder()}>Place Order</button>
        </div>
      </div>
    </div>
  )
}

export default page