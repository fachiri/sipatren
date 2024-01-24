import FormInput from "../../../../components/form/FormInput";

export default function SchoolYearForm() {
  return (
    <>
      <FormInput
        label="Tahun Mulai"
        name="start_year"
        placeholder="2023"
        maxLength="4"
      />
      <FormInput
        label="Tahun Selesai"
        name="end_year"
        placeholder="2024"
        maxLength="4"
      />
    </>
  )
}