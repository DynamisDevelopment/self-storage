import { SlideProps } from "../props"
import { useFormik } from "formik"
import * as yup from "yup"
import api from "@/lib/api"
import valid from "card-validator"

// * Components
import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react"
import Controls from "../Controls"
import DetailCard from "../DetailCard"

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

const halfInputStyle = {
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
        <FormControl
          as={Stack}
          isInvalid={!!formik?.errors?.name_on_card}
          spacing={1}
        >
          <FormLabel>Name on Card *</FormLabel>
          <Input
            id="name_on_card"
            name="name_on_card"
            type="text"
            required
            onChange={formik.handleChange}
            value={formik.values.name_on_card}
          />
          {formik?.errors?.name_on_card && (
            <FormErrorMessage>{formik?.errors?.name_on_card}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl as={Stack} isInvalid={!!formik?.errors?.card_number}>
          <FormLabel>Card Number *</FormLabel>
          <Input
            id="card_number"
            name="card_number"
            type="string"
            required
            onChange={formik.handleChange}
            maxLength={16}
            value={formik.values.card_number}
          />
          {formik?.errors?.card_number && (
            <FormErrorMessage>{formik?.errors?.card_number}</FormErrorMessage>
          )}
        </FormControl>

        <Flex justify="space-between">
          <FormControl
            {...halfInputStyle}
            isInvalid={!!formik?.errors?.expiration_month}
          >
            <FormLabel>Expiration Month *</FormLabel>
            <Input
              id="expiration_month"
              name="expiration_month"
              type="string"
              maxLength={2}
              onChange={formik.handleChange}
              value={formik.values.expiration_month}
            />
            {formik?.errors?.expiration_month && (
              <FormErrorMessage>
                {formik?.errors?.expiration_month}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            {...halfInputStyle}
            isInvalid={!!formik?.errors?.expiration_year}
          >
            <FormLabel>Expiration Year *</FormLabel>
            <Input
              id="expiration_year"
              name="expiration_year"
              type="string"
              maxLength={2}
              onChange={formik.handleChange}
              value={formik.values.expiration_year}
            />
            {formik?.errors?.expiration_year && (
              <FormErrorMessage>
                {formik?.errors?.expiration_year}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl {...halfInputStyle} isInvalid={!!formik?.errors?.cvv}>
            <FormLabel>CVV *</FormLabel>
            <Input
              id="cvv"
              name="cvv"
              type="string"
              maxLength={3}
              onChange={formik.handleChange}
              value={formik.values.cvv}
            />
            {formik?.errors?.cvv && (
              <FormErrorMessage>{formik?.errors?.cvv}</FormErrorMessage>
            )}
          </FormControl>
        </Flex>

        <Controls next={() => {}} prev={prev} isSubmit />
      </Stack>
    </Stack>
  )
}

export default Payment
