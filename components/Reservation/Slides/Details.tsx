import { SlideProps } from "../props"
import { useFormik } from "formik"
import * as yup from "yup"
import api from "@/lib/api"

// * Components
import {
  Stack,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
  useToast,
  NumberInputField,
  NumberInput,
} from "@chakra-ui/react"
import Controls from "../Controls"
import DetailCard from "../DetailCard"
import InputField from "../InputField"

const ValidationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  street: yup.string().required("Required"),
  city: yup.string().required("Required"),
  state: yup.string().required("Required"),
  zip_code: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
})

const halfInputStyle = {
  as: Stack,
  w: "32%",
  spacing: 1,
}

const Details = ({ next, prev, data }: SlideProps) => {
  const toast = useToast()

  const formik = useFormik({
    validationSchema: ValidationSchema,
    validateOnChange: true,
    initialValues: {
      name: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await api.post("cart/tenant", values)
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
        <InputField maxLength={50} formik={formik} name="Name" val="name" />

        <InputField formik={formik} name="Street Address" val="street" />

        <Flex justify="space-between">
          <InputField
            formik={formik}
            name="City"
            val="city"
            style={halfInputStyle}
          />

          <InputField
            formik={formik}
            name="State"
            val="state"
            style={halfInputStyle}
          />

          <InputField
            formik={formik}
            name="Zip Code"
            val="zip_code"
            style={halfInputStyle}
            maxLength={5}
            isNumber
          />
        </Flex>

        <InputField formik={formik} name="Email" val="email" />

        <Controls next={() => {}} prev={prev} isSubmit />
      </Stack>
    </Stack>
  )
}

export default Details
