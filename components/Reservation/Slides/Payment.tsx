import { SlideProps } from "../props"
import { useFormik } from "formik"
import * as yup from "yup"
import api from "@/lib/api"
import valid from "card-validator"

// * Components
import { Stack, Flex, useToast } from "@chakra-ui/react"
import Controls from "../Controls"
import DetailCard from "../DetailCard"
import InputField from "../InputField"

const ValidationSchema = yup.object().shape({
  name_on_card: yup.string().required("Required"),
  card_number: yup
    .string()
    .max(16)
    .required("Required")
    .test(
      "test-number",
      "Credit Card number is invalid",
      (value) => valid.number(value).isValid
    ),
  expiration_month: yup
    .string()
    .max(6)
    .required("Required")
    .test(
      "expiration_month",
      "Expiration month is invalid",
      (value) => valid.expirationMonth(value).isValid
    ),
  expiration_year: yup
    .string()
    .max(4)
    .required("Required")
    .test(
      "expiration_month",
      "Expiration year is invalid",
      (value) => valid.expirationYear(value).isValid
    ),
  cvv: yup
    .string()
    .max(3)
    .required("Required")
    .test(
      "expiration_month",
      "CVV is invalid",
      (value) => valid.cvv(value, 3).isValid
    ),
})

const triInputStyle = {
  as: Stack,
  w: "32%",
  spacing: 1,
}

const Payment = ({ next, prev, data }: SlideProps) => {
  const toast = useToast()

  const formik = useFormik({
    validationSchema: ValidationSchema,
    initialValues: {
      name_on_card: "",
      card_number: "",
      expiration_month: "",
      expiration_year: "",
      cvv: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await api.post("cart/payment", values)
        console.log(res)
        next()
      } catch (err) {
        toast({
          title: "An error occurred.",
          description: "Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
    },
  })

  return (
    <Stack spacing={4}>
      <DetailCard data={data} />
      {/* @ts-ignore */}
      <Stack
        as="form"
        spacing={2}
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <InputField formik={formik} name="Name on Card" val="name_on_card" />

        <InputField
          formik={formik}
          name="Card Number"
          val="card_number"
          isNumber
          maxLength={16}
        />

        <Flex justify="space-between">
          <InputField
            formik={formik}
            name="Expiration Month"
            val="expiration_month"
            isNumber
            maxLength={2}
            style={triInputStyle}
          />

          <InputField
            formik={formik}
            name="Expiration Year"
            val="expiration_year"
            isNumber
            maxLength={4}
            style={triInputStyle}
          />
          
          <InputField
            formik={formik}
            name="CVV"
            val="cvv"
            isNumber
            maxLength={3}
            style={triInputStyle}
          />
        </Flex>

        <Controls
          next={() => {}}
          prev={prev}
          isSubmit
          style={{ paddingTop: "25px" }}
        />
      </Stack>
    </Stack>
  )
}

export default Payment
