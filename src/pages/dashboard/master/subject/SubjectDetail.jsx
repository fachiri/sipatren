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
import { validateSubject } from "../../../../utils/validation";
import SubjectForm from "./SubjectForm";

export default function SubjectDetail() {
  const modalDelete = useDisclosure()
  const modalEdit = useDisclosure()
  const { uuid } = useParams()
  const navigate = useNavigate()
  const { data: subjectData, error: subjectError, isLoading: subjectIsLoading } = useSWR(`/master/subjects/${uuid}`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Detail Mata Pelajaran"
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
            label: subjectData?.data?.name,
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader display="flex" justifyContent="space-between">
            <Heading size='md'>Detail Mata Pelajaran {subjectData?.data?.name}</Heading>
            <Flex gap={2}>
              <FormEdit
                modal={modalEdit}
                initialValues={{
                  name: subjectData?.data?.name,
                  teacher_uuid: subjectData?.data?.teacher?.uuid,
                }}
                validate={validateSubject}
                onSubmit={async (values, actions) => {
                  try {
                    const { data: response } = await axios.put(`/master/subjects/${uuid}`, values);

                    toast.success(response.message)
                    modalEdit.onClose(true)
                    mutate(`/master/subjects/${uuid}`)
                  } catch (error) {
                    if (error.name != 'AxiosError') {
                      toast.error(error.message)
                    }
                  } finally {
                    actions.setSubmitting(false)
                  }
                }}
              >
                <SubjectForm />
              </FormEdit>
              <FormDelete
                modal={modalDelete}
                data={subjectData?.data?.name}
                onClick={async () => {
                  try {
                    const response = await axios.delete(`/master/subjects/${uuid}`)

                    toast.success(response.message)
                    navigate('/dashboard/master/subjects')
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
                { label: 'Mata Pelajaran', value: subjectData?.data?.name },
                { 
                  label: 'Pengajar', 
                  value: 
                    <Link to={`/dashboard/master/teachers/detail/${subjectData?.data?.teacher?.uuid}`} style={{ color: 'teal' }}>
                      {subjectData?.data?.teacher?.user?.nama}
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