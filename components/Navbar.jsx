import { DropdownMenuContent, DropdownMenuItem, DropdownMenuRoot, DropdownMenuTrigger } from '@radix-ui/themes';
import axios from 'axios';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import ButtonLogout from '../components/ButtonLogout';
import Button from './Button';
import GoogleButton from './GoogleButton';

export default async function Navbar({ baseUrl }) {

    const cookieStore = cookies()
    const token = cookieStore.get('token')
    let user

    if (token?.value) {
        try {
            const header = `Bearer ${token.value}`
            const res = await axios.get(`${baseUrl}/auth/profile`, { headers: { Authorization: header } })
            user = res.data.data
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <header>
            <nav className="flex py-8 px-16 sm:w-[100%] w-full justify-between items-center ">
                <div>
                    <img src="https://res.cloudinary.com/dpyunxjop/image/upload/v1705389735/7e4838c4-3643-4d2d-9b33-69154b1b9b51_p4uujm.jpg" className='w-[80px] rounded-lg shadow' />
                </div>
                <ul className='gap-10 sm:flex hidden'>
                    <li><Link href="/" className='hover:text-slate-200 text-white'>Home</Link></li>
                    <li><a href="#howto" className='hover:text-slate-200 text-white'>How to?</a></li>
                    <li><a href="#contact" className='hover:text-slate-200 text-white'>Contact</a></li>
                </ul>
                 
                {user ?
                    <DropdownMenuRoot >
                        <DropdownMenuTrigger className='hover:cursor-pointer' >

                            <img className="object-contain h-14 w-14 rounded-full" src={user.picture}></img>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem ><Link href='/dashboard' >Dashboard</Link></DropdownMenuItem>
                            <DropdownMenuItem><ButtonLogout baseUrl={baseUrl} /></DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenuRoot>


                    : <Button baseUrl={baseUrl} text={<FcGoogle />}></Button>}

            </nav>
        </header>
    )
}
