import FormInput from "../../../components/form/FormInput";

export default function SchoolFeeForm() {
  return (
    <>
      <FormInput
        label="Nominal"
        name="nominal"
        placeholder="Nominal"
        format="currency"
      />
    </>
  )
}