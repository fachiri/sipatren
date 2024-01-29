import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { useField } from "formik";
import { MultiSelect } from "chakra-multiselect";

export default function FormMultiSelect({ label, name, placeholder, options }) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (newValue) => {
    helpers.setValue(newValue)
  };

  return (
    <FormControl isInvalid={meta.error && meta.touched} mb={4}>
      <MultiSelect
        id={name}
        value={field.value}
        onChange={handleChange}
        options={options}
        label={placeholder}
      />
      {meta.error && meta.touched && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </FormControl>
  );
}
