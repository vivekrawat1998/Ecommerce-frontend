import React from 'react'

const Login = () => {
    return (
        <button className="group relative overflow-hidden cursor-pointer px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium text-sm hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="relative">
                    Sign In
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
            </div>
        </button>
    )
}

export default Login