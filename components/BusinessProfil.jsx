// Business profile section.
//Business profile of useer shown on dashboard.
// Also user profile as component DashboardUser rendered here.
//Components copy iframe and script rendered as a button here where popover is rendered.
//Change business funtionality on button where user can add new business and old one will be deleted.
// StarRatings component used for changing star ratings number as stars.
import { Button, Flex, Text } from '@radix-ui/themes'
import EditProfilePopup from './EditProfilePopup'
import StarRating from './StarRatings'
import DashBoardUser from './DashBoardUser'
import Popover from './Popover'

const BusinessProfile = ({ data, url, baseUrl, user, tags }) => {

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const parentUrl = data?.url || url
  //  const data = companyData.find((data)=> data.name=="Gildware Technologies")
  return (
    <Flex justify='between' className='bg-white px-5 py-8 rounded-xl'>
      <Flex gap='4' className='w-[50%]'  >
        <img src={data?.image} className=' md:h-[150px]  object-cover shadow-xl rounded lg:block hidden w-[200px]' />
        <Flex direction='column' justify='center'>
          <Flex direction='column' gap='1' justify='center'>
            <Text size='4' className='font-bold'>{data?.businessName}</Text>
            <Flex gap='1' >
              <Text color='gray'>({data?.rating})</Text>
              <StarRating rating={data?.userRating} />
              <Text color='gray'>({data?.userRating})</Text>

            </Flex>

            <Text>
              {data?.address}

            </Text>
          </Flex>

        </Flex>

      </Flex>
      <Flex align='end' justify='between' direction='column' className='sm:w-[70% ]w-[50%]' >
        <Flex align='center' justify='center' className='md:gap-5 gap-1 sm:flex-row flex-col-reverse'>
          <div className='  sm:block  hidden'>
            <Flex gap='2' >

              <Popover data={data} tags={tags} type='iframe'>
                <Button className=' mx-2 hover:cursor-pointer text-white bg-green-700'>Copy Iframe</Button>
              </Popover>
              <Popover data={data} tags={tags} type='script'>
                <Button  className='hover:cursor-pointer  text-white bg-blue-700'>Copy Script</Button>
              </Popover>
            </Flex>
          </div>
          <div className='hidden sm:block'>
            <EditProfilePopup baseUrl={baseUrl}>
              <Button  className='hover:cursor-pointer text-white bg-red-600'>Change business</Button>
            </EditProfilePopup>
          </div>
          <DashBoardUser baseUrl={baseUrl} user={user} />
        </Flex>

        <Text onClick={() => {
          window.open(parentUrl, '_blank')
        }} size='2' className='text-blue-600 sm:block hidden hover: cursor-pointer underline'>
          Click here to see how the reviews will look on your website</Text>


      </Flex>

    </Flex >
  )
}

export default BusinessProfile