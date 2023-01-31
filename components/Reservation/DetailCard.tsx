// * Components
import { HStack, Image, Stack, Text, Flex } from "@chakra-ui/react"

const DetailCard = ({ data }: { data: any }) => {
  return (
    <HStack
      w="100%"
      spacing={6}
      border="2px solid white"
      borderRadius="5px"
      p={3}
    >
      <Image
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4-seasonstorage.com%2Fwp-content%2Fuploads%2F2016%2F12%2FDSC_0124-e1482854747327.jpg&f=1&nofb=1&ipt=f74dc5aecd5a4e5d66d10d1585fcf12bcbc7618c82b1c4eb5c746c5f16950ccd&ipo=images"
        alt="Storage Unit"
        w="100%"
        maxW="100px"
        height="100px"
      />
      <Flex w="100%" alignItems="center" justify="space-between">
        <Stack>
          <Text fontSize="md" fontWeight="bold">
            {data.description}
          </Text>
          <Text fontSize="md">Floor: {data.floor}</Text>
          <Text fontSize="md">Area: {data.are} sqft</Text>
        </Stack>

        <Stack>
          <Text fontSize="md">Is Inside: {JSON.stringify(data.inside)}</Text>
          <Text fontSize="md">
            Dimensions: {data.width} x {data.length} sqft
          </Text>
          <Text fontSize="md">Rate: ${data.rate} per month</Text>
        </Stack>
      </Flex>
    </HStack>
  )
}

export default DetailCard
