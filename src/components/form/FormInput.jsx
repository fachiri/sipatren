import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { Field } from "formik";
import { NumericFormat } from "react-number-format";

export default function FormInput({ label, name, placeholder, type, maxLength, format }) {
  return (
    <>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]} mb={4}>
            <FormLabel>{label}</FormLabel>
            {type === 'textarea' ? (
              <Textarea {...field} placeholder={placeholder} />
            ) : format === 'currency' ? (
              <NumericFormat
                value={field.value}
                thousandSeparator={true}
                prefix={'Rp. '}
                onValueChange={(values) => {
                  form.setFieldValue(name, values.value);
                }}
                customInput={Input}
                maxLength={maxLength}
                placeholder={placeholder}
              />
            ) : (
              <Input {...field} maxLength={maxLength} placeholder={placeholder} type={type ?? "text"} />
            )}
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  )
}
