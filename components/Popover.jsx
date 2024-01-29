import React, { useState } from 'react'
import {AlertDialog,Flex,Button} from '@radix-ui/themes'

const Popover = ({children,data,tags,type}) => {
    const [copied, setCopied] = useState("");
    const[open,setOpen] =useState(false)
  
    const copyToClipboard = async (text) => {
      try {
          if(text == "iframe"){
  
              await navigator.clipboard.writeText(tags?.iframe || data?.iFrame);
              // setCopied("copied");
              // setTimeout(() => setCopiedFrame(""), 2000); // Reset copied state after 2 seconds
          }
          else{
              await navigator.clipboard.writeText(tags?.script || data?.script);
            }
            
            setCopied("copied");
            setTimeout(() => {
              setCopied("")
              setOpen(false)
          
          }, 2000); // Reset copied state after 2 seconds
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    function handleCancelClick(){
      setOpen(false)
      return false
    }
  return (
    <AlertDialog.Root open={open} onOpenChange={()=>setOpen(true)} >
  <AlertDialog.Trigger>
    {children}
  </AlertDialog.Trigger>
  <AlertDialog.Content style={{ maxWidth: 450 }}>
    <AlertDialog.Title>Copy {type}</AlertDialog.Title>
    <AlertDialog.Description size="2">

    {type=='iframe'?tags?.iframe || data?.iFrame: tags?.script || data?.script}
    </AlertDialog.Description>

    <Flex gap="3" mt="4" justify="end">
    
        <Button variant="soft" color="gray" onClick={handleCancelClick}>
          Cancel
        </Button>
      
      <AlertDialog.Action>
        <Button variant="solid" className='bg-red-600' onClick={()=>{copyToClipboard(type)}}>
          {copied?"copied":"copy"}

        </Button>
      </AlertDialog.Action>
    </Flex>
  </AlertDialog.Content>
</AlertDialog.Root>
  )
}

export default Popover