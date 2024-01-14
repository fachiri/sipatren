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
import { validateClass } from "../../../../utils/validation";
import ClassForm from "./ClassForm";

export default function ClassDetail() {
  const modalDelete = useDisclosure()
  const modalEdit = useDisclosure()
  const { uuid } = useParams()
  const navigate = useNavigate()
  const { data: classData, error: classError, isLoading: classIsLoading } = useSWR(`/master/classes/${uuid}`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Detail Kelas"
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
            label: classData?.data?.name,
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader display="flex" justifyContent="space-between">
            <Heading size='md'>Detail {classData?.data?.name}</Heading>
            <Flex gap={2}>
              <FormEdit
                modal={modalEdit}
                initialValues={{
                  name: classData?.data?.name,
                  teacher_uuid: classData?.data?.teacher?.uuid,
                }}
                validate={validateClass}
                onSubmit={async (values, actions) => {
                  try {
                    const { data: response } = await axios.put(`/master/classes/${uuid}`, values);

                    toast.success(response.message)
                    modalEdit.onClose(true)
                    mutate(`/master/classes/${uuid}`)
                  } catch (error) {
                    if (error.name != 'AxiosError') {
                      toast.error(error.message)
                    }
                  } finally {
                    actions.setSubmitting(false)
                  }
                }}
              >
                <ClassForm />
              </FormEdit>
              <FormDelete
                modal={modalDelete}
                data={classData?.data?.name}
                onClick={async () => {
                  try {
                    const response = await axios.delete(`/master/classes/${uuid}`)

                    toast.success(response.message)
                    navigate('/dashboard/master/classes')
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
                { label: 'Nama Kelas', value: classData?.data?.name },
                { 
                  label: 'Wali Kelas', 
                  value: 
                    <Link to={`/dashboard/master/teachers/detail/${classData?.data?.teacher?.uuid}`}>
                      <Text color='teal'>{classData?.data?.teacher?.nip}</Text>
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