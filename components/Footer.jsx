import React from 'react'
import { FaGoogle } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className='p-5 bg-gradient-to-br to-slate-950 from-black relative overflow-hidden'>
            <div className='absolute top-[-50px] left-24 h-[200px] w-[200px] rounded-full bg-gradient-to-br from-purple-900 to-pink-700 blur-3xl -z-10'></div>
            {/* <div className='flex justify-between px-20 gap-10 items-center'>
                <div className='flex gap-10 items-center'>

                    <div className='w-[100px] h-20 rounded  overflow-hidden'>
                        <img src="https://source.unsplash.com/random" alt="random" className='rounded' style={{ boxShadow: "0px 0px 50px rgba(128,0,128,0.4)" }} />
                    </div>
                    <div>
                        <button className='px-5 py-2 border flex items-center justify-center gap-3 m-auto border-white my-3 rounded hover:bg-slate-50 hover:bg-opacity-15'>
                            <FaGoogle />
                            Get Started with google
                        </button>
                    </div>
                </div>

            </div> */}
            <div className='flex flex-col gap-5 text-center text-slate-400'>
                &copy; 2024 All Rights Reserved <br />
                <a href="https://gildware.com" className='my-0 py-0'>Gildware Technologies</a>
            </div>
        </footer>
    )
}
