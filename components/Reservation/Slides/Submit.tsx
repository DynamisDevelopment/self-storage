import { useState } from "react"
import { ControlsProps, SlideProps } from "../props"
import axios from "axios"

// * Components
import { Stack, Text, Box, Button, useToast } from "@chakra-ui/react"
import DetailCard from "../DetailCard"

const Submit = ({ next, prev, setData, data }: SlideProps) => {
  const toast = useToast()

  const submit = async () => {
    try {
      // const res = await axios.get(
      //   `https://fe-test.marketing4storage.com/cart/submit-reservation`
      // )
      // setData(res.data)
      // console.log(res, data, "++++")
      next()
    } catch (err) {
      console.log(err)
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
  }
  return (
    <Stack minH="500px" justify="space-between">
      <Text
        textAlign="center"
        fontSize={["2xl", "3xl", "4xl"]}
        fontWeight="bold"
      >
        Submit for Information
      </Text>

      <DetailCard data={data} />
      <Button onClick={submit} w="100%" colorScheme="teal" mt="auto" bottom="0">
        Submit
      </Button>
    </Stack>
  )
}

export default Submit
