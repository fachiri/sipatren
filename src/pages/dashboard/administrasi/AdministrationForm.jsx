import useSWR from "swr";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import fetcher from "../../../utils/fetcher";

export default function ClassForm() {
  const { data: studentData, error: studentError, isLoading: studentIsLoading } = useSWR(`/master/students`, fetcher)
  const { data: schoolYearData, error: schoolYearError, isLoading: schoolYearIsLoading } = useSWR(`/master/school_years`, fetcher)

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

  const getSchoolYearOptions = () => {
    let schoolYears = [];

    if (schoolYearData?.data?.rows) {
      schoolYears = schoolYearData.data.rows.map((schoolYearItem) => ({
        value: schoolYearItem.uuid,
        label: `${schoolYearItem.name}`,
      }));
    }

    return schoolYears;
  };

  const getMonthOptions = () => {
    const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];

    return months.map((month) => ({
      value: month,
      label: month,
    }));
  };

  return (
    <>
      <FormInput
        type="date"
        label="Tanggal Pembayaran"
        name="date"
        placeholder="Tanggal Pembayaran"
      />
      <FormSelect
        label="Bulan"
        name="month"
        placeholder="Pilih Bulan"
        options={getMonthOptions()}
      />
      <FormInput
        label="Nominal"
        name="nominal"
        placeholder="Nominal"
        format="currency"
        readonly={true}
      />
      <FormSelect
        label="Status Pembayaran"
        name="status"
        placeholder="Pilih Status"
        options={[
          {
            label: 'Lunas',
            value: 'Lunas'
          },
          {
            label: 'Belum Lunas',
            value: 'Belum Lunas'
          }
        ]}
      />
      <FormSelect
        label="Santri"
        name="student_uuid"
        placeholder="Pilih Santri"
        options={getStudentOptions()}
      />
      <FormSelect
        label="Tahun Ajaran"
        name="school_year_uuid"
        placeholder="Pilih Tahun Ajaran"
        options={getSchoolYearOptions()}
      />
    </>
  )
}