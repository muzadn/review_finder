import { DropdownMenuContent, DropdownMenuItem, DropdownMenuRoot, DropdownMenuTrigger } from '@radix-ui/themes';
import axios from 'axios';
import { cookies } from 'next/headers';
import { FcGoogle } from "react-icons/fc";
import ButtonLogout from '../components/ButtonLogout';
import Button from './Button';

export default async function NavbarRest({ baseUrl }) {

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
            <nav className="flex py-4 px-16 sm:w-[100%]  w-full justify-between items-center ">
                <div>
                    <img src="https://res.cloudinary.com/dpyunxjop/image/upload/v1705389735/7e4838c4-3643-4d2d-9b33-69154b1b9b51_p4uujm.jpg" className='w-[80px] rounded-lg shadow' />
                </div>
                {
                    user ?
                        <DropdownMenuRoot >
                            <DropdownMenuTrigger className='hover:cursor-pointer' >

                                <img className="object-contain h-14 w-14 rounded-full" src={user.picture}></img>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent>

                                <DropdownMenuItem><ButtonLogout baseUrl={baseUrl} /></DropdownMenuItem>

                            </DropdownMenuContent>

                        </DropdownMenuRoot >


                        : <Button text={<FcGoogle />}></Button>
                }

            </nav >
        </header >
    )
}

