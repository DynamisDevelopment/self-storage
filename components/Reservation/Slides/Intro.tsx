import { useState } from "react"
import { ControlsProps, SlideProps } from "../props"
import api from "@/lib/api"

// * Components
import { Stack, Text, Box, Button, useToast } from "@chakra-ui/react"

const Intro = ({ next, prev, setData, data }: SlideProps) => {
  const toast = useToast()
  const [unit, setUnit] = useState("528560dc-0507-4db9-94f9-f1afa80d0e07")

  const start = async () => {
    try {
      const res = await api.get(`cart/reserve/${unit}`)
      setData(res.data)
      console.log(res, data, "++++")
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
        Start Your <br /> Reservation Application
      </Text>
      <Button onClick={start} w="100%" colorScheme="teal" mt="auto" bottom="0">
        Start
      </Button>
    </Stack>
  )
}

export default Intro
