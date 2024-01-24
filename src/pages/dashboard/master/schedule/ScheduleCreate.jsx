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
import { validateSchedule } from "../../../../utils/validation";
import ScheduleForm from "./ScheduleForm";

export default function SchduleCreate() {
  return (
    <>
      <DashboardLayout
        title="Tambah Jadwal"
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
            label: 'Jadwal',
            link: '/dashboard/master/schedules'
          },
          {
            label: 'Tambah Data',
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader>
            <Heading as='h4' size='md'>Form Tambah Jadwal</Heading>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{ day: '', start: '', end: '', class_uuid: '', subject_uuid: '', school_year_uuid: '' }}
              validate={validateSchedule}
              onSubmit={async (values, actions) => {
                try {
                  const { data: response } = await axios.post('/master/schedules', values);

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
                  <ScheduleForm />
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