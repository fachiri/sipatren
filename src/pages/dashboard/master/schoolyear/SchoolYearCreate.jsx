import { Form, Formik } from "formik";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import axios from "../../../../utils/axios"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from '@chakra-ui/react'
import { toast } from "react-toastify";
import { validateSchoolYear } from "../../../../utils/validation";
import SchoolYearForm from "./SchoolYearForm";

export default function SchoolYearCreate() {
  return (
    <>
      <DashboardLayout
        title="Tambah Tahun Ajaran"
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
            label: 'Tahun Ajaran',
            link: '/dashboard/master/schoolyears'
          },
          {
            label: 'Tambah Data',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading as='h4' size='md'>Form Tambah Tahun Ajaran</Heading>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{ start_year: '', end_year: '' }}
              validate={validateSchoolYear}
              onSubmit={async (values, actions) => {
                try {
                  const { data: response } = await axios.post('/master/school_years', {
                    name: `${values.start_year}/${values.end_year}`
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
                  <SchoolYearForm />
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