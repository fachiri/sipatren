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
import { validateClass } from "../../../../utils/validation";
import ClassForm from "./ClassForm";

export default function ClassCreate() {
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
            link: '/dashboard/master/classes'
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
              validate={validateClass}
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
                  <ClassForm />
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