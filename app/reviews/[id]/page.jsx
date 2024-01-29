      //Reviews preview page 
      //Reviews of a business fetched by id (user id) taken from params.
      // Reviews sent to preview component as props to show preview carousal on this page.  
import React from 'react'
import axios from 'axios'
import Preview from '../../../components/Preview'

const page = async ({ params }) => {
  let reviews;
  try {
    const res = await axios.get(`${process.env.BASEURL}/reviews/${params.id}`)
    reviews = res.data.data
  }
  catch (error) {
    console.log(error)
  }
  return (
    <div><Preview data={reviews} /></div>
  )
}

export default page