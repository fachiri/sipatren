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
import { validateSubject } from "../../../../utils/validation";
import SubjectForm from "./SubjectForm";

export default function SubjectCreate() {
  return (
    <>
      <DashboardLayout
        title="Tambah Mata Pelajaran"
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
            label: 'Mata Pelajaran',
            link: '/dashboard/master/subjects'
          },
          {
            label: 'Tambah Data',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading as='h4' size='md'>Form Tambah Mata Pelajaran</Heading>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{ name: '' }}
              validate={validateSubject}
              onSubmit={async (values, actions) => {
                try {
                  const { data: response } = await axios.post('/master/subjects', values);

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
                  <SubjectForm />
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