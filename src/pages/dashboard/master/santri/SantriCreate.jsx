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
import validateSantri from "../../../../utils/validation";

export default function SantriCreate() {
  const { data: classData, error: classError, isLoading: classIsLoading } = useSWR(`/master/classes`, fetcher)

  const getClassOptions = () => {
    let classes = [];

    if (classData?.data?.rows) {
      classes = classData.data.rows.map((classItem) => ({
        value: classItem.uuid,
        label: classItem.name,
      }));
    }

    return classes;
  };


  return (
    <>
      <DashboardLayout
        title="Tambah Santri"
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
            label: 'Santri',
            link: '/dashboard/master/santri'
          },
          {
            label: 'Tambah Data',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading as='h4' size='md'>Form Tambah Santri</Heading>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{ nama: '', nis: '', jk: '', tempat_lahir: '', tanggal_lahir: '', alamat: '', class_uuid: '' }}
              validate={validateSantri}
              onSubmit={async (values, actions) => {
                try {
                  values.username = values.nis
                  const { data: response } = await axios.post('/master/students', values);

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
                    label="Nama Lengkap"
                    name="nama"
                    placeholder="Nama Lengkap"
                  />
                  <FormInput
                    label="Nomor Induk Siswa"
                    name="nis"
                    placeholder="NIS (Nomor Induk Siswa)"
                  />
                  <FormSelect
                    label="Jenis Kelamin"
                    name="jk"
                    placeholder="Pilih jenis kelamin"
                    options={[
                      { value: 'Laki-laki', label: 'Laki-laki' },
                      { value: 'Perempuan', label: 'Perempuan' }
                    ]}
                  />
                  <FormInput
                    label="Tempat Lahir"
                    name="tempat_lahir"
                    placeholder="Tempat Lahir"
                  />
                  <FormInput
                    label="Tanggal Lahir"
                    name="tanggal_lahir"
                    placeholder="Tanggal Lahir"
                    type="date"
                  />
                  <FormInput
                    label="Alamat"
                    name="alamat"
                    placeholder="Alamat Lengkap"
                    type="textarea"
                  />
                  <FormSelect
                    label="Kelas"
                    name="class_uuid"
                    placeholder="Pilih kelas"
                    options={getClassOptions()}
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