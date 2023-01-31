import { useEffect } from "react"

// * Components
import Head from "next/head"
import Reservation from "@/components/Reservation"
import { Flex, useColorMode } from "@chakra-ui/react"

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  useEffect(() => {
    if (colorMode === "light") toggleColorMode()
  }, [])
  return (
    <>
      <Head>
        <title>Best Storage America</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex h="100vh" justify="center" alignItems="center">
          <Reservation />
        </Flex>
      </main>
    </>
  )
}
