import DashboardLayout from "../../../../layouts/DashboardLayout";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import fetcher from "../../../../utils/fetcher"
import useSWR, { mutate } from 'swr'
import { useParams } from "react-router-dom";
import ListDetail from "../../../../components/list/ListDetail";
import { toast } from "react-toastify";
import FormDelete from "../../../../components/form/FormDelete";
import axios from "../../../../utils/axios"
import FormEdit from "../../../../components/form/FormEdit";
import { validateSchedule } from "../../../../utils/validation";
import ScheduleForm from "./ScheduleForm";

export default function ScheduleDetail() {
  const modalDelete = useDisclosure()
  const modalEdit = useDisclosure()
  const { uuid } = useParams()
  const navigate = useNavigate()
  const { data: scheduleData, error: scheduleError, isLoading: scheduleIsLoading } = useSWR(`/master/schedules/${uuid}`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Detail Jadwal"
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
            label: scheduleData?.data?.uuid,
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader display="flex" justifyContent="space-between">
            <Heading size='md'>Detail Jadwal {scheduleData?.data?.name}</Heading>
            <Flex gap={2}>
              <FormEdit
                modal={modalEdit}
                initialValues={{
                  day: scheduleData?.data?.day,
                  start: scheduleData?.data?.start,
                  end: scheduleData?.data?.end,
                  class_uuid: scheduleData?.data?.class?.uuid,
                  subject_uuid: scheduleData?.data?.subject?.uuid,
                  school_year_uuid: scheduleData?.data?.school_year?.uuid,
                }}
                validate={validateSchedule}
                onSubmit={async (values, actions) => {
                  try {
                    const { data: response } = await axios.put(`/master/schedules/${uuid}`, values);

                    toast.success(response.message)
                    modalEdit.onClose(true)
                    mutate(`/master/schedules/${uuid}`)
                  } catch (error) {
                    if (error.name != 'AxiosError') {
                      toast.error(error.message)
                    }
                  } finally {
                    actions.setSubmitting(false)
                  }
                }}
              >
                <ScheduleForm />
              </FormEdit>
              <FormDelete
                modal={modalDelete}
                data={scheduleData?.data?.name}
                onClick={async () => {
                  try {
                    const response = await axios.delete(`/master/schedules/${uuid}`)

                    toast.success(response.message)
                    navigate('/dashboard/master/schedules')
                  } catch (error) {
                    if (error.name != 'AxiosError') {
                      toast.error(error.message)
                    }
                  }
                }}
              />
            </Flex>
          </CardHeader>
          <CardBody>
            <ListDetail
              items={[
                { label: 'Hari', value: scheduleData?.data?.day },
                { label: 'Jam Mulai', value: scheduleData?.data?.start },
                { label: 'Jam Selesai', value: scheduleData?.data?.end },
                {
                  label: 'Kelas', 
                  value: 
                    <Link to={`/dashboard/master/classes/detail/${scheduleData?.data?.class?.uuid}`} style={{ color: 'teal' }}>
                      {scheduleData?.data?.class?.name}
                    </Link> 
                },
                {
                  label: 'Mata Pelajaran', 
                  value: 
                    <Link to={`/dashboard/master/subjects/detail/${scheduleData?.data?.subject?.uuid}`} style={{ color: 'teal' }}>
                      {scheduleData?.data?.subject?.name}
                    </Link> 
                },
                {
                  label: 'Tahun Ajaran', 
                  value: 
                    <Link to={`/dashboard/master/schoolyears/detail/${scheduleData?.data?.school_year?.uuid}`} style={{ color: 'teal' }}>
                      {scheduleData?.data?.school_year?.name}
                    </Link> 
                },
              ]}
            />
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}