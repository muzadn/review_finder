import { DropdownMenu, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { useDrop } from 'react-dnd';
import { GoFilter } from "react-icons/go";
import Review from './Review';

const ReviewBox = ({ reviews, onSelect, textColor, button, name, sort, param }) => {

  const [{ isOver }, drop] = useDrop({
    accept: 'REVIEW',
    drop: (item) => onSelect(item.id),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });



  return (
    <ScrollArea type="always" scrollbars="vertical"
      className='rounded-xl md:w-[50%] border  w-[90%] md:h-[500px] h-[150px]'
      style={{ height: 550 }}
    >

      <Flex direction='column' gap='2'
        ref={drop}
        style={{ border: ` ${isOver ? 'red' : 'black'}`, padding: '10px' }}
        className='w-full bg-[#f5f5f5]  shadow-xl hover:shadow-2xl rounded'>
        <Flex justify='between' className='sticky top-0 rounded p-3 bg-[#f5f5f5] '>
          <Text className='font-bold'> {name} : {reviews.length}</Text>
          <DropdownMenu.Root className='hover:pointer-cursor '>
            <DropdownMenu.Trigger >
              <div>
                <Flex gap='1' align='center' >
                  <GoFilter />
                  <Text className='hover:cursor-pointer'> Filter</Text>
                </Flex>
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content >
              <DropdownMenu.Item className='hover:cursor-pointer'>
                <Text onClick={() => sort.sortByRating(param)} >Rating high to low</Text>
              </DropdownMenu.Item>
              <DropdownMenu.Item className='hover:cursor-pointer'>
                <Text onClick={() => sort.sortByDate(param)}>Newer reviews first</Text>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
        {/* <Flex justify='center' align='center' gap='2' className='font-semibold'>
       <Text size='3'>{name} : </Text>
       <Text color={textColor} size='1'>{description}</Text>
       </Flex> */}
        <Flex direction='column' gap='3' p='4' >

          {reviews?.map((review, index) => (
            <Review key={index} button={button} buttonColor={textColor} review={review} onSelect={onSelect} />
          ))}

        </Flex>
      </Flex>
    </ScrollArea>
  );
};

export default ReviewBox;
