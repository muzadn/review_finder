import { Avatar, Flex, Text, Button } from '@radix-ui/themes';
import React from 'react';
import StarRatings from '../StarRatings';
import { useDrag } from 'react-dnd';

const Review = ({ review, onSelect, button, buttonColor }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'REVIEW',
    item: { id: review.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <>
      <Flex
        my='1'
        p='4'
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          padding: '10px',
          border: '1px solid #ddd',
          marginBottom: '10px',
          cursor: 'move',
        }}
        className='bg-white rounded-xl'
      >
        <Flex
          direction='column'

          gap='1'
          className='w-[100%]  h-[130px] overflow-hidden'
        >
          <Flex justify='between' className='w-[100%]'>
            <Flex gap='1'>
              <Avatar
                src={review.authorImage}
                fallback='?'
                size='1'
                radius='full'
              />
              <Text size='3'>{review.givenBy}</Text>
            </Flex>
            <Flex >
              <Button
                justify='end'
                color={buttonColor}
                align='end'
                className='hover:cursor-pointer'
                onClick={() => onSelect(review.id)}
              >
                {button}
              </Button>
            </Flex>
          </Flex>

          <Flex direction='column' gap='0'>
            <Flex gap='2' align='center'>
              <StarRatings rating={review.starsGiven.split(' ')[0]} />
              <Text size='1'>{review.time}</Text>
            </Flex>
            <div
              className='overflow-hidden'
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 3, // Limit to 3 lines
                textOverflow: 'ellipsis',
              }}
            >
              <Text size='2'>{review.review}</Text>
            </div>
          </Flex>
        </Flex>

      </Flex>
    </>
  );
};

export default Review;
