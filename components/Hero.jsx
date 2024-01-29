import { cookies } from 'next/headers';
import { FaCheckCircle } from "react-icons/fa";
import GoogleButton from "@/components/GoogleButton"
export default function Hero() {
    let cookieStore = cookies();
    let baseUrl = process.env.BASEURL;
    let loggedIn = cookieStore.get('token');
    let token = loggedIn?.value || ""
    return (
        <section>
           
            <div className='min-h-[72vh] flex items-center justify-center flex-col'>
                <div className="heading text-center">
                    <h1 className='text-5xl font-bold text-transparent fill-none bg-clip-text bg-gradient-to-b from-15% to-purple-800 from-pink-600 inline-block'>The Ultimate Review Finder</h1>
                    <p className='text-xl'>We Show your Reviews on your website</p>
                </div>
                {
                    !token?
                    <GoogleButton text="Signin with google" baseUrl={baseUrl} />
                         :""
                }
                <div className='sm:flex sm:gap-10 my-10 flex-wrap '>
                    <div className='flex items-center my-3'>
                        <FaCheckCircle className='text-purple-500 text-2xl inline-block mr-2' style={{ filter: "drop-shadow(2px 2px 15px purple)" }} />
                        <span className=''>Free of cost</span>
                    </div>
                    <div className='flex items-center my-3'>
                        <FaCheckCircle className='text-purple-500 text-2xl inline-block mr-2' style={{ filter: "drop-shadow(2px 2px 15px purple)" }} />
                        <span className=''>Upto 20 Reviews</span>
                    </div>
                    <div className='flex items-center my-3'>
                        <FaCheckCircle className='text-purple-500 text-2xl inline-block mr-2' style={{ filter: "drop-shadow(2px 2px 15px purple)" }} />
                        <span className=''>Iframe Element</span>
                    </div>
                </div>
            </div>

        </section>
    )
}
