import React from 'react'
import { cookies } from 'next/headers';
import { FaGoogle } from 'react-icons/fa'
import GoogleButton from './GoogleButton'

export default function Simplify() {
    let cookieStore = cookies();
    let loggedIn = cookieStore.get('token');
    let token = loggedIn?.value || ""
    let baseUrl = process.env.BASEURL;
    return (
        <section className='text-center sm:my-32 my-5 '>
            <div className="font-bold sm:text-4xl text-2xl inline-block px-4 py-4 bg-[#111] rounded-md shadow-md mb-4" style={{ boxShadow: "inset 2px 2px 5px black, inset -2px -2px 5px #222" }}>Simplify Testimonials</div>
            <div className="text-slate-400 w-[90%] sm:w-[29%] m-auto">We&#39;ve simplified the hectic review gathering and showing process by providing a one stop solution </div>
            
            {
                !token?
                        <GoogleButton text="Signin with google" baseUrl={baseUrl} />
                     : ""
            }
        </section>
    )
}
