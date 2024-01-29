import React from 'react'

export default function Instruction({ image, heading, textArray, reverse, index, contentLength }) {
    return (
        <div className={`relative flex flex-col ${reverse ? "sm:flex-row-reverse" : "sm:flex-row"} justify-center items-start gap-10 py-10 px-10`}>
            <div className="w-full sm:w-[47%] rounded-lg overflow-hidden h-[200px] justify-self-start" style={{ boxShadow: "0px 0px 100px rgba(128,0,128, 0.1)" }}>
                <img src={image} alt={heading} />
            </div>

            {
                contentLength !== index + 1 ? <div className='absolute h-full top-10  w-1 bg-white sm:block hidden rounded'></div> : contentLength - 1 === index ? <div className='absolute h-[200px] rounded top-10  w-1 bg-white sm:block hidden'></div> : null
            }

           
            <div className='absolute sm:flex hidden h-10 w-10 top-[45%] p-4 bg-gradient-to-b from-pink-500 to-purple-900  items-center justify-center rounded-full' style={{ boxShadow: "0px 0px 50px purple, inset 2px 2px 5px rgba(255,255,255,0.4), inset -2px -2px 5px rgba(0,0,0,0.8)" }}>{index + 1}</div>
            <div className={`w-full sm:w-[49%] px-4 ml-5`}>
                <div className="heading text-2xl font-bold mb-4">{heading}</div>
                <ul className='list-disc ml-4'>
                    {
                        textArray.map((text, index) => (
                            <li key={index}>{text}.</li>
                        ))}
                    {/* <li>Go to <a href="https://maps.google.com" className='text-blue-400 underline underline-offset-2'>google maps</a></li>
                        <li>Search your business</li>
                        <li>Copy the URL</li>
                        <li>Paste it</li> */}
                </ul>
            </div>
        </div>
    )
}
