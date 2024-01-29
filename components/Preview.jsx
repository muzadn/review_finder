'use client'
import { Flex } from '@radix-ui/themes';
import React, { useState } from 'react';
import PreviewCard from './PreviewCard';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { IoIosStar } from "react-icons/io";

const Preview = ({ data }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(true);
  let [windowWidth, setWindowWidth] = useState(0);
  if (data.activeReviews.length <= 3) setNextButton(false)

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [])

  const handleScroll = (direction) => {
    const cardWidth = 350;
    let maxScroll = (data.activeReviews.length - 1) * cardWidth - (cardWidth * 3);
    if (windowWidth <= 640) maxScroll = (data.activeReviews.length - 1) * cardWidth;
    if (windowWidth <= 1400) maxScroll = (data.activeReviews.length - 1) * cardWidth - (cardWidth * 2);
    if (direction === 'left') {
      setNextButton(true);
      if (windowWidth <= 640) setScrollPosition(Math.max(scrollPosition - cardWidth, 0));
      setScrollPosition(Math.max(scrollPosition - cardWidth, 0));
      if (scrollPosition - cardWidth === 0) setPrevButton(false);

    } else {
      setPrevButton(true)
      if (windowWidth <= 640) maxScroll = (data.activeReviews.length - 1) * cardWidth;
      setScrollPosition(Math.min((scrollPosition + cardWidth), maxScroll));
      if (scrollPosition + cardWidth === maxScroll) setNextButton(false);
      if (data.activeReviews.length <= 3) {
        setNextButton(false);
        setPrevButton(false);
      }

    }
  };

  return (
    <>
      <div style={{ position: 'relative', overflow: 'hidden', width: '100%', paddingRight: '20px' }}>
        <div className="py-5 px-5 bg-white rounded-lg my-2 flex justify-between items-center relative">
          <div className='flex gap-4 items-center'>
            <div className='flex-shrink-0'>
              <img src={data.image} className='h-12 w-12 rounded-full object-cover outline outline-2 outline-black outline-offset-4' />
            </div>
            <div className='text-black'>
              <a href={data?.businessUrl}>
                <h1 className="text-2xl font-bold">{data.businessName}</h1>
                <p className="flex items-center">{data.rating} {Array.from({ length: Math.floor(data.rating) }).map((item, index) => <IoIosStar key={index} className="text-yellow-500" />)} <span className='text-gray-500'>({data.userRating})</span></p>
              </a>
            </div>
          </div>
          <img src="https://res.cloudinary.com/dpyunxjop/image/upload/c_crop,g_north_west,h_1300,w_1600/u8pr1xjxqptlz3iyahby.jpg" className='absolute top-[10%] opacity-30 right-[4%] w-[100px]' alt="" />
          <div className='text-center flex flex-col gap-2' style={{ zIndex: `${10000}` }}>
            <div className=' items-center font-bold'>
              {/* <div className='flex gap-2'> */}
              {/* <a href="https://gildware.com">
                  {/* <img src={data.image} className='h-8 w-8 object-cover mx-auto rounded-full' /> 
              </a> */}

              <p className='text-2xl'> <a href="#">review finder</a></p>
              {/* </div> */}
              <p className="text-slate-600 text-sm">
                by <a className='text-blue-500' href="https://gildware.com">Gildware Technologies</a>
              </p>
            </div>
          </div>
        </div>
        <Flex
          size="1"
          type="always"
          position={"relative"}
          scrollbars="horizontal"
          style={{
            width: 'calc(100% - 20px)', // Adjust the width to account for arrow buttons
            height: 220,
            margin: '0 auto',
            overflow: 'hidden',
          }}
        >
          <Flex gap='3' style={{ transition: 'transform 0.5s ease', transform: `translateX(${-scrollPosition}px)` }} className='review__finder__carousel'>
            {data.activeReviews.map((review, index) => <PreviewCard review={review} key={index} last={(index == data.activeReviews.length - 1)} />)}
          </Flex>

          {
            prevButton ?
              <button
                onClick={() => handleScroll('left')}
                style={{
                  position: 'absolute',
                  top: '35%',
                  left: 10,
                  transform: 'translateY(-50%)',
                  fontSize: windowWidth <= 640 ? '12px' : '18px', // Adjust arrow size
                }}
              >
                <BsChevronLeft className="w-10 h-10 text-xl text-gray-500 hover:text-gray-700 transition duration-300 transform bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-md cursor-pointer" />
              </button> : null
          }

          {
            nextButton ?
              <button
                onClick={() => handleScroll('right')}
                style={{
                  position: 'absolute',
                  top: '35%',
                  right: 4,
                  transform: 'translateY(-50%)',
                  fontSize: windowWidth <= 640 ? '12px' : '18px', // Adjust arrow size
                }}
              >
                <BsChevronRight className="w-10 h-10 text-xl text-gray-500 hover:text-gray-700 transition duration-300 transform bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-md cursor-pointer" />
              </button>
              : null
          }
        </Flex>

      </div >
    </>
  );
};

export default Preview;
