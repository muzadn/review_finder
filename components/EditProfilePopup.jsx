import React from 'react'
import { AlertDialog, Flex, Button } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfilePopup = (props) => {
  const router = useRouter()
  const handleDelete = async () => {
    try {
      const cookie = document.cookie;
      const foundToken = cookie.split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];


      const header = `Bearer ${foundToken}`
      const config = { headers: { Authorization: header } }
      const res = await axios.delete(`${props.baseUrl}/business`, config)
      if (res.status == 200) {
        router.push('/business')
        toast.success('You can now add a new business')

      }
    } catch (error) {
      toast.error('Failed to add new business')

    }
  }
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        {props.children}
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Add new business</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure to proceed with new business? Your previous data will be Deleted permanently.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" className='hover:cursor-pointer bg-gray-400 text-white'>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={handleDelete} variant="solid"  className='hover:cursor-pointer bg-red-600'>
              Ok Proceed
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default EditProfilePopup