import useSWR from "swr";
import FormInput from "../../../../components/form/FormInput";
import FormSelect from "../../../../components/form/FormSelect";
import fetcher from "../../../../utils/fetcher";

export default function ClassForm() {
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
        label="Nama Kelas"
        name="name"
        placeholder="Nama Kelas"
      />
      <FormSelect
        label="Wali Kelas"
        name="teacher_uuid"
        placeholder="Pilih Wali Kelas"
        options={getTeacherOptions()}
      />
    </>
  )
}