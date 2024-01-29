'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FcGoogle } from 'react-icons/fc';

export default function Button({ baseUrl }) {
    const router = useRouter();
    async function handleClick(e) {

        document.cookie = 'connect.sid' + '=; Path=/; Expires=Thu, 01 Jn 1970 00:00:01 GMT;';
        router.push(`${baseUrl}/auth/google`)      
    }
    return (

        <FcGoogle className="text-3xl hover:cursor-pointer" onClick={handleClick} />

    )
}
