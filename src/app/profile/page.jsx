'use client'
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { OrderContext } from '@/context/Order';


function page() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showCart,setShowCart] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState([])
  const [cartLoaded, setCartLoaded] = useState(false);
  const [usernameLoaded, setUsernameLoaded] = useState(false);
  const route = useRouter();
  const { user, logout, loading } = useAuth();
  const [userName,setUserName] = useState(null)
  const { order, setOrder, userNameContext, setUserNameContext } = useContext(OrderContext);



  const categoriesWithSubs = {
    'Living Room': ['Armchair', 'Pouf', 'Sofa', 'Side Table', 'Bookshelf', 'Display Cabinet', 'Coffee Table', 'Wall Unit'],
    'Bedroom': ['Bed', 'Disbed', 'Wardrobe', 'Nightstand', 'Work Desk', 'Dressing Table', 'Wall Unit'],
    'Kitchen': ['Wall Cabinet', 'Work Top', 'Appliance Cabinet', 'Dining Chair', 'Dining Table']
  };

  const categories = Object.keys(categoriesWithSubs);
  const applyFilters = async () => {
    try {
      const params = new URLSearchParams();

      if (priceRange[0] > 0) params.append('minPrice', priceRange[0]);
      if (priceRange[1] < 1000) params.append('maxPrice', priceRange[1]);

      if (searchQuery) params.append('search', searchQuery);

      if (selectedCategories.length > 0) {
        params.append('categories', selectedCategories.join(','));
      }

      if (selectedSubcategories.length > 0) {
        params.append('subcategories', selectedSubcategories.join(','));
      }

      const response = await fetch(`http://localhost:999/furninest/public/productsList?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log('Raw response:', text);

      const data = JSON.parse(text);
      console.log('Parsed data:', data);

      setProducts(data.data);

    } catch (err) {
      console.error('Error:', err);
      console.error('Full error:', err.message);
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      applyFilters();
      return;
    }

    const timeout = setTimeout(() => {
      applyFilters();
    }, 400);

    return () => clearTimeout(timeout);          
  }, [searchQuery])

  useEffect(() => {
    if (!loading && !user) {
      route.push('/login');
    }
  }, [user, loading, route]);

   if (!user) {
      console.log('userinfo',user)
    }



  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const response = await fetch(
          'http://localhost:999/furninest/public/productsList'
        );

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log('Initial products:', data);

        setProducts(data.data)
      } catch (err) {
        console.error(err);
      }
    };

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
        setUserName(data.user.name)
        setUserNameContext(data.user.name,data.user.lastname)

      } catch (err) {
        console.error(err);
      }
    };

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setAddedProducts(JSON.parse(storedCart));
    }
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUserName(JSON.parse(storedUsername));
    }
    setCartLoaded(true);
    setUsernameLoaded(true);

    fetchInitialProducts();
    fetchUser();
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;
    localStorage.setItem('cart', JSON.stringify(addedProducts));
  }, [addedProducts, cartLoaded]);

  useEffect(() => {
    if (!usernameLoaded) return;
    localStorage.setItem('username', JSON.stringify(userName));
  }, [userName, usernameLoaded]);


  const checkout = () => {
    setOrder(addedProducts)
    route.push('/orderCheckout')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleExpandCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSubcategory = (subcategory) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategory)
        ? prev.filter(s => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([priceRange[0], value]);
  };

  // const addProducts = (productId) => {
  //   const product = products.find(p => p.id === productId);
  //   let productCount = 1
  //   addedProducts.map((item) => {
  //     if(item.id === productId){
  //       productCount++
  //     }
  //   })
  //   product['boughtProduct'] = productCount
  //   if (product && product.quantity > 0 && !addedProducts.some(p => p.id === productId)) {
  //       setAddedProducts(prev => {
  //         const newProducts = [...prev, product];
  //         console.log('Added products:', newProducts);
  //         return newProducts;
  //       });
  //   }
  //   else if(addedProducts.some(p => p.id === productId)) {
  //     addedProducts.find(p => p.id === productId).boughtProduct++
  //     console.log(addedProducts.find(p => p.id === productId).boughtProduct)
  //   }
  // }

  const addProducts = (productId) => {
    setAddedProducts(prev => {
      const existing = prev.find(p => p.id === productId);

      if (existing) {
        return prev.map(p => p.id === productId ? { ...p, boughtProduct: p.boughtProduct + 1 } : p);
      }

      const product = products.find(p => p.id === productId);
      if (!product || product.quantity <= 0) return prev;

      return [...prev, { ...product, boughtProduct: 1 }];
    });
  };

  const productsQuantityChange = (id, changeType) => {
    setAddedProducts(prev => {
      return prev.map(p => p.id === id ? { ...p, boughtProduct: p.boughtProduct + (changeType === 'add' ? 1 : -1) } : p);
    });
  };

  console.log('Added products:', addedProducts);


  return (
      
      <div className='w-full flex flex-col gap-20 p-12'>
        <div className='flex justify-between w-full items-center'>
          <Image src="/mainlogo.png" alt="Logo" width={100} height={100} className='w-[125px] h-[125px] object-contain' />
          <div className='flex justify-end items-center gap-12'>
            <div className="w-[50%] flex items-center gap-5 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(43,139,136)] focus:border-transparent">
              <Image src="/search.png" alt="Search" width={20} height={20} className='text-[20px]' onClick={() => applyFilters()} />
              <input type="text" placeholder="Search" className='focus:outline-none focus:border-transparent' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
            </div>
            <div>
              <div className='relative flex gap-12'>
                <div className='flex py-2 relative px-5 justify-center items-center gap-5 bg-[rgb(43,139,136)] rounded-lg cursor-pointer' onClick={() => setShowCart(!showCart)}>
                  <Image src="/shopping-cart.png" alt="Filter" width={35} height={35} className='invert-100' />
                  <p className='text-white text-[20px]'>Cart</p>
                  {addedProducts.length > 0 && (
                    <p className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-[12px] px-2 py-1 rounded-full'>{addedProducts.reduce((total, product) => total + product.boughtProduct, 0)}</p>
                  )}
                </div>
                <div className='w-14 h-14 rounded-[50%] cursor-pointer bg-linear-to-b from-[rgb(171,120,233)] to-[rgb(255,105,150)] flex items-center justify-center' onClick={() => route.push('/settings')}>
                  <p className='text-white text-[20px] font-bold'>{usernameLoaded && userName ? userName[0] : ''}</p>
                </div>
                <div>
                </div>
                {addedProducts.length > 0 && showCart && (
                  <div className='absolute top-[110%] bg-[rgb(250,248,248)] shadow-lg w-[400px] rounded-[5px] -left-[50%] mt-12'>
                    <div className=' w-full px-5 py-4'>
                      <div className='flex justify-between items-center w-full'>
                        <p className='text-[22px]'>Shopping cart</p>
                        <Image src="/delete.png" alt="Close" width={25} height={25} className='text-[20px] cursor-pointer' onClick={() => localStorage.removeItem('cart')}/>
                      </div>
                      <hr className='w-full h-[2px] text-gray-300 mt-5' />
                    </div>
                    {addedProducts.length > 0 && addedProducts.map((product) => (
                      <div key={product.id} className=" px-5 py-5">
                        <div className='flex gap-5'>
                          <Image src={product.image_url} alt={product.name} width={70} height={70} unoptimized className="w-24 h-24 rounded-[10px] object-cover" />
                          <div className='flex gap-2 w-full justify-between'>
                            <div className='flex flex-col gap-4'>
                              <p className='flex gap-2 text-[19px] text-blue-950'>{product.boughtProduct}x<span>{product.name}</span></p>
                              <p className='text-[22px] font-medium text-[rgb(60,131,113)]'>${product.price * product.boughtProduct}</p>
                            </div>
                            <div className='flex gap-0'>
                              <div className='w-[45px] h-[45px] cursor-pointer bg-gray-100 border border-gray-300 flex items-center justify-center rounded-l-[5px]'  onClick={() => productsQuantityChange(product.id, 'minus')}>
                                <p className='text-[22px]'>-</p>
                              </div>
                              <div className='w-[45px] h-[45px] bg-gray-100 border border-gray-300 flex items-center justify-center'>
                                <p className='text-[22px]'>{product.boughtProduct}</p>
                              </div>
                              <div className='w-[45px] h-[45px] cursor-pointer bg-gray-100 border border-gray-300 flex items-center justify-center rounded-r-[5px]' onClick={() => productsQuantityChange(product.id, 'add')}>
                                <p className='text-[22px]'>+</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className='w-full h-[2px] text-gray-300 mt-5' />
                      </div>
                    ))}
                    <div className='w-full flex flex-col justify-between px-5 py-3'>
                      <div className='flex flex-col justify-end items-end'>
                        <p className='text-gray-500 text-[18px]'>Subtotal: ${addedProducts.reduce((total, product) => total + product.price * product.boughtProduct, 0)}</p>
                        <p className='text-gray-500 text-[18px]'>Shipping: $4.99</p>
                        <p className='text-gray-500 text-[18px]'>Tax: $8.98</p>
                      </div>
                      <hr className='w-full h-[2px] text-gray-300 mt-5 mb-5' />
                      <div className='flex justify-between items-center w-full'>
                        <p className='text-[rgb(43,139,136)] text-[22px] font-medium'>Total</p>
                        <p className='text-[22px] font-medium text-[rgb(60,131,113)]'>${addedProducts.reduce((total, product) => total + product.price * product.boughtProduct, 0)}</p>
                      </div>
                    </div>
                    <div className='flex items-center justify-center'>
                      <button className='w-[90%] bg-[rgb(43,139,136)] text-white text-[20px] font-medium py-2 px-3 mb-5 rounded-lg cursor-pointer' onClick={() => checkout()}>Checkout</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-20'>
          {/* filter */}
          <div className='w-[15%]'>
            <div className="mb-6">

              {showCategories && (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-3 transition" onClick={() => toggleExpandCategory(category)}>
                        <div className="flex items-center">
                          <input type="checkbox" checked={selectedCategories.includes(category)} onChange={(e) => { e.stopPropagation(); toggleCategory(category); }} className="w-5 h-5 rounded focus:ring-2 focus:ring-[rgb(43,139,136)] border-gray-300 cursor-pointer" style={{ accentColor: 'rgb(43,139,136)' }} />
                          <span className="ml-3 text-gray-700 font-medium">{category}</span>
                        </div>
                      </div>

                      {/* ქვეკატეგორიები */}
                      {expandedCategories.includes(category) && (
                        <div className="bg-gray-50 border-t border-gray-200 py-2 px-4">
                          {categoriesWithSubs[category].map((sub) => (
                            <label key={sub} className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded transition">
                              <input type="checkbox" checked={selectedSubcategories.includes(sub)} onChange={() => toggleSubcategory(sub)} className="w-4 h-4 rounded focus:ring-2 focus:ring-[rgb(43,139,136)] border-gray-300 cursor-pointer" style={{ accentColor: 'rgb(43,139,136)' }} />
                              <span className="ml-3 text-gray-600 text-sm">{sub}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            {/* ფასი */}
            <div className="mb-6">
              <button onClick={() => setShowPrice(!showPrice)} className="flex items-center justify-between w-full mb-3">
                <h3 className="text-lg font-semibold text-gray-700">Price</h3>
              </button>

              {showPrice && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-1">Min</label>
                      <input type="number" value={priceRange[0]} onChange={handleMinPriceChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(43,139,136)] focus:border-transparent" placeholder="0" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-1">Max</label>
                      <input type="number" value={priceRange[1]} onChange={handleMaxPriceChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(43,139,136)] focus:border-transparent" placeholder="1000" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <input type="range" min="0" max="2000" value={priceRange[1]} onChange={handleMaxPriceChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" style={{ accentColor: 'rgb(43,139,136)' }} />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₾0</span>
                      <span>₾2000</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            {/* ღილაკები */}
            <div className="flex gap-3">
              <button onClick={() => { setSelectedCategories([]); setSelectedSubcategories([]); setExpandedCategories([]); setPriceRange([0, 1000]); }} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">Clear</button>
              <button className="flex-1 px-4 py-2 bg-[rgb(43,139,136)] text-white rounded-lg hover:opacity-90 transition" onClick={() => applyFilters()}>Apply</button>
            </div>

            {/* არჩეული ფილტრები */}
            {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Selected Filters:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  {selectedCategories.length > 0 && (
                    <div>Category: {selectedCategories.join(', ')}</div>
                  )}
                  {selectedSubcategories.length > 0 && (
                    <div>Subcategory: {selectedSubcategories.join(', ')}</div>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                    <div>Price: ₾{priceRange[0]} - ₾{priceRange[1]}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* </div> */}

          {/* products */}
          <div className="w-[75%] p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="aspect-square overflow-hidden">
                    <Image src={product.image_url} alt={product.name} width={500} height={500} unoptimized className="w-full h-full" />
                  </div>
                  <div className="p-4">
                    <p className="text-xl font-bold text-[rgb(43,139,136)] mb-4">₾{product.price}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg text-gray-500 mb-2 truncate">{product.name}</h3>
                        <p className="text-md text-gray-900 mb-4">{product.quantity > 0 ? product.quantity + ' Unit' : 'Out of stock'}</p>
                      </div>
                      <button className="w-[35%] px-4 py-2 bg-[rgb(43,139,136)] text-white rounded-lg hover:opacity-90 transition" onClick={() => addProducts(product.id)}>Add to cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

  )
}

export default page