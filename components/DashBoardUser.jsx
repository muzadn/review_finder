import React from 'react'
import {Text, DropdownMenuContent, DropdownMenuItem, DropdownMenuRoot, DropdownMenuTrigger } from '@radix-ui/themes';
import ButtonLogout from '../components/ButtonLogout';
import EditProfilePopup from './EditProfilePopup';

const DashBoardUser = ({baseUrl,user}) => {
    
  return (
    <DropdownMenuRoot >
    <DropdownMenuTrigger className='hover:cursor-pointer' >

        <img className="object-contain h-14 w-14 rounded-full" src={user?.picture}></img>

    </DropdownMenuTrigger>
    <DropdownMenuContent>
        
       <DropdownMenuItem><ButtonLogout baseUrl={baseUrl}/></DropdownMenuItem>
       <div className='sm:hidden'>
        <DropdownMenuItem >   
        <EditProfilePopup baseUrl={baseUrl}>
       <Text  > Change business</Text>
        </EditProfilePopup>
         </DropdownMenuItem>
         </div>
                            
    </DropdownMenuContent>

</DropdownMenuRoot>
  )
}

export default DashBoardUser