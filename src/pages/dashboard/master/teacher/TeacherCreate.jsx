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
import { validateTeacher } from "../../../../utils/validation";
import TeacherForm from "./TeacherForm";

export default function TeacherCreate() {
  return (
    <>
      <DashboardLayout
        title="Tambah Guru"
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
            label: 'Guru',
            link: '/dashboard/master/teachers'
          },
          {
            label: 'Tambah Data',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading as='h4' size='md'>Form Tambah Guru</Heading>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{ nama: '', username: '', nuptk: '', nip: '', jabatan: '', total_jtm: '', jk: '', tempat_lahir: '', tanggal_lahir: '', alamat: '', no_hp: '', status_pegawai: '' }}
              validate={validateTeacher}
              onSubmit={async (values, actions) => {
                try {
                  const { data: response } = await axios.post('/master/teachers', values);

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
                  <TeacherForm />
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