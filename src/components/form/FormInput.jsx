import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { Field } from "formik";

export default function FormInput({ label, name, placeholder, type, maxLength }) {
  return (
    <>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]} mb={4}>
            <FormLabel>{label}</FormLabel>
            {type == 'textarea' ?
              <Textarea {...field} placeholder={placeholder} />
              :
              <Input {...field} maxLength={maxLength} placeholder={placeholder} type={type ?? "text"} />
            }
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  )
}