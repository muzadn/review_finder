"use client";
import axios from 'axios';
import React from 'react'

export default function ContactForm() {
    let errorRef = React.useRef(null);
    let submitBtnRef = React.useRef(null);
    let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.email.value == "" || e.target.email.value == " " || e.target.email.value == null || e.target.email.value.trim() == "") {
            errorRef.current.innerText = "Please enter an email"
            errorRef.current.style.display = "block";
            setTimeout(() => {
                errorRef.current.style.display = "none";
            }, 2000);
            return;
        } else if (!(emailRegex.test(e.target.email.value))) {
            errorRef.current.style.display = "block";
            errorRef.current.innerText = "Please enter a valid email"
            setTimeout(() => {
                errorRef.current.style.display = "none";
            }, 2000);
            return;
        } else if (e.target.email.value.split(" ").length > 1) {
            errorRef.current.style.display = "block";
            errorRef.current.innerText = "Please enter a valid email"
            setTimeout(() => {
                errorRef.current.style.display = "none";
            }, 2000);
            return;
        }

        submitBtnRef.current.innerText = "Submitting..."
        submitBtnRef.current.disabled = true;

        let data = {
            email: e.target.email.value,
            query: e.target.query.value
        }

        try {
            let response = await axios.post(`${process.env.BASEURL}/contact`, data);
            if (response.status === 201) {
                submitBtnRef.current.innerText = "Submitted"
                e.target.email.value = ""
                e.target.query.value = ""
                setTimeout(() => {
                    submitBtnRef.current.innerText = "Submit"
                    submitBtnRef.current.disabled = false;
                }, 2000);
            }

        } catch (e) {
            submitBtnRef.current.innerText = "Error"
            setTimeout(() => {
                submitBtnRef.current.innerText = "Submit"
                submitBtnRef.current.disabled = false;
            }, 2000);
        }
    }
    return (
        <section className='my-10' id="contact">
            <div className='text-center heading mb-10'>
                <div className="text-3xl text-purple-100 font-bold uppercase">Contact Us</div>
                <div className=" text-transparent bg-clip-text text-xl lowercase bg-gradient-to-r from-purple-700 to-pink-700 inline-block m-x-auto">want to talk to us ?</div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 sm:w-[40%] w-full mx-auto'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="">Enter your email</label>
                    <Input type={"text"} placeholder={"johndoe@gmail.com"} name="email" />
                    <div className="caption text-red-600 hidden" ref={errorRef}>Please enter an email</div>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="">Enter the query</label>
                    <textarea type={"text"} placeholder={"We require your product for other platforms, can you do it?"} className=' px-2 py-2 rounded border border-slate-400 outline-none text-black' name="query" />
                </div>
                <div className='flex flex-col gap-1'>
                    <button className='py-2  rounded my-5 hover:bg-[#ccc] hover:bg-opacity-5 bg-gradient-to-r to-purple-700 from-pink-700' ref={submitBtnRef}>Submit</button>
                </div>
            </form>
        </section>
    )
}


function Input({ type, placeholder, className, ...props }) {

    return (
        <input type={type} placeholder={placeholder} className={`${className} px-2 py-2 rounded border border-slate-400 outline-none text-black`} {...props} />
    )
}