import { useState, useEffect } from "react"
import { SlideProps } from "../props"
import api from "@/lib/api"
import Confetti from "react-confetti"

// * Components
import { Stack, Text, Flex, useToast } from "@chakra-ui/react"
import DetailCard from "../DetailCard"

const Receipt = ({ next, prev, setData }: SlideProps) => {
  const [receipt, setReceipt] = useState<any>(null)
  const toast = useToast()

  const fetchReceipt = async () => {
    const res = await api.get(`cart/submit-reservation`)
    setReceipt(res.data)
  }

  useEffect(() => {
    fetchReceipt()
  }, [])

  return (
    <Stack minH="500px" alignItems="center" justify="space-between">
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      <Text
        textAlign="center"
        fontSize={["2xl", "3xl", "4xl"]}
        fontWeight="bold"
      >
        Your Reservation has been accepted!
      </Text>
      {receipt && <DetailCard data={receipt?.unit} />}

      <Flex
        w="100%"
        justify="space-between"
        border="2px solid white"
        borderRadius="5px"
        p={3}
      >
        <Flex w="100%" alignItems="center" justify="space-between">
          <Stack>
            <Text fontSize="lg" fontWeight="bold">
              {receipt?.tenant.name}
            </Text>
            <Text fontSize="md">Street Address: {receipt?.tenant.street}</Text>
            <Text fontSize="md">City: {receipt?.tenant.city}</Text>
            <Text fontSize="md">State: {receipt?.tenant.state}</Text>
          </Stack>

          <Stack>
            <Text fontSize="md">Zip Code: {receipt?.tenant.zip_code}</Text>
            <Text fontSize="md">Email: {receipt?.tenant.email}</Text>
          </Stack>
        </Flex>
      </Flex>
      <Text fontSize="3xl" fontWeight="bold">
        Paid Today: ${receipt?.paid_today}
      </Text>
    </Stack>
  )
}

export default Receipt
