'use client'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'

export default function GoogleButton({ text, style, baseUrl }) {
    return (
        <button onClick={() => {
            window.location.href = `${baseUrl}/auth/google`;
        }} className='px-5 py-2 border flex items-center justify-center gap-3 border-white my-3 rounded hover:bg-slate-50 hover:bg-opacity-15 m-auto' style={style}>
            <FaGoogle />
            {text}
        </button>
    )
}
