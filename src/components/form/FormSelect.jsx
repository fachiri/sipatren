import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react";
import { Field } from "formik";

export default function FormSelect({ label, name, placeholder, options }) {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]} mb={4}>
          <FormLabel>{label}</FormLabel>
          <Select {...field}>
            <option value="" hidden>{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
