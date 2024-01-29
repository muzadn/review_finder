import { Avatar, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import StarRatings from './StarRatings'


const PreviewCard = ({ review, last }) => {
  return (
    <Flex direction='column' gap='2' className='w-[350px] bg-white p-4 rounded-lg border' id={`${last ? "last" : "not-last"}`}>
      <Flex gap='1'>
        <Avatar src={review?.authorImage}
          fallback='?'
          size='1'
          radius='full'
        />
        <Text size='3'>{review?.givenBy}</Text>
      </Flex>
      <Flex direction='column' gap='0'>
        <Flex gap='2' align='center' >
          <StarRatings rating={review?.starsGiven.split(' ')[0]} />
          <Text size='1'>{review?.time}</Text>
        </Flex>
        <Text size='2'>{review?.review.split("… More")[0]}</Text>

      </Flex>
    </Flex>
  )
}

export default PreviewCard