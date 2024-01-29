//Dashboard component
//Reviews of the particular user both active , inactive and total are fetched here and are assigned to respective state variables.
//Active and inactive are sent as props to review box component separately from here.
//Function handleSelect does the work of swapping the reviews from active to inactive box which is also sent as props to review box component where it is called on activate and deactivate button respectively.
//handleSelect also called for Drag and drop feature handled by react-dnd-library .
//Both active and inactive reviews are sorted by sortByRating and sortByDate funtions to sort reviews.
//Component BusinessProfil is also rendered from here at the top which recieves business data as data props and user details to rneder business details and user details.
//While the reviews are being fetched , Loading component is being rendered for that time through conditional rendering,

'use client'
import React, { useState, useEffect } from 'react';
import { Flex, Button, Text } from '@radix-ui/themes';
import ReviewBox from '../components/Reviews/ReviewBox';
import BusinessProfile from './BusinessProfil'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { sort } from 'fast-sort';
import axios from 'axios'
import Loading from '../components/Reviews/Loading'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

const ReviewDashboard = ({ baseUrl, user }) => {

  let [data, setData] = useState(null);
  const [activeReviews, setActiveReviews] = useState([]);
  const [inactiveReviews, setInactiveReviews] = useState([]);
  const [tags, setTags] = useState(null)
  const [url, setUrl] = useState("")


  useEffect(() => {

    (async () => {

      const cookie = document.cookie;
      const foundToken = cookie.split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!foundToken) {
        window.location.href = window.location.origin
      }

      const header = `Bearer ${foundToken}`
      const config = { headers: { Authorization: header } }
      try {
        let res = await axios.get(`${baseUrl}/reviews`, config)
        setData(res.data.reviews)
        setInactiveReviews(res.data.reviews.inactiveReviews)
        setActiveReviews(res.data.reviews.activeReviews)
      } catch (err) {
        let h = setInterval(async () => {
          try {
            await axios.get(`${baseUrl}/reviews`, config)
              .then((res) => {
                setData(res.data.reviews)
                setInactiveReviews(res.data.reviews.inactiveReviews)
                setActiveReviews(res.data.reviews.activeReviews)
                if (res.data.reviews)
                  clearInterval(h)
              })
          } catch (err) {
            console.log(err)
            // console.log(err.AxiosError)
          }
        }, 1000 * 30)
        if (err.response.status == 403) {
          router.push("/business")
        }
        console.log(err.response)
        console.log(err.response.status)
      }
    })()

  }, [])


  const handleSelect = (reviewId) => {

    const selectedReview = data.totalReviews.find((review) => review.id === reviewId);
    if
      (activeReviews.some((item) => item.id == selectedReview.id)) {
      setInactiveReviews([...inactiveReviews, selectedReview]);
      setActiveReviews(activeReviews.filter((review) => review.id !== selectedReview.id));

    } else {
      if (activeReviews.length < 10) {
        setActiveReviews([...activeReviews, selectedReview]);
        setInactiveReviews(inactiveReviews.filter((review) => review.id !== reviewId));
      }
      else {
        toast.error("you can only select 10 reviews")
      }
    }

  };

  async function handleSave() {
    const cookie = document.cookie;
    const foundToken = cookie.split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    // if (foundToken) {
    //     //setToken(foundToken);
    // }
    const header = `Bearer ${foundToken}`
    const config = { headers: { Authorization: header } }
    try {
      const res = await axios.post(`${baseUrl}/script`, { activeReviews, inactiveReviews }, config)
      setTags(res.data.data)
      setUrl(res.data.data.url)
      toast.success('Changes saved successfully')

    }
    catch (error) {
      toast.error('Something went wrong, try again')

    }
  }


  const sortByRating = (param) => {
    if (param === 'inactive') {
      const sorted = sort(inactiveReviews).desc((review) => review.starsGiven.split(' ')[0]);
      setInactiveReviews(sorted);
    }
    else {
      const sorted = sort(activeReviews).desc((review) => review.starsGiven.split(' ')[0]);
      setActiveReviews(sorted);
    }
  };

  const convertToDays = (timeString) => {
    const timeValues = {
      'second': 1,
      'minute': 60,
      'hour': 3600,
      'day': 86400,
      'days': 86400,
      'week': 604800,
      'weeks': 604800,
      'month': 2628000,
      'months': 2628000,
      'year': 31536000,
      'years': 31536000,
    };

    const [value, unit] = timeString.split(' ');

    return isNaN(value) ? 1 * timeValues[unit.toLowerCase()] : value * timeValues[unit.toLowerCase()];

  };
  const sortByDate = (param) => {
    if (param == 'inactive') {
      const sorted = sort(inactiveReviews).asc((review) => convertToDays(review.time));
      setInactiveReviews(sorted)
    }
    else {
      const sorted = sort(activeReviews).asc((review) => convertToDays(review.time));
      setActiveReviews(sorted)
    }

  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      {data ?
        <Flex direction='column' gap='5'

          className=' md:py-8 py-4 md:px-14 px-4 bg-[#f5f5f5]' >
          <BusinessProfile data={data} tags={tags} url={url} baseUrl={baseUrl} user={user} />



          {inactiveReviews.length > 0 ?

            <DndProvider backend={HTML5Backend} className='mt-6 bg-white'>
              <Flex direction='column' justify='center' gap='2' className='bg-white rounded p-3' >
                {/* <Flex justify='center'>
                <Text className='font-bold text-gray-700 md:text-xl text-base '>Drag & Drop reviews of your choice to be shown on website</Text>
              </Flex> */}
                <Flex justify='end' className='mx-6'>
                  {/* <Text size='4' className='font-bold text-green-600'>Drag & Drop reviews of your choice to be shown on website</Text> */}
                  <Button onClick={handleSave} className='hover:cursor-pointer' disabled={activeReviews.length <= 5}> Save changes</Button>
                </Flex>
                <Flex justify='center' gap='3' align='center' className='bg-white md:flex-row flex-col rounded p-3' >
                  <ReviewBox button='Activate'
                    description="Theses reviews will not be shown on website"
                    textColor='green'
                    sort={{ sortByRating, sortByDate }}
                    param='inactive'
                    name='Inactive reviews'
                    reviews={inactiveReviews}
                    onSelect={handleSelect}
                  />


                  <ReviewBox button='Deactivate' name='Active Reviews'
                    description="Theses reviews will not be shown on website"
                    textColor='red'
                    param='active'
                    reviews={activeReviews}
                    sort={{ sortByRating, sortByDate }}
                    onSelect={handleSelect}
                  />
                </Flex>
              </Flex>
            </DndProvider>
            : <span className='text-red-600 text-5xl font-bold'>no reviews found for this business</span>
          }

        </Flex> : <Loading />
      }
    </>
  );
};


export default ReviewDashboard;
