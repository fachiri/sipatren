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
import { validateSchoolYear } from "../../../../utils/validation";
import SchoolYearForm from "./SchoolYearForm";

export default function SchoolYearDetail() {
  const modalDelete = useDisclosure()
  const modalEdit = useDisclosure()
  const { uuid } = useParams()
  const navigate = useNavigate()
  const { data: schoolYearData, error: schoolYearError, isLoading: schoolYearIsLoading } = useSWR(`/master/school_years/${uuid}`, fetcher)

  return (
    <>
      <DashboardLayout
        title="Detail Tahun Ajaran"
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
            label: schoolYearData?.data?.name,
            link: '#'
          },
        ]}
      >
        <Card>
          <CardHeader display="flex" justifyContent="space-between">
            <Heading size='md'>Detail Tahun Ajaran {schoolYearData?.data?.name}</Heading>
            <Flex gap={2}>
              <FormEdit
                modal={modalEdit}
                initialValues={{
                  start_year: schoolYearData?.data?.name.split("/")[0],
                  end_year: schoolYearData?.data?.name.split("/")[1],
                }}
                validate={validateSchoolYear}
                onSubmit={async (values, actions) => {
                  try {
                    const { data: response } = await axios.put(`/master/school_years/${uuid}`, {
                      name: `${values.start_year}/${values.end_year}`
                    });

                    toast.success(response.message)
                    modalEdit.onClose(true)
                    mutate(`/master/school_years/${uuid}`)
                  } catch (error) {
                    if (error.name != 'AxiosError') {
                      toast.error(error.message)
                    }
                  } finally {
                    actions.setSubmitting(false)
                  }
                }}
              >
                <SchoolYearForm />
              </FormEdit>
              <FormDelete
                modal={modalDelete}
                data={schoolYearData?.data?.name}
                onClick={async () => {
                  try {
                    const response = await axios.delete(`/master/school_years/${uuid}`)

                    toast.success(response.message)
                    navigate('/dashboard/master/schoolyears')
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
                { label: 'Tahun Ajaran', value: schoolYearData?.data?.name },
              ]}
            />
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  )
}