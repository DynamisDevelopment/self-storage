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
} from "@chakra-ui/react"
import Controls from "../Controls"
import DetailCard from "../DetailCard"
import { ErrorMessage } from "formik"

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
        <FormControl as={Stack} isInvalid={!!formik?.errors?.name} spacing={1}>
          <FormLabel>Name *</FormLabel>
          <Input
            id="name"
            name="name"
            type="text"
            required
            maxLength={50}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik?.errors?.name && (
            <FormErrorMessage>{formik?.errors?.name}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl as={Stack} isInvalid={!!formik?.errors?.street}>
          <FormLabel>Street Address *</FormLabel>
          <Input
            id="street"
            name="street"
            type="text"
            required
            onChange={formik.handleChange}
            value={formik.values.street}
          />
          {formik?.errors?.street && (
            <FormErrorMessage>{formik?.errors?.street}</FormErrorMessage>
          )}
        </FormControl>

        <Flex justify="space-between">
          <FormControl {...halfInputStyle} isInvalid={!!formik?.errors?.city}>
            <FormLabel>City *</FormLabel>
            <Input
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            {formik?.errors?.city && (
              <FormErrorMessage>{formik?.errors?.city}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            {...halfInputStyle}
            isInvalid={!!formik?.errors?.zip_code}
          >
            <FormLabel>Zip Code *</FormLabel>
            <Input
              id="zip_code"
              name="zip_code"
              type="string"
              maxLength={5}
              onChange={formik.handleChange}
              value={formik.values.zip_code}
            />
            {formik?.errors?.zip_code && (
              <FormErrorMessage>{formik?.errors?.zip_code}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl {...halfInputStyle} isInvalid={!!formik?.errors?.state}>
            <FormLabel>State *</FormLabel>
            <Input
              id="state"
              name="state"
              type="string"
              onChange={formik.handleChange}
              value={formik.values.state}
            />
            {formik?.errors?.state && (
              <FormErrorMessage>{formik?.errors?.state}</FormErrorMessage>
            )}
          </FormControl>
        </Flex>

        <FormControl
          as={Stack}
          spacing={1}
          isInvalid={!!formik?.errors?.email}
          pb={2}
        >
          <FormLabel>Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik?.errors?.email && (
            <FormErrorMessage>{formik?.errors?.email}</FormErrorMessage>
          )}
        </FormControl>

        <Controls next={() => {}} prev={prev} isSubmit />
      </Stack>
    </Stack>
  )
}

export default Details
