import { useState } from "react"

// * Components
import { Box } from "@chakra-ui/react"

// * Slides
import Intro from "./Slides/Intro"
import Details from "./Slides/Details"
import Payment from "./Slides/Payment"
import Submit from "./Slides/Submit"
import Receipt from "./Slides/Receipt"

const Reservation = () => {
  const [slide, setSlide] = useState<number>(0)
  const [data, setData] = useState(null)

  const next = () => setSlide(slide + 1)
  const prev = () => slide > 0 && setSlide(slide - 1)

  const controls = {
    next,
    prev,
    setData,
    data,
  }

  const slides = {
    0: <Intro {...controls} />,
    1: <Details {...controls} />,
    2: <Payment {...controls} />,
    3: <Submit {...controls} />,
    4: <Receipt />,
  }
  return (
    <Box
      w="100%"
      minH="500px"
      maxW="35rem"
      bg="rgba(255, 255, 255, .25)"
      borderRadius="10px"
      p={4}
    >
      {/* @ts-ignore */}
      {slides[slide]}
    </Box>
  )
}

export default Reservation
