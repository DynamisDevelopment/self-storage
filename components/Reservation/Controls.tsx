import { ControlsProps } from "./props"

// * Components
import { Flex, Button } from "@chakra-ui/react"

type ControllerProps = {
  isSubmit?: boolean
} & ControlsProps

const Controls = ({ next, prev, isSubmit }: ControllerProps) => {
  return (
    <Flex w="100%" justify="space-between">
      <Button onClick={prev} w="48%" colorScheme="teal" mt="auto" bottom="0">
        Back
      </Button>

      <Button
        onClick={next}
        type={isSubmit ? "submit" : "button"}
        w="48%"
        colorScheme="teal"
        mt="auto"
        bottom="0"
      >
        Next
      </Button>
    </Flex>
  )
}

export default Controls
