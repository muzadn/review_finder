//Confirm business component 
// Business name is extracted from business url provided by user through function extractBusinessName.
// Api call on confirm button through function handleClick where the business name extraxcted is sent as queryparameter to get the business details.
// User confirms the business by clicking select button on particular business from all businesses found by this name.
// Api call on Select button through handleBusiness function and Business details of the user is saved in database.
"use client";
import {Box, Button,Card, Flex,Text, TextFieldInput,TextFieldRoot, TextFieldSlot,} from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmBusinessView = ({ baseUrl }) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [business, setBusiness] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [currentLength, setCurrentLength] = useState(3);
  const [modifiedPlaceData, setModifiedPlaceData] = useState([]);

  useEffect(() => {
    // This code runs only on the client side

    const cookie = document.cookie;
    const foundToken = cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (foundToken) {
      setToken(foundToken);
    }
  }, []);
  const header = `Bearer ${token}`;
  const config = { headers: { Authorization: header } };

  function handleChange(e) {
    setBusiness(e.target.value);
  }
  function extractBusinessName(url) {

    // Regular expression to validate Google Maps URL
    try {

      const regex1 = /^https:\/\/www\.google\.com\/maps\/place\/.+/;

      if (regex1.test(url)) {
        const regex = /\/maps\/place\/(.*?)\//;
        const match = url.match(regex);
        if (match && match[1]) {
          // Replace '+' with ' ' to get the business name in normal format
          return decodeURIComponent(match[1].replace(/\+/g, " "));
        }
        return null;
      }
      else {
        toast.error("Please enter a valid google url")
        return "please enter a valid google url"
      }
    }
    catch (err) {
      toast.error("Please enter a valid google url")
      console.log(err)
      return "please enter a valid google url"
    }
  }

  async function handleClick(e) {
    try {
      let businessName = extractBusinessName(business);
      if (businessName == "please enter a valid google url") {
        
        return
      }

      let res = await axios.get(
        `${baseUrl}/business/?business=${businessName}`,
        config
      );
      setPlaceData(res.data.data);
      if (res.data.data.length < 3) {
        setModifiedPlaceData([
          ...res.data.data,
        ]);
      } else {
        let newData = [];
        for (let i = 0; i < 3; i++) {
          newData?.push(res.data.data[i]);
        }
        setModifiedPlaceData(newData);
      }
      setModifiedPlaceData(newData);
    }
    catch (err) {
      console.log(err)
    }
  }
  function handleNotProfile() {
    if (placeData.length > 3) {
      let length = placeData.length;
      let newData = [];
      for (let i = currentLength; i < currentLength + 3; i++) {
        if (i < length) newData.push(placeData[i]);
      }
      setModifiedPlaceData(newData);
      setCurrentLength(currentLength + 3);
    }
  }

  async function handleBusiness(data) {
    data.url = business;
    try {

      const res = await axios.post(
        `${baseUrl}/business/`,
        data,
        config
      );
      if (res.status == 200 || res.status == 201) router.push("/dashboard");
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <ToastContainer/>
    <Flex direction="column" gap="6" justify="center" align="center">
      <Flex direction="column" justify="center" align="center" gap="3" mt="5">
        <Text className="font-extrabold text-2xl"> Give your business url</Text>
        <Flex gap="5">
          <TextFieldRoot className="w-[500px] rounded-[1000px]">
            <TextFieldSlot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextFieldSlot>
            <TextFieldInput
              onChange={handleChange}
              placeholder="Search your Business "
              className="rounded-[1000px]"
            />
          </TextFieldRoot>
          <Button className="hover:cursor-pointer" onClick={handleClick}>Confirm</Button>
        </Flex>
      </Flex>

      <Flex align="center" gap="4" justify="center" style={{ width: "100%" }}>
        {modifiedPlaceData.map((data, index) => (
          <Card className="w-[250px] h-[350px] relative" key={index}>
            {" "}
            {/* Add relative positioning here */}
            <Flex direction="column" gap="3" align="center" justify="center">
              <Box className="h-[40%] w-[90%] flex justify-center" >
                <img src={data.image} alt={data.name} className="w-[200px] object-cover rounded h-[150px]" />{" "}
                {/* Added alt for accessibility */}
              </Box>
              <Flex direction="column" gap="2" align="center" justify="center">
                <Text>{data.name}</Text>
                <Text size="1">{data.formatted_address}</Text>
              </Flex>
              {/* Positioned at the bottom of the card */}
              <Button
                onClick={() => {
                  handleBusiness(data);
                }}
                className="absolute bottom-2  hover:cursor-pointer w-[40%]"
              >
                Select
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>
      {placeData.length > 3 && <Button disabled={placeData.length < 3|| currentLength == placeData.length} onClick={handleNotProfile}>
        show More
      </Button>
      }
    </Flex>
    </>
  );
};

export default ConfirmBusinessView;
