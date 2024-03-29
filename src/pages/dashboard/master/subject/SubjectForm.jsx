import useSWR from "swr";
import FormInput from "../../../../components/form/FormInput";
import fetcher from "../../../../utils/fetcher";
import FormMultiSelect from "../../../../components/form/FormMultiSelect";

export default function SubjectForm() {
  const { data: teacherData, error: teacherError, isLoading: teacherIsLoading } = useSWR(`/master/teachers`, fetcher)

  const getTeacherOptions = () => {
    let teachers = [];

    if (teacherData?.data?.rows) {
      teachers = teacherData.data.rows.map((teacherItem) => ({
        value: teacherItem.uuid,
        label: teacherItem.user.nama,
      }));
    }

    return teachers;
  };

  return (
    <>
      <FormInput
        label="Mata Pelajaran"
        name="name"
        placeholder="Mata Pelajaran"
      />
      <FormMultiSelect
        label="Pengajar"
        name="teacher_uuid"
        placeholder="Pilih Pengajar"
        options={getTeacherOptions()}
      />
    </>
  )
}