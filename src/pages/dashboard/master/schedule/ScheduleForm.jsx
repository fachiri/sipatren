import useSWR from "swr";
import FormInput from "../../../../components/form/FormInput";
import FormSelect from "../../../../components/form/FormSelect";
import fetcher from "../../../../utils/fetcher";
import { days } from "../../../../utils/constants";

export default function ScheduleForm() {
  const { data: classData, error: classError, isLoading: classIsLoading } = useSWR(`/master/classes`, fetcher)
  const { data: subjectData, error: subjectError, isLoading: subjectIsLoading } = useSWR(`/master/subjects`, fetcher)
  const { data: schoolYearData, error: schoolYearError, isLoading: schoolYearIsLoading } = useSWR(`/master/school_years`, fetcher)

  const getOptions = (data) => {
    let options = []

    if (data?.data?.rows) {
      options = data.data.rows.map((classItem) => ({
        value: classItem.uuid,
        label: classItem.name,
      }))
    }

    return options;
  }

  return (
    <>
      <FormSelect
        label="Hari"
        name="day"
        placeholder="Pilih Hari"
        options={days.map(e => ({
          value: e,
          label: e
        }))}
      />
      <FormInput
        label="Jam Mulai"
        name="start"
        type="time"
      />
      <FormInput
        label="Jam Selesai"
        name="end"
        type="time"
      />
      <FormSelect
        label="Kelas"
        name="class_uuid"
        placeholder="Pilih Kelas"
        options={getOptions(classData)}
      />
      <FormSelect
        label="Mata Pelajaran"
        name="subject_uuid"
        placeholder="Pilih Mata Pelajaran"
        options={getOptions(subjectData)}
      />
      <FormSelect
        label="Tahun Ajaran"
        name="school_year_uuid"
        placeholder="Pilih Tahun Ajaran"
        options={getOptions(schoolYearData)}
      />
    </>
  )
}