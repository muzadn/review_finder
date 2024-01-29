'use client'
import React from 'react'
import {Text} from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const ButtonLogout = ({baseUrl}) => {    
    const router =useRouter();
    async function handleClick(e){
       try{

           await axios.get(`${baseUrl}/auth/logout`)
           document.cookie = 'token' + '=; Path=/; Expires=Thu, 01 Jn 1970 00:00:01 GMT;';
           document.cookie = 'connect.sid' + '=; Path=/; Expires=Thu, 01 Jn 1970 00:00:01 GMT;';
           router.push('/')
           router.refresh()
       }catch(error){
        console.log(error)
       }

       //document.cookie = ""
       

    }
  return (
    <Text variant='soft' onClick={handleClick}>Logout</Text>
  )
}

export default ButtonLogout