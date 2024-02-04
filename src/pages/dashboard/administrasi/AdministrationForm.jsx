import useSWR from "swr";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import fetcher from "../../../utils/fetcher";

export default function ClassForm() {
  const { data: studentData, error: studentError, isLoading: studentIsLoading } = useSWR(`/master/students`, fetcher)

  const getStudentOptions = () => {
    let students = [];

    if (studentData?.data?.rows) {
      students = studentData.data.rows.map((studentItem) => ({
        value: studentItem.uuid,
        label: `${studentItem.nama} (${studentItem.nis})`,
      }));
    }

    return students;
  };

  return (
    <>
      <FormInput
        type="date"
        label="Tanggal Pembayaran"
        name="date"
        placeholder="Tanggal Pembayaran"
      />
      <FormInput
        label="Nominal"
        name="nominal"
        placeholder="Nominal"
        format="currency"
      />
      <FormSelect
        label="Santri"
        name="student_uuid"
        placeholder="Pilih Santri"
        options={getStudentOptions()}
      />
    </>
  )
}