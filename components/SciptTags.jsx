import React, { useState } from 'react'
import {Tabs,Flex,Box,Text,Callout} from '@radix-ui/themes'
import { FaRegCopy } from "react-icons/fa";
import { InfoCircledIcon } from "@radix-ui/react-icons";


const SciptTags = ({tags,data}) => {
    const [copiedFrame, setCopiedFrame] = useState(tags?.iframe || data?.iFrame);
    const [copiedScript, setCopiedScript] = useState(tags?.script || data?.script);
  
    const copyToClipboard = async (text) => {
      try {
          if(text == "iframe"){
  
              await navigator.clipboard.writeText(tags?.iframe || data?.iFrame);
              setCopiedFrame("copied");
              setTimeout(() => setCopiedFrame(""), 2000); // Reset copied state after 2 seconds
          }
          else{
              await navigator.clipboard.writeText(tags?.script || data?.script);
              setCopiedScript("copied");
              setTimeout(() => setCopiedScript(""), 2000); // Reset copied state after 2 seconds
          }
       
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };
  return (
    <>
    {tags || data.iFrame?  (
      
        <div className=' text-green-600 font-semibold p-4  bg-white rounded-md'>
        <Tabs.Root defaultValue="iframe" >
  <Tabs.List>
    <Tabs.Trigger value="iframe"  className=' hover:cursor-pointer' >Iframe</Tabs.Trigger>
    <Tabs.Trigger value="script" className='hover:cursor-pointer'>Script</Tabs.Trigger>

  </Tabs.List>

  <Box px="4" pt="3" pb="2">
    <Tabs.Content value="iframe" className='flex gap-2 mr-3 px-4 items-center justify-center'>
    <Text className='sm:text-base text-sm'>{tags?.iframe || data?.iFrame}</Text>
          <button onClick={()=>{copyToClipboard("iframe")}} className="p-2">
            {
              <FaRegCopy className="h-5 w-5  text-gray-500 hover:text-gray-700" />
            }
          </button>
          {copiedFrame == "copied" && <span className="text-sm text-green-500">Copied!</span>}
    </Tabs.Content>

    <Tabs.Content value="script"  className='flex  gap-2 mr-3 items-center justify-center'>

          <Text className='sm:text-base text-sm'>{tags?.script || data?.script}</Text>
          <button onClick={()=>{copyToClipboard("script")}} className="p-2">
            {
              <FaRegCopy className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            }
          </button>
          {copiedScript == "copied" && <span className="text-sm text-green-500">Copied!</span>}
        
    </Tabs.Content>

    
  </Box>
</Tabs.Root>

          
        </div>
       
     
    ) : (
      <Callout.Root color="red" size='3' >
        <Flex gap='2' align='center' justify='center'>
    <Callout.Icon color='red' size='4'>
      <InfoCircledIcon width='xl' height='25px' />
    </Callout.Icon>
    <Callout.Text color='red'  className='sm:text-2xl text-base' >
    Select your reviews and save changes to generate iframe and script
    </Callout.Text>
    </Flex>
  </Callout.Root>
     
    )}
  </>
);
  
}

export default SciptTags

