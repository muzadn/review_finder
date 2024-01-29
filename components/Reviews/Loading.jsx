// components/Loading.js
import { Flex, Text } from '@radix-ui/themes';
import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg text-black text-center">
                    <Flex justify='center' align='center' direction='column' gap='2'>
                    <BallTriangle
                    height={50}
                    width={50}
                    radius={6}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
                 <Text className="text-lg font-semibold">Please wait while your request is being processed...</Text>
                </Flex>
              
               
            </div>
            
        </div>
    );
};

export default Loading;
