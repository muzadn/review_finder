import Image from 'next/image'
import React from 'react'
import Button from './Button'

export default function About() {
    return (
        <section>
            <div className='text-3xl text-center uppercase font-bold'>About</div>
            <div className='my-20 mt-20 flex flex-wrap'>
                <div className=' w-full sm:w-[50%]'>
                    <Image src="/hero-image.png" width={500} height={400} alt="About image" className='rotate-[-1deg] rounded-lg overflow-hidden object-cover' style={{ height: '30vh' }} />
                </div>
                <div className='w-full sm:w-[50%] sm:mt-0 mt-10'>
                    <div className="text-2xl font-bold mb-2">Reviews</div>
                    <p className='mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dignissimos suscipit, odit quas, libero ratione cum neque nihil, harum consectetur vitae ad qui officiis. Explicabo, necessitatibus eaque. Neque, alias possimus.</p>
                    <Button link="/signup" text="Get Started" />
                </div>
            </div>
        </section>
    )
}