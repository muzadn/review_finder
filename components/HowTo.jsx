"use client"
import React from 'react'
import Instruction from "./Instruction";
export default function HowTo() {

    let data = [
        {
            image: "https://res.cloudinary.com/dpyunxjop/image/upload/v1705579510/business-two.png",
            heading: "Get the Link",
            textArray: ["Go to google maps", "Search your business", "Copy the URL", "Paste it"]
        },
        {
            image: "https://res.cloudinary.com/dpyunxjop/image/upload/v1705570145/business-one.png",
            heading: "Select the Business",
            textArray: ["Select your business by clicking the Select button", "Your Reviews will be fetched within 10 minutes, Be Patient", "Your Reviews will be visible on the page after they are fetched"]
        },
        {
            image: "https://res.cloudinary.com/dpyunxjop/image/upload/v1705579512/business-three.png",
            heading: "Select Reviews",
            textArray: ["Select the Reviews You want to show on your website", "Click on the Save button", "You'll have the Preview of the Reviews", "Click on the Copy Iframe or Script and Paste it on your website"]
        }
    ]
    return (
        <section className='' id="howto">
            <div className='text-center heading'>
                <div className="text-3xl text-purple-100 font-bold uppercase">how to use ?</div>
                <div className=" text-transparent bg-clip-text text-xl lowercase bg-gradient-to-r from-purple-700 to-pink-700 inline-block m-x-auto">How to Integrate ?</div>
            </div>

            {
                data.map((item, index) => (
                    <Instruction key={index} image={item.image} heading={item.heading} textArray={item.textArray} reverse={(index % 2)} index={index} contentLength={data.length} />
                ))
            }

        </section>
    )
}
