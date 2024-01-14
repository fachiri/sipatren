import { Form, Formik } from "formik";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import fetcher from "../../../../utils/fetcher"
import axios from "../../../../utils/axios"
import useSWR from 'swr'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from '@chakra-ui/react'
import FormInput from "../../../../components/form/FormInput";
import FormSelect from "../../../../components/form/FormSelect";
import { toast } from "react-toastify";

export default function ClassCreate() {
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
      <DashboardLayout
        title="Tambah Kelas"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Master',
            link: '#'
          },
          {
            label: 'Kelas',
            link: '/dashboard/master/class'
          },
          {
            label: 'Tambah Data',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading as='h4' size='md'>Form Tambah Kelas</Heading>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{ name: '', teacher_uuid: '' }}
              validate={values => {
                const errors = {};

                if (!values.name) {
                  errors.name = 'Nama Kelas harus diisi';
                }

                if (!values.teacher_uuid) {
                  errors.teacher_uuid = 'Guru harus diisi';
                }

                return errors;
              }}
              onSubmit={async (values, actions) => {
                try {
                  const { data: response } = await axios.post('/master/classes', values);

                  toast.success(response.message)
                  actions.resetForm()
                } catch (error) {
                  if (error.name != 'AxiosError') {
                    toast.error(error.message)
                  }
                } finally {
                  actions.setSubmitting(false)
                }
              }}
            >
              {(props) => (
                <Form>
                  <FormInput
                    label="Nama Kelas"
                    name="name"
                    placeholder="Nama Kelas"
                  />
                  <FormSelect
                    label="Guru"
                    name="teacher_uuid"
                    placeholder="Pilih Guru"
                    options={getTeacherOptions()}
                  />
                  <Button
                    mt={4}
                    colorScheme='teal'
                    isLoading={props.isSubmitting}
                    type='submit'
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}