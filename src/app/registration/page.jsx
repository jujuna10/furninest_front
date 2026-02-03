'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';

function page() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        terms: ''
    });
    const route = useRouter()
    const { login } = useAuth();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            setErrors({
                terms: 'Please agree to the terms and conditions'
            });
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrors({
                confirmPassword: 'Passwords do not match'
            });
            return;
        }
        if (!validateEmail(formData.email)) {
            setErrors({
                email: 'Please enter a valid email address'
            });
            return;
        }
        console.log('რეგისტრაცია:', formData);
        alert('რეგისტრაცია წარმატებულია!');
        // fetch("http://localhost:999/furninest/public/users", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         name: formData.firstName,
        //         lastname: formData.lastName,
        //         email: formData.email,
        //         password: formData.password
        //     })
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data);
        //     const loginResult = await login(formData.email, formData.password);

        //     // route.push('/profile')
        // })
        // .catch(err => {
        //     console.error(err);
        // });
        try {
            const registerRes = await fetch("http://localhost:999/furninest/public/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.firstName,
                    lastname: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            });

            const registerData = await registerRes.json();
            console.log('Registration:', registerData);

            const loginResult = await login(formData.email, formData.password);
            
            if (!loginResult.success) {
                setErrors({ general: 'Registration successful but login failed' });
            }
            
        } catch (err) {
            console.error(err);
            setErrors({ general: 'Registration failed' });
        }
    };

    


    return (
        <div className="min-h-screen bg-[rgb(255,239,239)] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-[29%]">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">Create Account</h1>

                <button type="button" className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-lg py-3 px-4 hover:bg-gray-50 transition-all duration-300 mb-6">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="font-medium text-gray-700">Register with Google</span>
                </button>

                <div className="relative flex items-center justify-center mb-6">
                    <div className="border-t border-gray-200 w-full"></div>
                    <span className="absolute bg-white px-4 text-gray-400 text-2xl">or</span>
                </div>

                <form>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your name" className="w-full px-4 py-3 border-2 border-gray-200 rounded-[2px] focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">LastName</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" className="w-full px-4 py-3 border-2 border-gray-200 rounded-[2px] focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className={`w-full px-4 py-3 border-2 border-gray-200 rounded-[2px] focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300 ${errors.email ? 'border-red-500' : ''}`} />
                            {errors.email && (
                                <p className="bg-red-500 text-white px-3 py-2 rounded-[5px] mt-5">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className={`relative ${errors.password ? 'border-red-500' : ''}`}>
                                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-3 border-2 border-gray-200 rounded-[2px] focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300 pr-12" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Repeat Password</label>
                            <div className={`relative ${errors.confirmPassword ? 'border-red-500' : ''}`}>
                                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className={`w-full px-4 py-3 border-2 border-gray-200 rounded-[2px] focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-300 pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`} />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showConfirmPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="bg-red-500 text-white px-3 py-2 rounded-[5px] mt-5">{errors.confirmPassword}</p>
                            )}                        
                        </div>

                        <div className="flex items-start gap-2">
                            <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                            <label htmlFor="terms" className="text-sm text-gray-600">I agree to <span className="text-purple-600 font-semibold cursor-pointer hover:text-purple-700">Terms and Conditions</span>
                            </label>
                            {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
                        </div>

                        <button onClick={handleSubmit} className='bg-[rgb(43,139,136)] text-white text-[18px] w-full hover:translate-y-[-2px] duration-300 hover:cursor-pointer px-2 lg:px-7 py-1 lg:py-3 rounded-[5px]'>Registration</button>

                    </div>
                </form>



                <p className="text-center text-sm text-gray-600 mt-6">Already have an account?{' '}
                    <button type="button" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors cursor-pointer" onClick={() => route.push('/login')}>Login</button>
                </p>
            </div>
        </div>
    )
}

export default page