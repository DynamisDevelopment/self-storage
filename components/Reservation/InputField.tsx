// * Components
import {
  FormControl,
  Stack,
  FormLabel,
  Input,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react"

const InputField = ({
  formik,
  name,
  val,
  maxLength,
  style,
  isNumber,
}: {
  formik: any
  name: string
  val: string
  maxLength?: number
  style?: Object
  isNumber?: boolean
}) => {
  return (
    <FormControl
      as={Stack}
      isInvalid={!!formik?.errors[val] && formik.touched[val]}
      spacing={1}
      {...style}
    >
      <FormLabel>{name} *</FormLabel>
      {isNumber ? (
        <NumberInput>
          <NumberInputField
            id={val}
            name={val}
            type="text"
            maxLength={maxLength}
            onChange={(e) => {
              formik.setFieldTouched(val)
              formik.handleChange(e)
            }}
            value={formik.values[val]}
          />
        </NumberInput>
      ) : (
        <Input
          id={val}
          name={val}
          type="text"
          maxLength={maxLength}
          onChange={(e) => {
            formik.setFieldTouched(val)
            formik.handleChange(e)
          }}
          value={formik.values[val]}
        />
      )}
      <FormErrorMessage minH="10px">
        <Text>{formik?.errors[val]}</Text>
      </FormErrorMessage>
    </FormControl>
  )
}

export default InputField
