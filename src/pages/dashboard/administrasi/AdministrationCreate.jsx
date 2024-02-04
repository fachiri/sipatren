import { Form, Formik } from "formik";
import DashboardLayout from "../../../layouts/DashboardLayout";
import axios from "../../../utils/axios"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from '@chakra-ui/react'
import { toast } from "react-toastify";
import { validateAdministration } from "../../../utils/validation";
import AdministrationForm from "./AdministrationForm";

export default function AdministrationCreate() {
  return (
    <>
      <DashboardLayout
        title="Tambah Administrasi"
        breadcrumbs={[
          {
            label: 'Dashboard',
            link: '/dashboard'
          },
          {
            label: 'Administrasi',
            link: '/dashboard/administration'
          },
          {
            label: 'Tambah Data',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading as='h4' size='md'>Form Tambah Data Pembayaran SPP</Heading>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{ date: new Date().toISOString().split('T')[0], nominal: '', student_uuid: '' }}
              validate={validateAdministration}
              onSubmit={async (values, actions) => {
                try {
                  const { date, nominal, student_uuid } = values
                  const { data: response } = await axios.post(`/school_fees`, {
                    date,
                    nominal: +nominal,
                    student_uuid
                  });

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
                  <AdministrationForm />
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